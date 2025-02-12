import { useState } from "react";
import "./Coment.scss";
import { saveMoodData } from "../../services/saveMoodData"

export const Comment = ({ selectedEmoji, onClearEmoji }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveMoodData(selectedEmoji, comment);
      setComment("");
      if (onClearEmoji) onClearEmoji();
    } catch (error) {
      console.error("Error while saving:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="comment-container">
      {selectedEmoji && selectedEmoji.img && (
        <div className="selected-emoji">
          <img src={selectedEmoji.img} alt="Selected Emoji" />
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
