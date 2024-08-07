import "../styles/Modal.css";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Confirmation</h2>
				<p>{message}</p>
				<div className="modal-buttons">
					<button className="confirm-yes" onClick={onConfirm}>
						Yes
					</button>
					<button className="confirm-no" onClick={onClose}>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
};

export default Modal;
