import { useState } from "react";
import "./Coment.scss";
// import PropTypes from "prop-types";

export const Comment = ({ selectedEmoji, onClearEmoji }) => {
  const [comment, setComment] = useState("");
  // const [savedEmoji, setSavedEmoji] = useState(null);

  // useEffect(() => {
  //   const storedEmoji = JSON.parse(localStorage.getItem("selectedEmoji"));
  //   if (storedEmoji) {
  //     setSavedEmoji(storedEmoji);
  //   }
  // }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
    e.target.style.height = "auto";
    // e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const data = {
        emoji: selectedEmoji,
        comment: comment.trim(),
      };
      console.log("Отправка данных:", data); //  на сервер
      setComment("");

      if (onClearEmoji) {
        onClearEmoji();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };
  return (
    <div className="comment-container">
      {selectedEmoji && selectedEmoji.img && (
        <div className="selected-emoji">
          <img src={selectedEmoji.img} alt="g" />
          {/* <span>{selectedEmoji.name}</span> */}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <textarea
          className="text-form"
          value={comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{ height: "auto", overflow: "hidden" }}
          placeholder="add a comment...record reasons and details."
        />
        <button className="comment-button" type="submit">
          push
        </button>
      </form>
    </div>
  );
};
