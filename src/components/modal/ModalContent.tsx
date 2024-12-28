import { useState, useEffect } from "react";
import { useCarService } from "../../context/homepage--ref/CarServiceContext";
import { getGlobalUserId } from "../../utils/userIdStore";
import { ModalContentProps } from "../../interface/modal/modal.interface";
import ParkingSpots from "../parking-spots/ParkingSpots";
import ParkingSpotService from "../../hooks/parking-spots--ref/parkingSpotService";
import ParkingSessionService from "../../hooks/parking-session--ref/ParkingSessionService";
import UserSubscriptionService from "../../hooks/user-subscriptions--ref/UserSubscriptionService";
import { ParkingSpot } from "../../interface/parking-spots/parkingSpots.interface";
import { useVehicleContext } from "../../hooks/vehicle/useVehicleContext";

const ModalContent: React.FC<ModalContentProps> = ({ modalType, onClose }) => {
    const { vehicles, fetchVehicles } = useVehicleContext();
    const { checkActiveSubscription } = useCarService();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [showParkingSpotsModal, setShowParkingSpotsModal] = useState(false);
    const [selectedParkingSpot, setSelectedParkingSpot] = useState<ParkingSpot | null>(null);
    const [isFinalizing, setIsFinalizing] = useState(false);

    const userId = getGlobalUserId();

    useEffect(() => {
        if (userId) {
            fetchVehicles(userId);
        }
    }, [userId, fetchVehicles]);

    const handleVerify = async () => {
        if (!userId || !selectedVehicleId) {
            setVerificationResult("Trebuie să selectați o mașină.");
            return;
        }

        try {
            const subscriptionData = await checkActiveSubscription(userId);
            if (subscriptionData.isActive) {
                setVerificationResult("Abonamentul este activ. Selectați un loc de parcare.");
                setSelectedSubscriptionId(subscriptionData.subscriptionId);
                setShowParkingSpotsModal(true);
            } else {
                setVerificationResult("Abonamentul NU este activ.");
            }
        } catch (error: any) {
            console.error("Eroare la verificare:", error.message);
            setVerificationResult("A apărut o eroare în timpul verificării.");
        }
    };

    const handleSpotSelect = (spot: ParkingSpot) => {
        setSelectedParkingSpot(spot);
    };

    const handleFinalize = async () => {
        if (!userId || !selectedVehicleId || !selectedSubscriptionId || !selectedParkingSpot) {
            setVerificationResult("Datele sunt incomplete pentru finalizare.");
            return;
        }

        try {
            // Actualizare loc de parcare
            await ParkingSpotService.updateParkingSpot(selectedParkingSpot.id, { isOccupied: true });

            // Creare sesiune de parcare
            await ParkingSessionService.createSession({
                userId,
                carId: selectedVehicleId,
                userSubscriptionId: selectedSubscriptionId,
                parkingSpotId: selectedParkingSpot.id,
                entryTime: new Date().toISOString(),
            });

            // Scădere din abonament
            await UserSubscriptionService.decrementEntries(selectedSubscriptionId);

            alert("Acțiunea a fost finalizată cu succes!");
            onClose();
        } catch (error: any) {
            console.error("Eroare la finalizare:", error.message);
            setVerificationResult("A apărut o eroare în timpul finalizării.");
        }
    };

    const handleChooseSpot = () => {
        setShowParkingSpotsModal(false);
        setVerificationResult(`Locul de parcare selectat: ${selectedParkingSpot?.spotNumber}`);
        setIsFinalizing(true);
    };

    const handleChangeSpot = () => {
        setShowParkingSpotsModal(true);
        setIsFinalizing(false);
    };

    return (
        <div>
            {!showParkingSpotsModal ? (
                <div className="bg-white rounded-lg p-6 shadow-xl max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        {modalType === "intrare" ? "Bariera de intrare" : "Bariera de iesire"}
                    </h2>
                    {vehicles.length > 0 ? (
                        <select
                            className="border p-3 mt-2 w-full rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedVehicleId || ""}
                            onChange={(e) => setSelectedVehicleId(e.target.value)}
                        >
                            <option value="" disabled>
                                Selectați o mașină
                            </option>
                            {vehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.registrationNumber}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-center mt-2">Se încarcă vehiculele...</p>
                    )}
                    {verificationResult && (
                        <p className="mt-4 text-lg text-center font-semibold text-gray-700">
                            {verificationResult}
                        </p>
                    )}
                    {selectedParkingSpot && (
                        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
                            <p><strong>User ID:</strong> {userId}</p>
                            <p><strong>Car ID:</strong> {selectedVehicleId}</p>
                            <p><strong>Subscription ID:</strong> {selectedSubscriptionId}</p>
                            <p><strong>Parking Spot ID:</strong> {selectedParkingSpot.id}</p>
                            <p><strong>Parking Spot:</strong> {selectedParkingSpot.spotNumber}</p>
                        </div>
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
                            className={`px-4 py-2 text-base font-semibold text-white rounded w-full max-w-[120px] ${isFinalizing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            onClick={isFinalizing ? handleFinalize : handleVerify}
                        >
                            {isFinalizing ? "Finalizează" : "Verifică"}
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
