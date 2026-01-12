// For notification popup.
import './NotificationPopup.css' // Import CSS.

// ____________________________________________________________________________________________________

export function NotificationPopup({ onClose }) {
    return (
        <div className="notification-popup-card">
            <div className="notification-popup">
                <div className="notification-popup-top">
                    <div className="notification-popup-header">
                        NOTIFICATIONS  {/* Header. */}
                    </div>

                    <button className="notification-close-button" onClick={onClose}>
                        Close  {/* Button closes popup. */}
                    </button>
                </div>

                {/* Notifcation list. */}
                <ul className="notification-popup-list">

                    {/* Sample unread notification. */}
                    <li className="notification-unread">
                        <div className = "notification-info">
                            <div className="notification-type">
                                unread notif  {/* Notifcation type. */}
                            </div>

                            <div className="notification-time">
                                time passed  {/* Notification time. */}
                            </div> 
                        </div>

                        <div className="notification-content">
                            notification content  {/* Notification summary. */}
                        </div>
                    </li>

                    {/* Sample unread notification. */}
                    <li className="notification-unread">
                        <div className = "notification-info">
                            <div className="notification-type">
                                unread notif
                            </div>

                            <div className="notification-time">
                                time passed
                            </div>
                        </div>

                        <div className="notification-content">
                            notification content
                        </div>
                    </li>

                    {/* Sample read notification. */}
                    <li className="notification-read">
                        <div className="notification-info-read">
                            <div className="notification-type-read">
                                read notif
                            </div>

                            <div className="notification-time-read">
                                time passed
                            </div>
                        </div>

                        <div className="notification-content-read">
                            notification content
                        </div>
                    </li>

                    {/* Sample read notification. */}
                    <li className="notification-read">
                        <div className="notification-info-read">
                            <div className="notification-type-read">
                                read notif
                            </div>

                            <div className="notification-time-read">
                                time passed
                            </div>
                        </div>

                        <div className="notification-content-read">
                            notification content
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}