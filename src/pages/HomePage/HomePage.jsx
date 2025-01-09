
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Homesection from "./Homesection/Homesection";
import "./HomePage.scss";

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
        setEmojis(data.filter((emoji) => emoji.option === "one"));
      } catch (error) {
        console.error("Ошибка при загрузке смайлов:", error);
      }
    };

    fetchEmojis();
  }, []);

  const sections = [
    {
      title: "What is this?",
      text: "This application will help you understand your emotions, track statistics and find out the precise connections between your emotions.",
      imgSrc: "/public/img/homeImg/meinPageOne.png",
      emojis: emojis,
      showEmojis: true,
    },
    {
      title: "How does this work?",
      text: "Just come in every day, note your emotions and watch how everything begins to change. Magic.",
      imgSrc: "/public/img/homeImg/meinPageTwo.png",
      emojis: emojis,
      showEmojis: true,
      isReversed: true,
    },
    {
      title: "What else can make?",
      text: "Track your mood statistics and follow the dynamics of changes.",
      imgSrc: "/public/img/homeImg/meinPageThee.png",
    },
    {
      title: "Maybe something else??",
      text: "You can also view your emotions on any day, thanks to the calendar with your notes.",
      imgSrc: "/public/img/homeImg/meinPageFor.png",
      isReversed: true,
    },
  ];

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
      {sections.map((section, index) => (
        <Homesection key={index} {...section} />
      ))}
    </div>
  );
};

export default HomePage;
