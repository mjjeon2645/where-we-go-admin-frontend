import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import useAdminStore from '../hooks/useAdminStore';

export default function SignUpPage() {
  const adminStore = useAdminStore();

  const { isAdminIdDuplicated, errorMessage } = adminStore;

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    adminStore.signUpState = '';

    const {
      name, adminId, employeeIdentificationNumber, password, checkPassword,
    } = data;

    await adminStore.adminSignUp({
      name, adminId, employeeIdentificationNumber, password,
    });

    if (adminStore.isCheckPasswordRight) {
      return;
    }

    if (adminStore.isAdminIdDuplicated) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <div>
      어드민 계정 생성하기
      <SignUpForm
        register={register}
        watch={watch}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        isAdminIdDuplicated={isAdminIdDuplicated}
        errorMessage={errorMessage}
      />
    </div>
  );
}
