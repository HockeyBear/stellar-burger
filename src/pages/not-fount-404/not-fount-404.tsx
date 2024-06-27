import { FC } from 'react';
import styles from './not-found-404.module.css';

export const NotFound404: FC = () => (
  <div className={styles.container}>
    <div className={styles.container_gradient}>
      <p className={`pb-6 text text_type_main-large ${styles.p404}`}>404</p>
    </div>
    <h3 className={`pb-6 text text_type_main-large`}>Страница не найдена.</h3>
  </div>
);
