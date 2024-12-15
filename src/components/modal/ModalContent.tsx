import { useState } from "react";
import { useCarService } from "../../context/homepage/CarServiceContext";
import { getGlobalUserId } from "../../hooks/userIdStore";
import ParkingSpots from "../parking-spots/ParkingLot";

interface ModalContentProps {
    modalType: string;
    onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ modalType, onClose }) => {
    const { verifyOwnership, checkActiveSubscription } = useCarService();
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [showParkingSpotsModal, setShowParkingSpotsModal] = useState(false);
    const [selectedParkingSpot, setSelectedParkingSpot] = useState<string | null>(null); // ID-ul locului selectat

    const userId = getGlobalUserId();

    const handleVerify = async () => {
        if (!userId) {
            setVerificationResult("Eroare: ID-ul utilizatorului este invalid sau inexistent.");
            return;
        }

        try {
            const carVerified = await verifyOwnership(userId, registrationNumber);
            if (!carVerified) {
                setVerificationResult("Mașina NU aparține acestui utilizator.");
                return;
            }

            const hasActiveSubscription = await checkActiveSubscription(userId);
            if (hasActiveSubscription) {
                setVerificationResult("Mașina este validă și abonamentul este activ.");
                setShowParkingSpotsModal(true); // Deschide modalul secundar
            } else {
                setVerificationResult("Mașina este validă, dar abonamentul NU este activ.");
            }
        } catch (error: any) {
            console.error("Eroare la verificare:", error.message);
            setVerificationResult("A apărut o eroare în timpul verificării.");
        }
    };

    const handleSpotSelect = (spotNumber: string) => {
        setSelectedParkingSpot(spotNumber);
    };

    const handleChooseSpot = () => {
        setShowParkingSpotsModal(false); // Închide modalul secundar
        setVerificationResult(`Locul de parcare selectat: ${selectedParkingSpot}`); // Afișează selecția în primul modal
    };

    return (
        <>
            {!showParkingSpotsModal ? (
                <>
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        {modalType === "intrare" ? "Bariera de intrare" : "Bariera de iesire"}
                    </h2>
                    <label className="block mt-4 text-gray-600">Introduceți numărul mașinii:</label>
                    <input
                        type="text"
                        className="border p-3 mt-2 w-full rounded text-center uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Introduceți numărul mașinii"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        style={{ textTransform: "none" }}
                    />
                    {verificationResult && (
                        <p className="mt-4 text-lg text-center font-semibold text-gray-700">
                            {verificationResult}
                        </p>
                    )}
                    <div className="mt-6 flex justify-between">
                        <button
                            className="bg-red-600 text-white px-8 py-2 rounded hover:bg-red-700"
                            onClick={onClose}
                        >
                            Anulează
                        </button>
                        <button
                            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
                            onClick={handleVerify}
                        >
                            Verifică
                        </button>
                    </div>
                </>
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-2xl max-w-lg w-full">
                        <ParkingSpots onSpotSelect={handleSpotSelect} />
                        <button
                            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                            onClick={handleChooseSpot}
                        >
                            Alege
                        </button>
                        <button
                            className="mt-4 ml-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                            onClick={() => setShowParkingSpotsModal(false)}
                        >
                            Închide
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalContent;
