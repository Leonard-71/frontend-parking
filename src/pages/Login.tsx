import { LoginForm } from '../components/auth/LoginForm/LoginForm';
import { useAuth } from '../hooks/auth/useAuth';
import { LOGIN_TEXTS } from '../constants/auth/login.constants';
import CarAnimation from '../components/animations/car/CarAnimation';

const Login = () => {
  const { login, isLoading, errors } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center " style={{ backgroundImage: "url('https://image.ibb.co/c7Ce5F/beauty_of_an_open_road.jpg')" }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white bg-opacity-90 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-[-100px] z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {LOGIN_TEXTS.title}
        </h2>
        <div className="mt-8">
          <LoginForm
            onSubmit={login}
            isLoading={isLoading}
            errors={errors as Record<string, string>}
          />
        </div>

      </div>
      <CarAnimation />
    </div>
  );
};

export default Login; 