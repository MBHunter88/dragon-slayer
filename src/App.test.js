import { render, screen } from '@testing-library/react';
import App from './components/App/App';

test('renders Dragon Slayer heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /dragon slayer/i });
  expect(heading).toBeInTheDocument();
});
