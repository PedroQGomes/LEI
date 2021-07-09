import React from 'react'
import './errormessage.css';

const ErrorMessage = (props) => {
    return (
        <div className="center-error-message">
            {props.message}
        </div>
    )
}

export default ErrorMessage
