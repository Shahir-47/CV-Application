import PropTypes from "prop-types";

function InputField({ label, type, name }) {
	return (
		<div>
			<label>{label}:</label>
			<input type={type} name={name} />
		</div>
	);
}

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default InputField;
