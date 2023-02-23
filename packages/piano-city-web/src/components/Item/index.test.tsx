import {render, screen} from '@testing-library/react';
import Item from '.';

describe('Item', () => {
  it('should render the details', () => {
    render(<Item brand="brand" model="model" year="year" price="price" />);
    const brand = screen.getByText('brand');
    expect(brand).toBeInTheDocument();
    const model = screen.getByText('model');
    expect(model).toBeInTheDocument();
    const year = screen.getByText('year');
    expect(year).toBeInTheDocument();
    const price = screen.getByText('price');
    expect(price).toBeInTheDocument();
  });

  it('should render the image', () => {
    render(<Item brand="brand" model="model" year="year" price="price" imageUrl="http://example.com/image.jpeg" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
