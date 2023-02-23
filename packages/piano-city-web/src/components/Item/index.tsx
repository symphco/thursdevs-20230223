import {FC} from 'react';
import styles from './index.module.css';

type Props = {
  imageUrl?: string;
  brand: string;
  model: string;
  year: string;
  price: string;
}

const Item: FC<Props> = ({
  imageUrl,
  brand,
  model,
  year,
  price,
}) => (
  <article
    className={styles.base}
  >
    <header
      className={styles.header}
    >
      <img src={imageUrl} alt={`${brand} ${model} (${year})`} />
    </header>
    <dl
      className={styles.details}
    >
      <div>
        <dt>Brand</dt>
        <dd className={styles.brand}>{brand}</dd>
      </div>
      <div>
        <dt>Model</dt>
        <dd className={styles.model}>{model}</dd>
      </div>
      <div>
        <dt>Year</dt>
        <dd>{year}</dd>
      </div>
      <div>
        <dt>Price</dt>
        <dd className={styles.price}>{price}</dd>
      </div>
    </dl>
  </article>
)

export default Item;
