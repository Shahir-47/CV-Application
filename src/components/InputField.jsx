// InputField.jsx
import PropTypes from "prop-types";

function InputField({ label, type, name, value, onChange }) {
	return (
		<div>
			<label>{label}:</label>
			<input type={type} name={name} value={value} onChange={onChange} />
		</div>
	);
}

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
};

export default InputField;
