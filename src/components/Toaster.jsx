// Toaster.jsx
import "../styles/Toaster.css"; // Import the CSS for styling

const Toaster = ({ message, type, isVisible }) => {
	if (!isVisible) return null;

	return <div className={`toaster toaster-${type}`}>{message}</div>;
};

export default Toaster;
