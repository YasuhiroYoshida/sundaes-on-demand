import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) => {
  return render(ui, { ...options, wrapper: OrderDetailsProvider });
};

export * from '@testing-library/react';

export { renderWithContext as render };
