import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
  eventDescription: {
    type: String,
    required: true,
    unique: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  contractAddress : {
    type: String,
    required:true, 
  }
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
