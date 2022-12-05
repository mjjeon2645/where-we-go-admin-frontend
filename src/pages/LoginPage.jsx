import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import LoginForm from '../components/LoginForm';
import useAdminStore from '../hooks/useAdminStore';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const adminStore = useAdminStore();
  const { errorMessage } = adminStore;

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = async (data) => {
    const { adminId, password } = data;
    const accessToken = await adminStore.adminLogin({ id: adminId, password });

    if (!accessToken) {
      return;
    }

    setAccessToken(accessToken);
    adminStore.clearError();
    navigate('/places');
  };

  const goSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div>
      <LoginForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        errorMessage={errorMessage}
        goSignUp={goSignUp}
      />
    </div>
  );
}
