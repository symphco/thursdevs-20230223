import {render, screen} from '@testing-library/react';
import Layout from '.';

describe('Layout', () => {
  it('should render a search form', () => {
    render(<Layout />);
    const searchForm = screen.getByLabelText('Search Form');
    expect(searchForm.tagName).toBe('FORM');
  });
});
