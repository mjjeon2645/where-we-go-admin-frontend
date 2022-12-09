import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PlacesList from '../components/PlacesList';

import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
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

  const goAddPlacePage = () => {
    navigate('/places/new');
  };

  return (
    <Container>
      <Title>
        장소 관리
        {' '}
        {'>'}
        {' '}
        전체
      </Title>
      <PlacesList
        places={places}
        goAddPlacePage={goAddPlacePage}
        goPlaceDetailPage={goPlaceDetailPage}
      />
    </Container>
  );
}
