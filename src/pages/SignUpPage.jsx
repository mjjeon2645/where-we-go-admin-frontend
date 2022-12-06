import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import useAdminStore from '../hooks/useAdminStore';

export default function SignUpPage() {
  const adminStore = useAdminStore();

  const navigate = useNavigate();

  const {
    isAdminAlreadyExist, isAdminIdDuplicated, errorMessage, profileImageUrl,
  } = adminStore;

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const goPrevPage = () => {
    navigate(-1);
  };

  const uploadProfileImage = async (event) => {
    const imageFile = event.target.files[0];

    await adminStore.uploadProfileImage(imageFile);
  };

  const onSubmit = async (data) => {
    // adminStore.signUpState = '';

    const {
      name, adminId, employeeIdentificationNumber, password, checkPassword,
    } = data;

    const response = await adminStore.adminSignUp({
      name, adminId, employeeIdentificationNumber, password,
    });

    if (adminStore.isAdminIdDuplicated) {
      return;
    }

    if (adminStore.isAdminAlreadyExist) {
      return;
    }

    if (!response) {
      return;
    }

    navigate('/welcome');
  };

  return (
    <div>
      <SignUpForm
        register={register}
        watch={watch}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        isAdminAlreadyExist={isAdminAlreadyExist}
        isAdminIdDuplicated={isAdminIdDuplicated}
        errorMessage={errorMessage}
        goPrevPage={goPrevPage}
        uploadProfileImage={uploadProfileImage}
        profileImageUrl={profileImageUrl}
      />
    </div>
  );
}
