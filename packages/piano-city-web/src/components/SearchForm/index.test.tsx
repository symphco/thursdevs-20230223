import {render, screen} from '@testing-library/react';
import SearchForm from '.';

describe('SearchForm', () => {
  it('should render a textbox for query', () => {
    render(<SearchForm />);

    const queryTextbox = screen.getByLabelText('Query');
    expect(queryTextbox.tagName).toBe('INPUT');

    const queryTextboxElement = queryTextbox as HTMLInputElement;
    expect(queryTextboxElement.name).toBe('q');
    expect(queryTextboxElement.type).toBe('search');
  });

  it('should render a submit button', () => {
    render(<SearchForm />);

    const submitButton = screen.getByRole('button');
    const buttonElement = submitButton as HTMLButtonElement;
    expect(buttonElement.type).toBe('submit');
  });
});
