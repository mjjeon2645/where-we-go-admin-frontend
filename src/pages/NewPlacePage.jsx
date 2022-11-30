import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import NewPlaceForm from '../components/NewPlaceForm';

const Container = styled.div`
  padding: 3em;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
`;

export default function NewPlacePage() {
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    console.log(data);
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
      />
    </Container>
  );
}
