import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
  // confirm order number on confirmation page
  const thankYou = await screen.findByRole('heading', { name: 'Thank you!' });
  expect(thankYou).toBeInTheDocument();

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