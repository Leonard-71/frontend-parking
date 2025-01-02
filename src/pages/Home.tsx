import React from 'react';
import EntryForm from '../components/parking/EntryForm';
import ExitForm from '../components/parking/ExitForm';
import ParkingBarrier from '../components/barrier/ParkingBarrier';


const Home = () => {
    return (
        <div className="flex-grow flex flex-col md:flex-row p-6 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex flex-col    items-center w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-700 p-4">
                <h2 className="text-2xl font-bold text-white mb-6">Barieră de Intrare</h2>
                <ParkingBarrier lightColorClosed="red" lightColorOpen="green" />
                <EntryForm />
            </div>

            {/* Exit Section */}
            <div className="flex flex-col justify-start items-center w-full md:w-1/2 p-4">
                <h2 className="text-2xl font-bold text-white mb-6">Barieră de Ieșire</h2>
                <ParkingBarrier lightColorClosed="red" lightColorOpen="green" />
                <ExitForm />
            </div>
        </div>
    );
};


export default Home;