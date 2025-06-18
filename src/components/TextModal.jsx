import React from 'react';

const TextModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="text-modal-overlay">
      <div className="text-modal">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TextModal;
