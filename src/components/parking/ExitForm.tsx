import React, { useState } from "react";
import { useSubscriptionContext } from "../../hooks/subscriptions/useSubscriptions";
import { EXIT_FORM_TEXTS } from "../../translations/parking/exitFormTexts";
import CarSelect from "../car-select/CarSelect";
import { toast } from "react-toastify";

const ExitForm: React.FC = () => {
    const { userSubscriptions, loading, error, decrementRemainingExits } = useSubscriptionContext();
    const [hasExited, setHasExited] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const activeSub = Array.isArray(userSubscriptions)
        ? userSubscriptions.find((sub) => sub.isActive)
        : null;

    const handleContinue = async () => {
        if (!activeSub) {
            setErrorMessage(EXIT_FORM_TEXTS.noSubscription);
            return;
        }

        if (activeSub.remainingExits <= 0) {
            setErrorMessage(EXIT_FORM_TEXTS.exhaustedExits);
            return;
        }

        setIsProcessing(true);
        try {
            await decrementRemainingExits();
            setErrorMessage(null);
            setHasExited(true);
            toast.success(EXIT_FORM_TEXTS.exitedParking, {
                style: { marginTop: "50px" },
                toastId: "exitedParkingToast",
                autoClose: 3000,
                onClose: () => {
                    setIsProcessing(false);
                    setHasExited(false);
                    setErrorMessage(null);
                    setSelectedCar(null);
                },
            });
        } catch (err) {
            console.error(err);
            setErrorMessage(EXIT_FORM_TEXTS.errorDecrementing);
            toast.error(EXIT_FORM_TEXTS.errorDecrementing, {
                style: { marginTop: "50px" },
                toastId: "errorDecrementingToast",
                autoClose: 3000,
                onClose: () => {
                    setIsProcessing(false);
                    setHasExited(false);
                    setErrorMessage(null);
                    setSelectedCar(null);
                },
            });
        }
    };

    const getTooltipMessage = () => {
        if (isProcessing) {
            return "Așteptați...";
        }
        if (!selectedCar) {
            return "Selectați o mașină.";
        }
        return "";
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {EXIT_FORM_TEXTS.formTitle}
            </h1>

            {loading ? (
                <p className="text-center text-gray-600">{EXIT_FORM_TEXTS.loadingSubscription}</p>
            ) : error ? (
                <p className="text-center text-red-500">{EXIT_FORM_TEXTS.errorSubscription}</p>
            ) : activeSub ? (
                activeSub.remainingExits > 0 ? null : (
                    <p className="text-center text-red-600 font-medium">
                        {EXIT_FORM_TEXTS.exhaustedExits}
                    </p>
                )
            ) : (
                <p className="text-center text-red-600 font-medium">
                    {EXIT_FORM_TEXTS.noSubscription}
                </p>
            )}

            {errorMessage && (
                <div className="mt-8">
                    <p className="text-center text-red-500 font-medium">{errorMessage}</p>
                </div>
            )}

            <div className="mt-4">
                <CarSelect
                    value={selectedCar}
                    onChange={setSelectedCar}
                    disabled={loading || !activeSub || activeSub.remainingExits <= 0}
                />
            </div>

            {activeSub && activeSub.remainingExits > 0 && (
                <div className="mt-6 text-center">
                    <div className="relative group">
                        <button
                            className={`py-2 px-4 rounded-md shadow-md transition duration-200 ${loading || !selectedCar || isProcessing
                                ? "bg-blue-600 text-gray-200 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            onClick={handleContinue}
                            disabled={loading || !selectedCar || isProcessing}
                        >
                            {EXIT_FORM_TEXTS.continueButton}
                        </button>
                        {(loading || !selectedCar || isProcessing) && (
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {getTooltipMessage()}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExitForm;
