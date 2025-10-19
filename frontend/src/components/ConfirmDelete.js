import React, { useState } from "react";
import "../styles/ConfirmDelete.css";

function ConfirmDelete(props){
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

return (
    <div>
      <button onClick={handleOpen} id="remove-class">Remove Course</button>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Are you sure you want to remove {props.title}?</h2>
            <div className="modal-buttons">
              <button id="cancel-btn" onClick={handleClose}>Cancel</button>
              <button
                id="confirm-btn"
                onClick={() => {
                  handleClose();
                  props.ConfirmDelete();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmDelete;