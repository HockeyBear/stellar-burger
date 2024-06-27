import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderLoad, fetchOrders } from '../../services/slices/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(fetchOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderLoad());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchOrderLoad());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
