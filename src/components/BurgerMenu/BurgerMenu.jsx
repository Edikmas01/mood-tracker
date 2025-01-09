
import { useState, useEffect } from "react";
import "./BurgerMenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { getCurrentUser } from "../../services/CurrentUser/getCurrentUser";
// import { sendEmail } from "../../services/Mailer/Mailer";
import { getDatabase, ref, onValue} from "firebase/database";
// import { update } from "firebase/database";

export const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isReminderOn, setIsReminderOn] = useState(false);
  const dispatch = useDispatch();
const navigete = useNavigate()
  const user = getCurrentUser(); 
  const userId = user?.id; 


  useEffect(() => {
    if (!userId) return;

    const db = getDatabase();
    const userRef = ref(db, `moods/${userId}/reminderEnabled`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        // setIsReminderOn(data); 
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // const handleCheckboxChange = (isChecked) => {
  //   if (!userId) {
  //     alert("Вы не авторизованы.");
  //     return;
  //   }

  //   const db = getDatabase();
  //   const userRef = ref(db, `moods/${userId}`);

  //   update(userRef, { reminderEnabled: isChecked })
  //     .then(() => {
  //       console.log("Состояние чекбокса успешно сохранено!");
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при сохранении:", error);
  //     });
  // };


  // const handleReminderToggle = () => {
  //   const newReminderState = !isReminderOn;
  //   setIsReminderOn(newReminderState); 
  //   handleCheckboxChange(newReminderState); 

  //   if (newReminderState) {
  //     sendEmail(user.email); 
  //   }
  // };

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    dispatch(removeUser());
    navigete("/")
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
              <li className="menu-item" onClick={() => setIsMenuOpen(false)}>
                <Link className="menu-link" to="/main">
                  Mood tracker
                </Link>
              </li>
              <li className="menu-item" onClick={() => setIsMenuOpen(false)}>
                <Link className="menu-link" to="/statistics">
                  Statistics
                </Link>
              </li>
              <li className="menu-item" onClick={() => setIsMenuOpen(false)}>
                <Link className="menu-link" to="/calendar">
                  Calendar of your mood
                </Link>
              </li>
              {/* <li className="menu-item">
                <label className="checkbox-ios">
                  <input
                    type="checkbox"
                    checked={isReminderOn}
                    onChange={handleReminderToggle}
                  />
                  <span className="checkbox-ios-switch"></span>
                </label>
                Reminder
              </li> */}
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
