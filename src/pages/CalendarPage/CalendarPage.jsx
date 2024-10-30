// import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./CalendarPage.scss"

// const localizer = momentLocalizer(moment);

// export const CalendarPage = () => {
//  const events = [];
//     return (
//       <div className="calendar-container">
//         <h2 className="calendar-title">Calendar of Your Mood</h2>
//         <BigCalendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 550 }}
//         />
//       </div>
//     );
// }

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.scss";

export const CalendarPage = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("moodData")) || [];
    setMoodData(data);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);

    const moodForDate = moodData.find(
      (item) => new Date(item.date).toDateString() === date.toDateString()
    );

    setSelectedMood(moodForDate || null);

    setIsModalOpen(true);
  };

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedMood(null);
    };
  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendar of Your Mood</h2>

      <Calendar
        onClickDay={handleDateClick}
      />
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={closeModal}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Mood Details for {selectedDate?.toDateString()}</h3>
            {selectedMood ? (
              <div className="mood-details">
                <img src={selectedMood.img} alt={selectedMood.moodName} />
                <p>
                  <strong>Emotion:</strong> {selectedMood.name}
                </p>

                <p>
                  <strong>Comment:</strong> {selectedMood.comment}
                </p>
                <p>
                  <strong>Mood Level:</strong> {selectedMood.moodLevel}
                </p>
              </div>
            ) : (
              <p>No mood data available for this date.</p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
