import "./StatisticsModal.scss";

export const StatisticsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="statistics-modal-overlay" onClick={onClose}>
      <div
        className="statistics-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Statistics</h2>
        <p>Statistics page opened</p>
        {/* Позже здесь будут графики */}
      </div>
    </div>
  );
};
