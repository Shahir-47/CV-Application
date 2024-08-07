import "../styles/Toaster.css";
import PropTypes from "prop-types";

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

Toaster.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["success", "error"]),
	isVisible: PropTypes.bool.isRequired,
};

export default Toaster;
