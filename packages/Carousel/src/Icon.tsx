import React from 'react';
import styles from './Icon.css';
import './iconfont';

const Icon = ({ type, ...rest }) => {
  return (
    <svg className={styles.icon} {...rest} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
};

export default Icon;
