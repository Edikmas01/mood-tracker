import { useState } from "react";
import "./BurgerMenu.scss";
import { StatisticsModal } from "../StatisticsModal/StatisticsModal";

export const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isReminderOn, setIsReminderOn] = useState(false);
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleStatisticsClick = () => {
    console.log("Statistics page opened");
    setIsStatisticsModalOpen(true);
  };
    
  const handleCalendarClick = () => {
    console.log("Mood calendar opened");
  };

  const handleReminderToggle = () => {
    setIsReminderOn(!isReminderOn);
    console.log(`Reminder set to ${!isReminderOn ? "ON" : "OFF"}`);
  };

  const handleLogOut = () => {
    console.log("User logged out");
  };
  return (
    <div className="burgerMenu">
      <button onClick={handleMenuOpen} className="burgerMenu-button">
        {isMenuOpen ? "" : "☰"}
      </button>

      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            <ul className="menu-list">
              <li className="menu-item" onClick={handleStatisticsClick}>
                Statistics
              </li>
              <li className="menu-item" onClick={handleCalendarClick}>
                Calendar of your mood
              </li>
              <li className="menu-item">
                <label className="checkbox-ios">
                  <input
                    type="checkbox"
                    checked={isReminderOn}
                    onChange={handleReminderToggle}
                  />
                  <span className="checkbox-ios-switch"></span>
                </label>
                Reminder
              </li>
            </ul>
            <button className="menu-button" onClick={handleLogOut}>
              log out
            </button>
          </div>
        </div>
      )}
      <StatisticsModal
        isOpen={isStatisticsModalOpen}
        onClose={() => setIsStatisticsModalOpen(false)}
      />
    </div>
  );
};
