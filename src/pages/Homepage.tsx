import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useState } from 'react';
import Modal from '../components/common/Modal';

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
        <div className="min-h-screen flex flex-col bg-gray-200">

            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center text-center p-6 bg-gray-800">

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
                </div>
            </div>


            <Footer />
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