import { useNavigate } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm';

import useAdminStore from '../hooks/useAdminStore';

export default function SignUpPage() {
  const adminStore = useAdminStore();

  const navigate = useNavigate();

  const {
    isAdminAlreadyExist, isAdminIdDuplicated, errorMessage, profileImageUrl,
  } = adminStore;

  const goPrevPage = () => {
    navigate(-1);
  };

  const uploadProfileImage = async (event) => {
    const imageFile = event.target.files[0];

    await adminStore.uploadProfileImage(imageFile);
  };

  const submit = async (data) => {
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
        submit={submit}
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
