import EntryForm from '../components/parking/EntryForm';
import ExitForm from '../components/parking/ExitForm';

const Homepage = () => {


    return (
        <div className="flex-grow flex flex-col justify-center items-center text-center p-6 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="mt-6 flex space-x-4">
                <EntryForm />
                <ExitForm />
            </div>

        </div>
    );
};

export default Homepage; 