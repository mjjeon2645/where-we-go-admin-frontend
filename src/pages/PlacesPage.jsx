import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlacesList from '../components/PlacesList';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
//
`;

export default function PlacesPage() {
  const navigate = useNavigate();

  const placeStore = usePlaceStore();

  const { places } = placeStore;

  useEffect(() => {
    placeStore.fetchPlaces();
  }, []);

  const goPlaceDetailPage = (id) => {
    navigate(`/places/${id}`);
  };

  return (
    <Container>
      places page
      <PlacesList places={places} goPlaceDetailPage={goPlaceDetailPage} />
    </Container>
  );
}
