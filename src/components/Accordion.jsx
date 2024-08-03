// Accordion.jsx
import PropTypes from "prop-types";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/down-arrow.svg";
import "../styles/Accordion.css";

function Accordion({ title, children, isActive, onClick, controls }) {
	return (
		<div className="accordion">
			<div
				className="accordion-header"
				style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
			>
				<div
					style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
					onClick={onClick}
				>
					<h2>{title}</h2>
					{isActive ? (
						<img src={upArrow} alt="up arrow" />
					) : (
						<img src={downArrow} alt="down arrow" />
					)}
				</div>
				<div>{controls}</div>
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
	controls: PropTypes.node, // Add this line to accept controls
};

export default Accordion;
