import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCity,
  faUsers,
  faIndianRupeeSign,
} from '@fortawesome/free-solid-svg-icons';
import concert from '../assets/concert.jpg';
function EventCard({ name, loc, date, maxAttendes, price, id }) {
  return (
    <a href={`event/${id}`}>
      <Card className="h-[300px] hover:scale-105">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h1 className="text-text text-2xl font-extrabold ">{name}</h1>
        </CardHeader>
        <CardBody className="absolute text-secondary z-10 top-5 right-1 h-fit gap-7 flex flex-col items-center text-2xl font-bold">
          <h2 className="text-right w-full">
            <FontAwesomeIcon icon={faCity} /> {loc}
          </h2>
          <h2 className="text-right w-full">
            <FontAwesomeIcon icon={faUsers} /> {maxAttendes}
          </h2>
          <h2 className="text-right w-full">
            <FontAwesomeIcon icon={faIndianRupeeSign} /> {price}
          </h2>
        </CardBody>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover hover:scale-100 blur-sm"
          src={concert}
        />
        <CardFooter className="absolute z-10 bottom-1 flex col !items-start">
          <p className="text-md uppercase font-bold">On {date}</p>
        </CardFooter>
      </Card>
    </a>
  );
}

export default EventCard;
