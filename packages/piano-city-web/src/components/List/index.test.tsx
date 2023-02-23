import {render, screen} from '@testing-library/react';
import List from '.';

describe('List', () => {
  it('should render the details', () => {
    render(<List items={[{id: 0}]} itemKey={(item) => item.id} />);
    const base = screen.getByTestId('base');
    expect(base).toBeInTheDocument();
  });

  it('should render the children', () => {
    render(<List items={[{id: 0}]} itemKey={(item) => item.id} itemComponent="span" />);
    const base = screen.getByTestId('base');
    expect(base.children[0]).toHaveProperty('tagName', 'SPAN');
  });
});
