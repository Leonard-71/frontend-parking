import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/login/LoginForm';
import CarAnimation from '../components/animations/car/CarAnimation';
import { LOGIN_TEXTS } from '../translations/login/login';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      navigate('/homepage', { replace: true });
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/intro.jpg')",
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white bg-opacity-90 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-[-100px] z-10">
        <h2 className="mt-6 mb-9 text-center text-3xl font-extrabold text-gray-900">
          {LOGIN_TEXTS.title}
        </h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
      <CarAnimation />
    </div>
  );
};

export default Login;
