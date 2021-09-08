import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const handleClick = (event) => {
    event.preventDefault();
    setOrderPhase('review');
  };

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button variant="primary" onClick={handleClick}>
        Order sundae
      </Button>
    </div>
  );
};

export default OrderEntry;
