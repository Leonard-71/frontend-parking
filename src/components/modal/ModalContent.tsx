
interface ModalContentProps {
    modalType: string;
    onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ modalType, onClose }) => {
    return (
        <>
            <h2 className="text-2xl font-bold text-center text-gray-800">{modalType === 'intrare' ? 'Bariera de intrare' : 'Bariera de iesire'}</h2>
            <label className="block mt-4 text-gray-600">Introduceți numărul mașinii:</label>
            <input
                type="text"
                className="border p-3 mt-2 w-full rounded text-center uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Introduceți numărul mașinii'
                style={{ textTransform: 'none' }}
            />
            <div className="mt-6 flex justify-between">
                <button className="bg-red-600 text-white px-8 py-2 rounded" onClick={onClose}>
                    Anulează
                </button>
                <button className="bg-green-600 text-white px-8 py-2 rounded">
                    Verifică
                </button>
            </div>
        </>
    );
};

export default ModalContent; 