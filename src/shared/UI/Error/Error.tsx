import React from 'react';
import styles from './Error.module.scss';

type ErrorProp = {
  children: string;
};

export const Error: React.FC<ErrorProp> = ({ children }) => {
  return <div className={styles.errorText}>{children}</div>;
};
