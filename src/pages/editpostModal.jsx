import React from "react";
import EditPost from "./EditPost";

const Modal = ({ isOpen, onClose, articleId }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            <EditPost articleId={articleId} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
