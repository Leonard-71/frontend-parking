
import CarAnimation from "../components/animations/car/CarAnimation";
import { RegisterForm } from "../components/register/RegisterForm";
import { REGISTER_TEXTS } from "../translations/register/register";

const Register = () => {
    return (
        <div
            className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center"
            style={{
                backgroundImage: "url('/intro.jpg')",
            }}
        >
            <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    {REGISTER_TEXTS.title}
                </h1>
                <RegisterForm />
            </div>
            <CarAnimation />
        </div>
    );
};

export default Register;
