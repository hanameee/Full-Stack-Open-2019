import React from "react";
import "./Notification.css";
function Notification({ message }) {
    const { content, type } = message;
    if (type === null) {
        return null;
    }
    return <div className={type}>{content}</div>;
}

export default Notification;
