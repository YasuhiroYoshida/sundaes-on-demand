import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('displays images for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTexts = scoopImages.map((el) => el.alt);
  expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
