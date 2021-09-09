import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertBanner from '../common/AlertBanner';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Loader from '../common/Loader';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    axios
      // .post('https://guarded-hamlet-40883.herokuapp.com/order') // Heroku production
      // .post('https://localhost:5000/order') // Heroku local "heroku local web"
      .post('http://localhost:3030/order') // self local "yarn start"
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        setError(err);
      });
  }, []); // empty dependency means it will only run once on mount

  if (error) return <AlertBanner message={null} />;

  const handleClick = async (event) => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (!orderNumber) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Thank you!</h1>
        <h2>Your order number is: {orderNumber}</h2>
        <h4>as per our terms and conditions, nothing will happen now</h4>
        <Button variant="primary" type="button" onClick={handleClick}>
          Create new order
        </Button>
      </div>
    );
  }
};

export default OrderConfirmation;
