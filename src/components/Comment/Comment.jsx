import { useState } from "react";
import "./Coment.scss";

export const Comment = () => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log("Комментарий:", comment);
      setComment("");
    }
  };
  return (
    <div className="comment-container">
      <form onSubmit={handleSubmit} className="form">
        <textarea
          className="text-form"
          value={comment}
          onChange={handleChange}
          rows={1}
          style={{ height: "auto" }}
          placeholder="add a comment...record reasons and details."
        />
        <button className="comment-button" type="submit">
          push
        </button>
      </form>
    </div>
  );
};
