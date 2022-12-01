import { useForm } from 'react-hook-form';
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

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    await placeStore.requestForAddingNewPlace(data);
  };

  return (
    <Container>
      <Title>장소 등록하기</Title>
      <NewPlaceForm
        register={register}
        watch={watch}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        changeRoadAddress={changeRoadAddress}
        changeJibunAddress={changeJibunAddress}
        changeSido={changeSido}
        changeSigungu={changeSigungu}
      />
    </Container>
  );
}
