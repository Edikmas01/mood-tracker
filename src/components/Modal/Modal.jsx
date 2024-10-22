import "./Modal.scss";

export const Modal = ({
  onClose,
  onSelectGroup,
  groupsForModal,
  emojis
}) => {
  const groupOne = emojis.filter((emoji) => emoji.option === "one");
  const groupTwo = emojis.filter((emoji) => emoji.option === "two");
  const groupThree = emojis.filter((emoji) => emoji.option === "three");

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>More emotions</h2>

        {groupsForModal.includes("one") && (
          <div className="modal-emoji-group">
            {groupOne.map((emoji) => (
              <img
                key={emoji.id}
                src={emoji.img}
                alt={emoji.name}
                className="modal-emoji"
                onClick={() => onSelectGroup("one")}
              />
            ))}
          </div>
        )}

        {groupsForModal.includes("two") && (
          <div className="modal-emoji-group">
            {groupTwo.map((emoji) => (
              <img
                key={emoji.id}
                src={emoji.img}
                alt={emoji.name}
                className="modal-emoji"
                onClick={() => onSelectGroup("two")}
              />
            ))}
  
          </div>
        )}

        {groupsForModal.includes("three") && (
          <div className="modal-emoji-group">
            {groupThree.map((emoji) => (
              <img
                key={emoji.id}
                src={emoji.img}
                alt={emoji.name}
                className="modal-emoji"
                onClick={() => onSelectGroup("three")}
              />
            ))}
          </div>
        )}

        <button  className="close-btn" onClick={onClose}>x</button>
      </div>
    </div>
  );
};
