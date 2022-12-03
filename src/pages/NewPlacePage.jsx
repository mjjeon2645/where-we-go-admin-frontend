import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NewPlaceForm from '../components/NewPlaceForm';
import usePlaceStore from '../hooks/usePlaceStore';
import { sidoFormatter } from '../utils/addressFormatter';

const Container = styled.div`
  padding: 3em;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
`;

export default function NewPlacePage() {
  const placeStore = usePlaceStore();

  const navigate = useNavigate();

  const formData = new FormData();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const uploadFirstImage = async (event) => {
    const image = event.target.files[0];
    formData.append('multipartFile', image);

    await placeStore.uploadFirstImage(formData);
  };

  const submit = async (data) => {
    await placeStore.requestForAddingNewPlace(data);
    navigate('/places');
  };

  const changeRoadAddress = (address) => {
    placeStore.setRoadAddress(address);
  };

  const changeJibunAddress = (address) => {
    placeStore.setJibunAddress(address);
  };

  const changeSido = (sido) => {
    const changedSido = sidoFormatter(sido);
    placeStore.setSido(changedSido);
  };

  const changeSigungu = (sigungu) => {
    placeStore.setSigungu(sigungu);
  };

  const changeLatitude = (latitude) => {
    placeStore.setLatitude(latitude);
  };

  const changeLongitude = (longitude) => {
    placeStore.setLongitude(longitude);
  };

  return (
    <Container>
      <Title>장소 등록하기</Title>
      <NewPlaceForm
        uploadFirstImage={uploadFirstImage}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        submit={submit}
        changeRoadAddress={changeRoadAddress}
        changeJibunAddress={changeJibunAddress}
        changeSido={changeSido}
        changeSigungu={changeSigungu}
        changeLatitude={changeLatitude}
        changeLongitude={changeLongitude}
      />
    </Container>
  );
}
