import { useState } from "react";
import "./Coment.scss";


export const Comment = ({ selectedEmoji, onClearEmoji }) => {
  const [comment, setComment] = useState("");


  const handleChange = (e) => {
    setComment(e.target.value);
    e.target.style.height = "auto";

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && selectedEmoji) {
      
      const moodData = {
        date: new Date().toISOString().split("T")[0],
        moodLevel: selectedEmoji.moodLevel,
        comment: comment.trim(),
        name: selectedEmoji.name,
        img: selectedEmoji.img,
        id: selectedEmoji.id,
        option: selectedEmoji.option,
      };
      const existingData = JSON.parse(localStorage.getItem("moodData")) || [];
      existingData.push(moodData);
      localStorage.setItem("moodData", JSON.stringify(existingData));

      console.log("Отправка данных:", moodData); //  на сервер
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
          <img src={selectedEmoji.img} alt="Selected Emoji" />
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
