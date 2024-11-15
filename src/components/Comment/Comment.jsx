import { useState } from "react";
import "./Coment.scss";
import {saveMoodData} from "../../services/firebaseService"



export const Comment = ({ selectedEmoji, onClearEmoji }) => {
  const [comment, setComment] = useState("");
 const [errorMessage, setErrorMessage] = useState(""); // Стейт для отображения ошибки

 const handleSubmit = async (e) => {
   e.preventDefault();

   const result = await saveMoodData(selectedEmoji, comment);

   if (result.success) {
     setComment(""); 
     setErrorMessage("");
     if (onClearEmoji) onClearEmoji();
   } else {
  
     
     setErrorMessage(result.error || "Произошла ошибка при сохранении данных.");
   }
 };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};
