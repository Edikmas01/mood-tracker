import "./MoodTracker.scss";
import { useEffect, useState } from "react";
import { ModalGroup } from "../ModalGroup/ModalGroup";
import { Comment } from "../Comment/Comment";
import { HomePage } from "../../pages/HomePage/HomePage";

export const MoodTracker = () => {
  const [emojis, setEmojis] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("one");
  const [selectedEmoji, setSelectedEmoji] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch("/api/moodOptionOne.json");
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

  const totalConfetti = 8; 
  const flightDuration = 1500; 

  for (let i = 0; i < totalConfetti; i++) {
    const confetti = document.createElement("img");
    confetti.src = emojiImg;
    confetti.className = "confetti-emoji";

    
    confetti.style.left = `${offsetX}px`;
    confetti.style.top = `${offsetY}px`;

    const randomX = (Math.random() - 0.5) * 350; 
    const randomY = (Math.random() - 0.5) * 350; 
    const scale = 1.5;

    setTimeout(() => {
      confetti.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scale})`;
      confetti.style.opacity = "1"; 
    }, 10); 

    
    setTimeout(() => {
      confetti.style.opacity = "0";
    }, flightDuration - 500); 

    
    setTimeout(() => {
      confetti.remove();
    }, flightDuration);

    confettiContainer.appendChild(confetti);
  }
};


  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    setShowModal(false);
  };

  const groupsForModal = ["one", "two", "three"].filter(
    (group) => group !== selectedGroup
  );

  const filteredEmojis = emojis.filter(
    (emoji) => emoji.option === selectedGroup
  );

  const handleClearEmoji = () => {
    setSelectedEmoji(null); 
  };
  return (
    <div className="mood">
      <h1 className="mood-title">Who are you today?</h1>
      <div className="mood-emoji">
        {filteredEmojis.map((emoji, index) => (
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
        <button className="open-modal-btn" onClick={() => setShowModal(true)}>
          {/* <img className="open-modal-img" src="/public/img/1.png" alt="+" /> */}
          +
        </button>
      </div>

      <div className="confetti-container"></div>
      {showModal && (
        <ModalGroup
          onClose={() => setShowModal(false)}
          onSelectGroup={handleGroupChange}
          groupsForModal={groupsForModal}
          emojis={emojis}
        />
      )}
      <Comment selectedEmoji={selectedEmoji} onClearEmoji={handleClearEmoji} />
      <HomePage style={{ display: "none" }} emojis={filteredEmojis} />
    </div>
  );
};
