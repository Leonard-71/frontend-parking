import { useState } from "react";
import { ParkingSpot } from "../../interface/parking-spots/parkingSpots.interface";


interface ParkingSpotsProps {
    onSpotSelect: () => void; // Callback pentru selectarea unui loc
}

const ParkingSpots: React.FC<ParkingSpotsProps> = ({ onSpotSelect }) => {
    const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

    const parkingSpots: ParkingSpot[] = [
        { spotNumber: "A1", type: "inside", isOccupied: true },
        { spotNumber: "A2", type: "inside", isOccupied: false },
        { spotNumber: "B1", type: "outside", isOccupied: true },
        { spotNumber: "B2", type: "outside", isOccupied: false },
        { spotNumber: "C1", type: "inside", isOccupied: false },
        { spotNumber: "C2", type: "outside", isOccupied: false },
    ];

    const handleSelect = (spotNumber: string, isOccupied: boolean) => {
        if (!isOccupied) {
            setSelectedSpot(spotNumber);
            onSpotSelect(); // Anunțăm selectarea locului
        }
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Locuri de parcare</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {parkingSpots.map((spot) => (
                    <div
                        key={spot.spotNumber}
                        onClick={() => handleSelect(spot.spotNumber, spot.isOccupied)}
                        className={`w-24 h-24 flex flex-col items-center justify-center rounded-lg text-white shadow-lg cursor-pointer
                            ${spot.isOccupied
                                ? "bg-red-600 cursor-not-allowed"
                                : selectedSpot === spot.spotNumber
                                    ? "bg-orange-400"
                                    : spot.type === "inside"
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                            }`}
                    >
                        <span className="text-lg font-bold">{spot.spotNumber}</span>
                        <span className="text-sm uppercase">{spot.type}</span>
                        {spot.isOccupied && <span className="text-xs">(Ocupat)</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingSpots;
