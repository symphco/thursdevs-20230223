import {render, screen} from '@testing-library/react';
import Input, {InputSize} from '.';

describe('Input', () => {
  it('should render a textbox with the given label', () => {
    render(<Input label="foo" />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
    const labelledTextbox = screen.getByLabelText('foo');
    expect(labelledTextbox).toBeInTheDocument();
    expect(textbox).toBe(labelledTextbox);
  });

  it('should render a block textbox', () => {
    render(<Input label="foo" block />);
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toHaveClass('block-wrapper');
  });

  it.each`
    size                | className
    ${InputSize.SMALL}  | ${'small-input'}
    ${InputSize.MEDIUM} | ${'medium-input'}
    ${InputSize.LARGE}  | ${'large-input'}
  `('should render a $size textbox', ({ size, className }) => {
    render(<Input label="foo" size={size} />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveClass(className);
  });
});
