import { placeStore } from '../stores/PlaceStore';
import useStore from './useStore';

export default function usePlaceStore() {
  return useStore(placeStore);
}
