import {forwardRef, HTMLProps} from 'react';
import styles from './index.module.css';

export enum InputSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Props = Omit<HTMLProps<HTMLInputElement>, 'size'> & {
  block?: boolean;
  size?: InputSize;
  label: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({
  block,
  size = InputSize.MEDIUM,
  label,
  className,
  ...etcProps
}, ref) => {
  return (
    <label
      className={
        [
          styles['wrapper'],
          block && styles['block-wrapper'],
          className,
        ]
          .filter(c => typeof c === 'string')
          .join(' ')
      }
      data-testid="wrapper"
    >
      <span
        className={styles['label']}
      >
        {label}
      </span>
      <input
        {...etcProps}
        ref={ref}
        className={[
          styles['base-input'],
          size && styles[`${size}-input`],
        ]
          .filter(c => typeof c === 'string')
          .join(' ')
        }
      />
    </label>
  )
})

Input.displayName = 'Input'

export default Input
