import PropTypes from "prop-types";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/down-arrow.svg";
import "../styles/Accordion.css";

function Accordion({
	title,
	children,
	isActive,
	onClick,
	controls,
	editing,
	onTitleChange,
	editTitle,
}) {
	return (
		<div className="accordion">
			<div
				className="accordion-header"
				style={{
					display: "flex",
					alignItems: "center",
					cursor: editing ? "default" : "pointer", // Only make it clickable if not editing
				}}
			>
				<div
					style={{
						flexGrow: 1,
						display: "flex",
						alignItems: "center",
						margin: "0.25rem 0",
						gap: "0.5rem",
					}}
					onClick={!editing ? onClick : undefined} // Disable onClick if editing
				>
					{editing ? (
						<input
							type="text"
							className="edit-title"
							value={editTitle}
							onChange={(e) => onTitleChange(e.target.value)}
						/>
					) : (
						<h2>{title}</h2>
					)}
					{isActive ? (
						<img src={upArrow} alt="up arrow" />
					) : (
						<img src={downArrow} alt="down arrow" />
					)}
				</div>
				<div onClick={(e) => e.stopPropagation()}>{controls}</div>{" "}
			</div>
			{isActive && <div className="accordion-content">{children}</div>}
		</div>
	);
}

Accordion.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node,
	isActive: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	controls: PropTypes.node,
	editing: PropTypes.bool.isRequired,
	onTitleChange: PropTypes.func.isRequired,
	editTitle: PropTypes.string.isRequired,
};

export default Accordion;
