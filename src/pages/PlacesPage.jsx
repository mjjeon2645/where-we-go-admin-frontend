import { useEffect } from 'react';
import styled from 'styled-components';
import PlacesList from '../components/PlacesList';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
//
`;

export default function PlacesPage() {
  const placeStore = usePlaceStore();

  const { places } = placeStore;

  useEffect(() => {
    placeStore.fetchPlaces();
  }, []);

  return (
    <Container>
      places page
      <PlacesList places={places} />
    </Container>
  );
}
