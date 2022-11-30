import { useEffect } from 'react';
import PlaceDetail from '../components/PlaceDetail';
import usePlaceStore from '../hooks/usePlaceStore';

export default function PlaceDetailPage() {
  const placeStore = usePlaceStore();

  const { selectedPlace } = placeStore;

  const placeId = document.location.pathname.split('/')[2];

  console.log(placeId);
  useEffect(() => {
    placeStore.fetchSelectedPlace(placeId);
  }, []);
  return (
    <div>
      place detail page
      <PlaceDetail selectedPlace={selectedPlace} />
    </div>
  );
}
