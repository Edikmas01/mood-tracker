import "./MoodTracker.scss";
import { useEffect, useState } from "react";

export const MoodTracker = () => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch("./public/api/moodOptionOne.json");
        const data = await response.json();
        setEmojis(data);
      } catch (error) {
        console.error("Ошибка при загрузке смайлов:", error);
      }
    };

    fetchEmojis();
  }, []);

  return (
    <div className="mood">
      <h1 className="mood-title">Who are you today?</h1>
      <div className="mood-emoji">
        {emojis.map((emoji, index) => (
          <img key={index} src={emoji.img} alt={emoji.name} className="emoji" />
        ))}
      </div>
    </div>
  );
};
