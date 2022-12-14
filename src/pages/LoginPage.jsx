import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import LoginForm from '../components/LoginForm';

import useAdminStore from '../hooks/useAdminStore';

export default function LoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const adminStore = useAdminStore();
  const { errorMessage } = adminStore;

  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken('');
    adminStore.clearError();
  }, []);

  const submit = async (data) => {
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
        submit={submit}
        errorMessage={errorMessage}
        goSignUp={goSignUp}
      />
    </div>
  );
}
