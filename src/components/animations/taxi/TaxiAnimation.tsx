
import './TaxiAnimation.css';

const TaxiAnimation = () => {
    return (
        <div className="taxi-container">
            <div className="road">
                <div className="taxi">
                    <span>
                        <b></b>
                        <i></i>
                    </span>
                    <div className="light_beam"></div>
                </div>
                <div className="taxi">
                    <span>
                        <b></b>
                        <i></i>
                    </span>
                    <div className="light_beam"></div>
                </div>
            </div>
        </div>
    );
};

export default TaxiAnimation; 