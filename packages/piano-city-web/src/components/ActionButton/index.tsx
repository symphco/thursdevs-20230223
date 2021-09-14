import {forwardRef, HTMLProps} from 'react';
import styles from './index.module.css';

export enum ButtonVariant {
  DEFAULT = 'default',
  PRIMARY = 'primary',
}

export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Props = Omit<HTMLProps<HTMLButtonElement>, 'type' | 'size'> & {
  variant?: ButtonVariant;
  block?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
};

const ActionButton = forwardRef<HTMLButtonElement, Props>(({
  variant = ButtonVariant.DEFAULT,
  children,
  block,
  type: buttonType = ButtonType.BUTTON,
  size = ButtonSize.MEDIUM,
  ...etcProps
}, ref) => {
  return (
    <button
      {...etcProps}
      type={buttonType}
      ref={ref}
      className={[
        styles['base-button'],
        block && styles['block-button'],
        variant && styles[`${variant}-button`],
        size && styles[`${size}-button`],
      ]
        .filter(c => typeof c === 'string')
        .join(' ')
      }
    >
      <span
        className={[
          styles['base-children'],
          styles[`${variant}-children`],
        ]
          .filter(c => typeof c === 'string')
          .join(' ')
        }
        data-testid="children"
      >
        {children}
      </span>
    </button>
  );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
