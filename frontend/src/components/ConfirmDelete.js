import React from "react";
import "../styles/ConfirmDelete.css";

function ConfirmDelete(props){
    return(
        <div className="confirm-delete-container">
            <p>Are you sure you want to remove this class?</p>
            <button onClick={props.ConfirmDelete}>Confirm</button>
        </div>
    )
}

export default ConfirmDelete;