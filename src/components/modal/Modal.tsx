import ModalContent from './ModalContent';

interface ModalProps {
    isOpen: boolean;
    modalType: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, modalType, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full h-auto">
                <ModalContent modalType={modalType} onClose={onClose} />
            </div>
        </div>
    );
};

export default Modal;
