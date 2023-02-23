import {render, screen} from '@testing-library/react';
import Layout from '.';

describe('Layout', () => {
  it('should render a search form', () => {
    render(<Layout />);
    const searchForm = screen.getByLabelText('Search Form');
    expect(searchForm.tagName).toBe('FORM');
  });

  it('should render a search form with default query', () => {
    render(<Layout query="foo" />);
    const searchForm = screen.getByLabelText('Search Form');
    expect(searchForm.tagName).toBe('FORM');
  });
});
