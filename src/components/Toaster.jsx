// Toaster.jsx
import "../styles/Toaster.css"; // Import the CSS for styling

const Toaster = ({ message, type, isVisible }) => {
	return (
		<div
			className={`toaster toaster-${type} ${
				isVisible ? "toaster-visible" : "toaster-hidden"
			}`}
		>
			{message}
		</div>
	);
};

export default Toaster;
