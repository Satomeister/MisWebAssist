import { FC } from 'react';

import { Button } from 'antd';

import styles from './PageButtons.module.css';

interface IButton {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

interface PageButtonsProps {
  buttons: IButton[];
}

const PageButtons: FC<PageButtonsProps> = ({ buttons }) => {
  return (
    <div
      className={styles.buttons}
      style={{
        justifyContent: buttons.length === 1 ? 'center' : 'space-between',
      }}
    >
      {buttons.map((button, i) => (
        <Button
          key={i}
          disabled={button.disabled}
          className={styles.button}
          size="large"
          onClick={button.onClick}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export default PageButtons;
