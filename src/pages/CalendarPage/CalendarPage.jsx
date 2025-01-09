import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.scss";
import { fetchUserMoodData } from "../../services/fetchUserMoodData";
import { getAuth } from "firebase/auth";

export const CalendarPage = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;
          const moodData = await fetchUserMoodData(userId);

          if (moodData) {
            const formatData = Object.keys(moodData).map((key) => ({
              id: key,
              ...moodData[key],
            }));
            setMoodData(formatData);
          } else {
            console.log("No mood data available for the user.");
          }
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);

    const moodsForDate = moodData.filter(
      (item) =>
        new Date(item.date).toDateString() === new Date(date).toDateString()
    );

    setSelectedMood(moodsForDate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMood([]);
  };

  console.log("Mood Data Array:", moodData);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendar of Your Mood</h2>
      <Calendar onClickDay={handleDateClick} />
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={closeModal}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Mood Details for {selectedDate?.toDateString()}</h3>

            {selectedMood.length > 0 ? (
              <div className="mood-details-list">
                {selectedMood.map((mood) => (
                  <div key={mood.id} className="mood-details">
                    <img src={mood.img} alt={mood.moodName} />
                    <p>
                      <strong>Emotion:</strong> {mood.name}
                    </p>

                    <p>
                      <strong>Comment:</strong> {mood.comment}
                    </p>
                    <p>
                      <strong>Mood Level:</strong> {mood.moodLevel}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No mood data available for this date.</p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <p className="clue">
        On this page you can see what your mood was like in the past, just
        choose a specific day.
      </p>
    </div>
  );
};
