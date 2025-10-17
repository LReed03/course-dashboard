import React from "react";
import "../styles/ConfirmDelete.css";

function ConfirmDelete(props){


    return(
        <div>
            <button label="Delete" onClick={props.ConfirmDelete}>Confirm</button>
        </div>
    )
}

export default ConfirmDelete;