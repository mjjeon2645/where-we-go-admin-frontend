import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import useAdminStore from '../hooks/useAdminStore';

export default function LoginPage() {
  const adminStore = useAdminStore();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = (data) => {
    adminStore.adminLogin(data);
  };

  const goSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div>
      <p>Login Page</p>
      <LoginForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        goSignUp={goSignUp}
      />
    </div>
  );
}
