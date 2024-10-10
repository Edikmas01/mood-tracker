import './MoodTracker.scss'
import { useState } from "react";


const moods = [
  { id: 1, emoji: "😀", name: "Счастлив" },
  { id: 2, emoji: "🙂", name: "Хорошее" },
  { id: 3, emoji: "😐", name: "Нейтральное" },
  { id: 4, emoji: "☹️", name: "Грустное" },
  { id: 5, emoji: "😢", name: "Плохое" },
];
export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const hendlMoodClik = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div className="mood">
      <h1 className="mood-title">Who are you today?</h1>
      <div className="mood-icon">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => hendlMoodClik(mood)}
            className={`mood-button ${selectedMood === mood ? "selected" : ""}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="selected-mood">
          <h2>Вы выбрали: {selectedMood.name}</h2>
        </div>
      )}
    </div>
  );
};
