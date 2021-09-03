import { render, screen } from '../../../test-utils/test-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoops subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent(0.0);

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  const mAndMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });

  expect(cherriesCheckbox).not.toBeChecked();
  expect(mAndMsCheckbox).not.toBeChecked();
  expect(hotFudgeCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  userEvent.click(mAndMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('4.50');

  userEvent.click(mAndMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
});
