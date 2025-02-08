import React from 'react';
import styles from './Modal.module.css'; // Create this CSS file for styling

const Modal = ({ show, onClose, onConfirm, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm} className={styles.confirmButton}>Yes</button>
          <button onClick={onClose} className={styles.cancelButton}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;