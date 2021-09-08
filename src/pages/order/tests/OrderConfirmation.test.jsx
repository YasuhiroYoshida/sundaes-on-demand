import { render, screen } from '../../../test-utils/test-library-utils';
import OrderConfirmation from '../OrderConfirmation';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('show alert for error when submitting order', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      return ctx.status(500);
    })
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const Loading = screen.getByText('Loading...');
  expect(Loading).toBeInTheDocument();

  const alert = await screen.findByText(
    'An unexpected error ocurred. Please try again later.',
    { exact: false }
  );
  expect(alert).toBeInTheDocument();

  expect(Loading).not.toBeInTheDocument();
  const thankYou = screen.queryByRole('heading', { name: 'Thank you!' });
  expect(thankYou).not.toBeInTheDocument();
});
