import { useState } from "react";
import { useCarService } from "../../context/homepage/CarServiceContext";
import { getGlobalUserId } from "../../hooks/userIdStore";
import { ModalContentProps } from "../../interface/modal/modal.interface";
import ParkingSpots from "../parking-spots/parkingSpots";



const ModalContent: React.FC<ModalContentProps> = ({ modalType, onClose }) => {
    const { verifyOwnership, checkActiveSubscription } = useCarService();
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [showParkingSpotsModal, setShowParkingSpotsModal] = useState(false);
    const [selectedParkingSpot, setSelectedParkingSpot] = useState<string | null>(null);

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
                setShowParkingSpotsModal(true);
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
        setShowParkingSpotsModal(false);
        setVerificationResult(`Locul de parcare selectat: ${selectedParkingSpot}`);
    };

    const handleChangeSpot = () => {
        setShowParkingSpotsModal(true);
    };

    return (
        <div>
            {!showParkingSpotsModal ? (
                <div className="bg-white rounded-lg p-6 shadow-xl max-w-lg mx-auto">
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
                    />
                    {verificationResult && (
                        <p className="mt-4 text-lg text-center font-semibold text-gray-700">
                            {verificationResult}
                        </p>
                    )}
                    <div className="mt-6 flex justify-between items-center gap-4">
                        <button
                            className="px-4 py-2 text-base font-semibold bg-red-600 text-white rounded hover:bg-red-700 w-full max-w-[120px]"
                            onClick={onClose}
                        >
                            Anulează
                        </button>
                        {selectedParkingSpot && (
                            <button
                                className="px-4 py-2 text-base font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 w-full max-w-[180px]"
                                onClick={handleChangeSpot}
                            >
                                Schimba locul
                            </button>
                        )}
                        <button
                            className="px-4 py-2 text-base font-semibold bg-green-600 text-white rounded hover:bg-green-700 w-full max-w-[120px]"
                            onClick={handleVerify}
                        >
                            Verifică
                        </button>
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-2xl max-w-6xl w-full">
                        <ParkingSpots onSpotSelect={handleSpotSelect} />
                        <div className="flex justify-between mt-6">
                            <button
                                className="px-4 py-2 text-base font-semibold bg-red-600 text-white rounded hover:bg-red-700 w-full max-w-[120px]"
                                onClick={() => setShowParkingSpotsModal(false)}
                            >
                                Închide
                            </button>
                            <button
                                className="px-4 py-2 text-base font-semibold bg-green-600 text-white rounded hover:bg-green-700 w-full max-w-[120px]"
                                onClick={handleChooseSpot}
                            >
                                Alege locul
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalContent;
