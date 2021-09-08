import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { OrderDetailsProvider } from '../contexts/OrderDetails';
import OrderEntry from '../pages/entry/OrderEntry';

test('order phase for happy path', async () => {
  /*** OrderEntry page ***/
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  const mAndMsCheckbox = screen.getByRole('checkbox', { name: /M&Ms/i });
  const hotFudgeCheckbox = screen.getByRole('checkbox', {
    name: /hot fudge/i,
  });
  userEvent.click(cherriesCheckbox);
  userEvent.click(mAndMsCheckbox);
  userEvent.click(hotFudgeCheckbox);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderButton);

  /*** OrderSummary page ***/
  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  const scoop1 = screen.getByText('3 Vanilla', { selector: 'li' });
  expect(scoopsHeading).toBeInTheDocument();
  expect(scoop1).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $4.50',
  });
  const listItems = screen.getAllByRole('listitem');
  const listItemsTexts = listItems.map((listItem) => listItem.textContent);
  expect(toppingsHeading).toBeInTheDocument();
  expect(listItemsTexts).toEqual([
    '3 Vanilla',
    'Cherries',
    'M&Ms',
    'Hot fudge',
  ]);

  const total = screen.getByRole('heading', {
    name: 'Total: $10.50',
  });
  expect(total).toBeInTheDocument();

  // accept terms and conditions on confirmation page
  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditionsCheckbox);

  const confirmOrderBtn = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderBtn);

  /*** OrderConfirmation page ***/
  // expect "Loading..." to show instead of "thank you"
  let loader = screen.getByText('Loading...');
  let thankYou = screen.queryByRole('heading', { name: 'Thank you!' });
  expect(loader).toBeInTheDocument();
  expect(thankYou).not.toBeInTheDocument();

  thankYou = await screen.findByRole('heading', { name: 'Thank you!' });
  expect(thankYou).toBeInTheDocument();

  // expect that loader has disappeared after "thank you" appeared
  loader = screen.queryByText('Loading...');
  expect(loader).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByRole('heading', {
    name: /your order number is: \d{1,10}/i,
  });
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const createOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  });
  userEvent.click(createOrderButton);

  /*** OrderEntry page ***/
  // check that scoops and toppings subtotals have been reset
  const refreshedScoopsTotal = await screen.findByText('Scoops total: $0.00', {
    exact: false,
  });
  const refreshedVanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  expect(refreshedScoopsTotal).toBeInTheDocument();
  expect(refreshedVanillaInput.value).toBe('0');

  const refreshedToppingsTotal = await screen.findByText(
    'Toppings total: $0.00'
  );
  const refreshedCheckboxes = await screen.findAllByRole('checkbox');
  const checkeds = refreshedCheckboxes.map((c) => c.checked);
  expect(refreshedToppingsTotal).toBeInTheDocument();
  expect(checkeds).toEqual([false, false, false]);

  const refreshedGrandTotal = await screen.findByText('Grand total: $0.00');
  expect(refreshedGrandTotal).toBeInTheDocument();

  // do we need any await anything to avoid test errors?
});

test('Toppings header is not on summary page if no toppings have been selected', async () => {
  /*** OrderEntry page ***/
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderButton);

  /*** OrderSummary page ***/
  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', {
    name: /toppings: \$/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test('disable order button for no scoops', async () => {
  /*** OrderEntry page ***/
  // No need for the entire app
  const OrderState = OrderEntry;
  render(
    <OrderDetailsProvider>
      <OrderState setOrderPhase={jest.fn()} />
    </OrderDetailsProvider>
  );

  const pageTitle = screen.getByRole('heading', {
    name: 'Design Your Sundae!',
  });
  expect(pageTitle).toBeInTheDocument();

  // make sure order button starts out disabled
  const button = await screen.findByRole('button');
  expect(button).toBeDisabled();

  // enter a scoop amount and test if order button has been enabled
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(button).toBeEnabled();

  // reset the scoop amount and test if order button has been disabled
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(button).toBeDisabled();
});
