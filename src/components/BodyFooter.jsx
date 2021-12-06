import { Link } from "react-router-dom";

const BodyFooter = () => {
  return (
    <footer>
      <h3>Task Tracking Form</h3>
      <div className="link-area">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default BodyFooter;
