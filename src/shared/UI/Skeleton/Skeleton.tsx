import React, { useMemo } from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ count }) => {
  const skeletonItems = useMemo(() => Array.from({ length: count ?? 1 }), [count]);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div key={index} className={styles.skeletonItem} />
      ))}
    </>
  );
};
