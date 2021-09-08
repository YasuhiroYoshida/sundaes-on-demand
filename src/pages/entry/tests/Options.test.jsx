import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/test-library-utils';
import Options from '../Options';

test('displays images for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((image) => image.alt);
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays images for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/,
  });
  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((image) => image.alt);
  expect(altTexts).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});

test('Do not update scoops total for invalid input', async () => {
  render(<Options optionType="scoops" />);

  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');

  expect(scoopsTotal).toHaveTextContent('Scoops total: $0.00');
});
