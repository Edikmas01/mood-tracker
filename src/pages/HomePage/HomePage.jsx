import { useEffect, useState } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const [emojis, setEmojis] = useState([]);
  const { token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to="/main" replace />;
  }

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

  const filteredEmojis = emojis.filter((emoji) => emoji.option === "one");

  return (
    <div className="home">
      <div className="btn-container">
        <button className="home-btn">
          <Link to="/login">log in</Link>
        </button>
        <button className="home-btn">
          <Link to="/register">connect</Link>
        </button>
      </div>

      <section className="section">
        <h1 className="home-title">What is this?</h1>
        <div className="emoji-group">
          {filteredEmojis.map((emoji, index) => (
            <div className="emoji-container" key={index}>
              <img src={emoji.img} alt={emoji.name} className="emoji" />
              <div className="overlay">
                <p>{emoji.name}</p>
                <div className="arrow"></div>
              </div>
            </div>
          ))}
          <button className="plus-btn">+</button>
        </div>
        <div className="text-img">
          <p className="home-text">
            this application will help you understand your emotions, track
            statistics and find out the precise connections between your
            emotions
          </p>
          <img
            src="/public/img/homeImg/meinPageOne.png"
            alt="Снимок экрана 2024-10-03 140548"
            className="home-image"
          />
        </div>
      </section>

      <section className="section">
        <h1 className="home-title">How does this work?</h1>
        <div className="emoji-group">
          {filteredEmojis.map((emoji, index) => (
            <div className="emoji-container" key={index}>
              <img src={emoji.img} alt={emoji.name} className="emoji" />
              <div className="overlay">
                <p>{emoji.name}</p>
                <div className="arrow"></div>
              </div>
            </div>
          ))}
          <button className="plus-btn">+</button>
        </div>
        <div className="text-img-two">
          <img
            src="/public/img/homeImg/meinPageTwo.png"
            alt="Снимок экрана 2024-10-03 140548"
            className="home-image-two"
          />

          <p className="home-text">
            just come in every day, note your emotions and watch how everything
            begins to change. Magic
          </p>
        </div>
      </section>
    </div>
  );
};
