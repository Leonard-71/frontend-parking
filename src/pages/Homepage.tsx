import { useState } from 'react';
import Modal from '../components/modal/Modal';
import EntryForm from '../components/parking/EntryForm';

const Homepage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const openModal = (type: string) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex-grow flex flex-col justify-center items-center text-center p-6 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="mt-6 flex space-x-4">

                <div className="mt-6 flex space-x-4">
                    <button
                        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-200 flex items-center"
                        onClick={() => openModal('intrare')}
                    >
                        Intrare
                    </button>
                    <button
                        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-200 flex items-center"
                        onClick={() => openModal('iesire')}
                    >
                        Iesire
                    </button>


                    <EntryForm />
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    modalType={modalType}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Homepage; 