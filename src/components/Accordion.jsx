import PropTypes from "prop-types";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/down-arrow.svg";
import "../styles/Accordion.css";

function Accordion({ title, children, isActive, onClick }) {
	return (
		<div className="accordion">
			<div
				className="accordion-header"
				onClick={onClick}
				style={{ cursor: "pointer" }}
			>
				<h2>{title}</h2>
				{isActive ? (
					<img src={upArrow} alt="up arrow" />
				) : (
					<img src={downArrow} alt="down arrow" />
				)}
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
};

export default Accordion;
