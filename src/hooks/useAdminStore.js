import { adminStore } from '../stores/AdminStore';
import useStore from './useStore';

export default function useAdminStore() {
  return useStore(adminStore);
}
