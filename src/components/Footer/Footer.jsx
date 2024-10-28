import"./Footer.scss"
export const Footer = () => {
    const today = new Date(); 
    
  const formattedDate = today.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }); 

  return (
    <footer className="footer">
      <p className="footer-text">{formattedDate}</p>
    </footer>
  );
};

