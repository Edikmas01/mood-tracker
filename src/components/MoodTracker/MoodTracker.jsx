import "./MoodTracker.scss";
import { useEffect, useState } from "react";

export const MoodTracker = () => {
  const [emojis, setEmojis] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

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

  const handleEmojiClick = (emoji, emojiElement) => {
    setSelectedEmoji(emoji);
    triggerEmojiConfetti(emoji.img, emojiElement);
  };

  const triggerEmojiConfetti = (emojiImg, emojiElement) => {
    const confettiContainer = document.querySelector(".confetti-container");

    const rect = emojiElement.getBoundingClientRect();
    const offsetX = rect.left + rect.width / 2;
    const offsetY = rect.top + rect.height / 2;

    for (let i = 0; i < 4; i++) {
      const confetti = document.createElement("img");
      confetti.src = emojiImg;
      confetti.className = "confetti-emoji";

      //v1
      /*confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      */

      //v2
      confetti.style.left = `${offsetX}px`;
      confetti.style.top = `${offsetY}px`;
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      confetti.style.transform = `translate(${randomX}px, ${randomY}px) scale(2)`;
      //  setTimeout(() => {
      //    confetti.style.transform = `translate(${randomX}px, ${randomY}px) scale(2)`;
      //    confetti.style.opacity = "0";
      //  }, i * 100);

      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
  };

  return (
    <div className="mood">
      <h1 className="mood-title">Who are you today?</h1>
      <div className="mood-emoji">
        {emojis.map((emoji, index) => (
          <div className="emoji-container" key={index}>
            <img
              key={index}
              src={emoji.img}
              alt={emoji.name}
              className="emoji"
              onClick={(e) => handleEmojiClick(emoji, e.target)}
            />
            <div className="overlay">
              <p>{emoji.name}</p>
              <div className="arrow"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="confetti-container"></div>
      {/* {selectedEmoji && (
        <div className="selected-mood">
          <h2>Вы выбрали: {selectedEmoji.name}</h2>
        </div>
      )} */}
    </div>
  );
};
