import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Confirmation</h2>
				<p>{message}</p>
				<div className="modal-buttons">
					<button onClick={onConfirm}>Yes</button>
					<button onClick={onClose}>No</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
