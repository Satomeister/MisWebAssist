import { Spin } from 'antd';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.spin}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
