import express from 'express';
import connectDB from './server/config/db.js';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import User from './server/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import session from 'express-session';
import main from "./server/blockchain-middleware/deploy.js"
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Event from './server/models/Event.js';
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGODB_URI;
connectDB();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (forms)
app.use(
  session({
    secret: 'mysecretapp',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: mongoUrl, // Use the connection string from your environment variable
    }),
  })
);

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;
    console.log(name, username, email, password, phone);
    // Validate required fields
    if (!name || !username || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create a new user
      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        phone,
      });
      return res.status(200).json({ message: 'User registered successfully' }); // Success response
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate user error (e.g., duplicate email or username)
        return res.status(400).json({ message: 'User already exists' });
      } else {
        // Handle other server errors
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username ' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: '15m',
    });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' }); // Return success response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred' }); // Handle server errors
  }
});

app.post('/host', async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      eventTime,
      venue,
      capacity,
      price,
    } = req.body;


    const year = eventDate.substring(0,4);
    const month = eventDate.substring(5,7);
    const day = eventDate.substring(8);

    const contractAddress = await main( year, month , day , price , capacity);
    

    // Create a new Event object
    const newEvent = new Event({
      eventName,
      eventDescription,
      eventDate,
      eventTime,
      venue,
      capacity,
      price,
      contractAddress
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event', error });
  }
});

app.get('/getevents', async (req, res) => {
  try {
      const data = await Event.find(); // Fetch all documents from the collection
      res.json(data);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});


app.get('/event/:id', async (req, res) => {
  try {
      const slug = req.params.id;
      const eventData = await Event.findById(slug);

      if (!eventData) {
          return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json(eventData);
  } catch (error) {
      console.log('Error fetching event:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

