import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlacesList from '../components/PlacesList';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
  padding: 5em;
`;

const Strong = styled.strong`
  color: #ff6416;
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

  const handleAddPlaceClick = () => {
    navigate('/places/new');
  };

  return (
    <Container>
      <PlacesList places={places} goPlaceDetailPage={goPlaceDetailPage} />
      <p>
        총
        {' '}
        <Strong>{places.length}</Strong>
        개 장소가 있습니다.
      </p>
      <button type="button" onClick={handleAddPlaceClick}>장소 추가하기</button>
    </Container>
  );
}
