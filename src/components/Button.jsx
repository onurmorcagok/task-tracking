import PropTypes from "prop-types";

const Button = ({ color, buttonText, onClick }) => {
  return (
    <div>
      <button
        className="btn"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
