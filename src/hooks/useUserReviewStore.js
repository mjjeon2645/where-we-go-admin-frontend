import { userReviewStore } from '../stores/UserReviewStore';
import useStore from './useStore';

export default function useUserReviewStore() {
  return useStore(userReviewStore);
}
