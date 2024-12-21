import * as React from "react";
import { useParkingSpotContext } from "../../context/parking-spot/parkingSpotServiceContext";
import { ParkingSpotsProps } from "../../interface/parking-spots/parkingSpotsProps.interface";
import { ParkingSpot } from "../../interface/parking-spots/parkingSpots.interface";

const ParkingSpots: React.FC<ParkingSpotsProps> = ({ onSpotSelect }) => {
    const { parkingSpots, loading, error } = useParkingSpotContext();
    const [selectedSpot, setSelectedSpot] = React.useState<string | null>(null);

    const handleSelect = (spot: ParkingSpot) => {
        if (!spot.isOccupied) {
            setSelectedSpot(spot.spotNumber);
            onSpotSelect(spot);
        }
    };

    const renderSection = (title: string, spots: ParkingSpot[], bgColor: string) => (
        <div className={`flex-1 ${bgColor} rounded-lg p-4 shadow-md`}>
            <h3 className="text-lg font-bold text-gray-700 mb-2 text-center">{title}</h3>
            <div className="grid grid-cols-5 gap-2">
                {spots.map((spot) => (
                    <div
                        key={spot.id}
                        onClick={() => handleSelect(spot)}
                        className={`w-10 h-14 flex flex-col items-center justify-center rounded-md text-white shadow-md cursor-pointer
                            ${spot.isOccupied
                                ? "bg-red-500 cursor-not-allowed"
                                : selectedSpot === spot.spotNumber
                                    ? "bg-green-600"
                                    : "bg-blue-500"
                            }`}
                    >
                        <span className="text-sm font-bold">{spot.spotNumber}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) return <div>Se încarcă locurile de parcare...</div>;
    if (error) return <div>Eroare: {error}</div>;

    const insideSpots = parkingSpots.filter((spot) => spot.type === "inside");
    const outsideSpots = parkingSpots.filter((spot) => spot.type === "outside");

    return (
        <div className="flex space-x-8">
            {renderSection("Locuri în interior", insideSpots, "bg-gray-200")}
            {renderSection("Locuri în exterior", outsideSpots, "bg-gray-100")}
        </div>
    );
};

export default ParkingSpots;
