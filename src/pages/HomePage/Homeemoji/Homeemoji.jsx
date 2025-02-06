
export const Homeemoji = ({ emoji }) => (
  <div className="emoji-container">
    <img src={emoji.img} alt={emoji.name} className="emoji" />
    <div className="overlay">
      <p>{emoji.name}</p>
      <div className="arrow"></div>
    </div>
  </div>
);

