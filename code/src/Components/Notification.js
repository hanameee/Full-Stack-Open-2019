import React from "react";
import "./Notification.css";
function Notification({ message }) {
    if (message === null) {
        return null;
    }
    return <div className="notice">{message}</div>;
}

export default Notification;
