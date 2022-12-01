import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlaceDetail from '../components/PlaceDetail';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
  padding: 3em;
`;

export default function PlaceDetailPage() {
  const navigate = useNavigate();

  const placeStore = usePlaceStore();

  const { selectedPlace } = placeStore;

  const placeId = document.location.pathname.split('/')[2];

  useEffect(() => {
    placeStore.fetchSelectedPlace(placeId);
  }, []);

  const deletePlace = async (id) => {
    await placeStore.deletePlace(id);
    navigate('/places');
  };

  return (
    <Container>
      place detail page
      <PlaceDetail selectedPlace={selectedPlace} deletePlace={deletePlace} />
    </Container>
  );
}
