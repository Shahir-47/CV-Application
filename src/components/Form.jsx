import InputField from "./InputField";
import PropTypes from "prop-types";

function Form({ form }) {
	return (
		<form id={form.id}>
			{form.fields.map((field, index) => (
				<InputField key={index} {...field} />
			))}
		</form>
	);
}

Form.propTypes = {
	form: PropTypes.object,
};

export default Form;
