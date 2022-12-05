import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlaceDetail from '../components/PlaceDetail';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
  padding: 5em;
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

  const goPrevPage = () => {
    navigate(-1);
  };

  return (
    <Container>
      <PlaceDetail
        selectedPlace={selectedPlace}
        deletePlace={deletePlace}
        goPrevPage={goPrevPage}
      />
    </Container>
  );
}
