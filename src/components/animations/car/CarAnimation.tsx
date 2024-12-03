import { useEffect } from 'react';
import './CarAnimation.css';

const CarAnimation = () => {
    useEffect(() => {
        let leftPx = (window.innerWidth - 350) / 2;
        const carElement = document.getElementById('car');

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                return;
            }
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                return;
            }

            const key = e.key;
            if (key === 'ArrowLeft') {
                leftPx = Math.max(leftPx - 5, 750);
            } else if (key === 'ArrowRight') {
                leftPx = Math.min(leftPx + 5, window.innerWidth - 750);
            }

            if (carElement) {
                carElement.style.left = `${leftPx}px`;
            }

            e.preventDefault();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <div id="car" className="car-animation"></div>
            <div id='road_lane' className='road_lane'></div>
        </div>
    );
};

export default CarAnimation; 