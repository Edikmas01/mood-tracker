import { useState } from "react";
import "./BurgerMenu.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {removeUser} from "../../store/slices/userSlice"

export const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReminderOn, setIsReminderOn] = useState(false);
  const dispath =useDispatch()


  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

const handleMenuItemClick = () => {
  setIsMenuOpen(false); 
};


  const handleReminderToggle = () => {
    setIsReminderOn(!isReminderOn);
    
  };

  const handleLogOut = () => {
    dispath(removeUser())
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
              <li className="menu-item" onClick={handleMenuItemClick}>
                <Link className="menu-link" to="/main">
                  Mood tracker
                </Link>
              </li>
              <li className="menu-item" onClick={handleMenuItemClick}>
                <Link className="menu-link" to="/statistics">
                  Statistics
                </Link>
              </li>
              <li
                className="menu-item"
                onClick={handleMenuItemClick}
              >
                <Link className="menu-link" to="/calendar">
                  Calendar of your mood
                </Link>
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
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
