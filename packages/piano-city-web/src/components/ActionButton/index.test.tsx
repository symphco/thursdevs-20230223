import ActionButton, {ButtonSize, ButtonVariant} from '.';
import {render, screen} from '@testing-library/react';

describe('ActionButton', () => {
  it('should render a button', () => {
    render(<ActionButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render a block button', () => {
    render(<ActionButton block />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('block-button');
  });

  it.each`
    variant                  | buttonClassName     | childrenClassName
    ${ButtonVariant.DEFAULT} | ${'default-button'} | ${'default-children'}
    ${ButtonVariant.PRIMARY} | ${'primary-button'} | ${'primary-children'}
  `('should render a $variant button', ({ variant, buttonClassName, childrenClassName }) => {
    render(<ActionButton variant={variant} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(buttonClassName);
    const children = screen.getByTestId('children');
    expect(children).toHaveClass(childrenClassName);
  });

  it.each`
    size                 | className
    ${ButtonSize.SMALL}  | ${'small-button'}
    ${ButtonSize.MEDIUM} | ${'medium-button'}
    ${ButtonSize.LARGE}  | ${'large-button'}
  `('should render a $size button', ({ size, className }) => {
    render(<ActionButton size={size} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(className);
  });
});
