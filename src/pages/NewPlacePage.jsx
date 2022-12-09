import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NewPlaceForm from '../components/NewPlaceForm';
import usePlaceStore from '../hooks/usePlaceStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
`;

export default function NewPlacePage() {
  const placeStore = usePlaceStore();

  const {
    firstImageUrl, secondImageUrl, thirdImageUrl,
    isMissingAddress, isMissingCategory, errorMessage,
  } = placeStore;

  const navigate = useNavigate();

  const uploadFirstImage = async (event) => {
    const imageFile = event.target.files[0];

    await placeStore.uploadFirstImage(imageFile);
  };

  const uploadSecondImage = async (event) => {
    const imageFile = event.target.files[0];

    await placeStore.uploadSecondImage(imageFile);
  };

  const uploadThirdImage = async (event) => {
    const imageFile = event.target.files[0];

    await placeStore.uploadThirdImage(imageFile);
  };

  const submit = async (data) => {
    const response = await placeStore.requestForAddingNewPlace(data);
    if (!response) {
      return;
    }

    placeStore.clearAddPlaceState();
    navigate('/places');
  };

  const goPrevPage = () => {
    placeStore.clearAddPlaceState();
    navigate(-1);
  };

  return (
    <Container>
      <Title>
        장소 관리
        {' '}
        {'>'}
        {' '}
        신규 장소 추가하기
      </Title>
      <NewPlaceForm
        uploadFirstImage={uploadFirstImage}
        firstImageUrl={firstImageUrl}
        uploadSecondImage={uploadSecondImage}
        secondImageUrl={secondImageUrl}
        uploadThirdImage={uploadThirdImage}
        thirdImageUrl={thirdImageUrl}
        submit={submit}
        goPrevPage={goPrevPage}
        isMissingAddress={isMissingAddress}
        isMissingCategory={isMissingCategory}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
