import { useContext } from 'react';
import { StoreContext } from '../index';

export default function () {
  return useContext(StoreContext)
}
