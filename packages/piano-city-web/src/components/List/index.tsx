import {ElementType, FC, Key} from 'react';
import styles from './index.module.css';

type Props = {
  items: unknown[];
  itemComponent?: ElementType;
  itemKey: (item: any) => Key;
}

const List: FC<Props> = ({
  items,
  itemComponent: ItemComponent = 'div',
  itemKey,
}) => {
  return (
    <div
      className={styles.base}
      data-testid="base"
    >
      {items.map((item) => (
        <ItemComponent
          key={itemKey(item)}
          {...item}
        />
      ))}
    </div>
  )
}

export default List;
