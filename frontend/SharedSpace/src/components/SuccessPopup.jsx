import './SuccessPopup.css'

export function SuccessPopup({ message, onClose }) {
    return (
        <div className="success-popup-card">
            <div className="success-popup">
                <div className="success-popup-header">
                    {message}
                </div>

                <div className="success-popup-buttons">
                    <button className="success-ok-button" onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}
