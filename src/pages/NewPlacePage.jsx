import { useForm } from 'react-hook-form';
import NewPlaceForm from '../components/NewPlaceForm';

export default function NewPlacePage() {
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {

  };

  return (
    <div>
      <h2>장소 등록하기</h2>
      <NewPlaceForm
        register={register}
        watch={watch}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
    </div>
  );
}
