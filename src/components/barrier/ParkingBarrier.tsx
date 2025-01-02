import { useEffect, useState } from "react";

const ParkingBarrier = ({ lightColorClosed = "red", lightColorOpen = "green", isOpenState = false }) => {
    const [isOpen, setIsOpen] = useState(isOpenState);

    useEffect(() => {
        setIsOpen(isOpenState);
    }, [isOpenState]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative w-72 h-72 flex flex-col items-center">
                <div className="absolute bottom-0 left-0 w-72 h-16 bg-black rounded-md shadow-lg border-t-4 border-gray-700"></div>
                <div className="absolute bottom-16 left-12 w-16 h-64 bg-gray-800 rounded-lg shadow-2xl flex flex-col items-center justify-center z-10">
                    <div
                        className={`w-8 h-8 rounded-full shadow-md mb-3 animate-pulse ring-2 ring-gray-600`}
                        style={{ backgroundColor: isOpen ? lightColorOpen : lightColorClosed }}
                    ></div>
                    <div className="absolute top-2 w-12 h-4 text-xs text-gray-300 font-bold text-center rounded">BARRIER</div>
                </div>
                <div
                    className={`absolute bottom-64 left-20 w-72 h-8 bg-white border border-gray-400 rounded-sm shadow-lg transform origin-left transition-transform duration-700 ease-in-out ${isOpen ? "-rotate-90" : "rotate-0"} z-0`}
                >
                    <div className="flex h-full items-center">
                        {[...Array(7)].map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-full ${idx % 2 === 0 ? " bg-red-600" : "bg-white"} flex-grow border border-gray-300`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkingBarrier;

