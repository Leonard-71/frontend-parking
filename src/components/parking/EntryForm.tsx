import React, { useState } from "react";
import { useSubscriptionContext } from "../../hooks/subscriptions/useSubscriptions";
import { ENTRY_FORM_TEXTS } from "../../translations/parking/entryFormTexts";
import CarSelect from "../car-select/CarSelect";
const EntryForm: React.FC = () => {
    const { userSubscriptions, loading, error, decrementRemainingEntries } = useSubscriptionContext();
    const [hasEntered, setHasEntered] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const activeSub = userSubscriptions.find((sub) => sub.isActive);

    const handleContinue = async () => {
        if (!activeSub) {
            setErrorMessage(ENTRY_FORM_TEXTS.noSubscription);
            return;
        }

        if (activeSub.remainingEntries <= 0) {
            setErrorMessage(ENTRY_FORM_TEXTS.exhaustedEntries);
            return;
        }

        try {
            await decrementRemainingEntries();
            setErrorMessage(null);
            setHasEntered(true);
        } catch (err) {
            console.error(err);
            setErrorMessage(ENTRY_FORM_TEXTS.errorDecrementing);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {ENTRY_FORM_TEXTS.formTitle}
            </h1>

            {loading ? (
                <p className="text-center text-gray-600">{ENTRY_FORM_TEXTS.loadingSubscription}</p>
            ) : error ? (
                <p className="text-center text-red-500">{ENTRY_FORM_TEXTS.errorSubscription}</p>
            ) : activeSub ? (
                activeSub.remainingEntries > 0 ? (
                    <p className="text-center text-green-600 font-medium">
                        {ENTRY_FORM_TEXTS.hasSubscription}
                    </p>
                ) : (
                    <p className="text-center text-red-600 font-medium">
                        {ENTRY_FORM_TEXTS.exhaustedEntries}
                    </p>
                )
            ) : (
                <p className="text-center text-red-600 font-medium">
                    {ENTRY_FORM_TEXTS.noSubscription}
                </p>
            )}

            {errorMessage && (
                <p className="mt-4 text-center text-red-500 font-medium">{errorMessage}</p>
            )}

            <div className="mt-4">
                <CarSelect disabled={loading || !activeSub || activeSub.remainingEntries <= 0} />
            </div>

            {activeSub && activeSub.remainingEntries > 0 && (
                <div className="mt-6 text-center">
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                        onClick={handleContinue}
                        disabled={loading}
                    >
                        {ENTRY_FORM_TEXTS.continueButton}
                    </button>
                </div>
            )}

            {hasEntered && (
                <div className="mt-4 text-center text-green-600 font-medium">
                    {ENTRY_FORM_TEXTS.enteredParking}
                </div>
            )}
        </div>
    );
};

export default EntryForm;
