import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

const context = describe;

describe('HomePage', () => {
  function renderHomePage() {
    render(<HomePage />);
  }

  context('a manager succeed to login', () => {
    it('renders home page', () => {
      renderHomePage();

      screen.getByText('Home Page');
    });
  });
});
