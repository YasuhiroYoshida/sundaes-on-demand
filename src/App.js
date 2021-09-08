import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/order/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';
import { useState } from 'react';

let OrderState;

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  if (!orderPhase || orderPhase === 'inProgress') OrderState = OrderEntry;
  if (orderPhase === 'review') OrderState = OrderSummary;
  if (orderPhase === 'completed') OrderState = OrderConfirmation;

  return (
    <Container>
      <OrderDetailsProvider>
        <OrderState setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}
export default App;
