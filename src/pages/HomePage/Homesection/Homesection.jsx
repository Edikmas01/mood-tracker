// components/Section.jsx
import Homeemoji from "../Homeemoji/Homeemoji";

const Homesection = ({
  title,
  text,
  imgSrc,
  isReversed = false,
  emojis,
  showEmojis = false,
}) => (
  <section className="section">
    <h1 className="home-title">{title}</h1>
    {showEmojis && (
      <div className="emoji-group">
        {emojis.map((emoji) => (
          <Homeemoji key={emoji.id} emoji={emoji} />
        ))}
        <button className="plus-btn">
          +
          <div className="overlay">
            <p>Choose more</p>
            <div className="arrow"></div>
          </div>
        </button>
      </div>
    )}
    <div className={`text-img${isReversed ? "-two" : ""}`}>
      {isReversed ? (
        <>
          <img
            src={imgSrc}
            alt=""
            className={`home-image${isReversed ? "-two" : ""}`}
          />
          <p className="home-text">{text}</p>
        </>
      ) : (
        <>
          <p className="home-text">{text}</p>
          <img
            src={imgSrc}
            alt=""
            className={`home-image${isReversed ? "-two" : ""}`}
          />
        </>
      )}
    </div>
  </section>
);

export default Homesection;
