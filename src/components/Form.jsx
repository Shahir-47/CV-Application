// Form.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import "../styles/Form.css";

function Form({ form, initialValues, onSave }) {
	const [formData, setFormData] = useState({});
	const [descriptions, setDescriptions] = useState([]);

	useEffect(() => {
		setFormData(initialValues);

		// Initialize descriptions array from initial values
		if (initialValues.description) {
			setDescriptions(initialValues.description);
		} else {
			setDescriptions([]);
		}
	}, [initialValues]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleDescriptionChange = (index, value) => {
		const updatedDescriptions = [...descriptions];
		updatedDescriptions[index] = value;
		setDescriptions(updatedDescriptions);
	};

	const handleAddDescription = () => {
		setDescriptions([...descriptions, ""]); // Add an empty bullet point
	};

	const handleRemoveDescription = (index) => {
		const updatedDescriptions = descriptions.filter((_, i) => i !== index);
		setDescriptions(updatedDescriptions);
	};

	const handleSave = () => {
		onSave({ ...formData, description: descriptions });
	};

	return (
		<form id={form.id}>
			{form.fields.map((field, index) => (
				<InputField
					key={index}
					label={field.label}
					type={field.type}
					name={field.name}
					value={formData[field.name] || ""}
					onChange={handleInputChange}
				/>
			))}
			<div className="description">
				<label>Description:</label>
				<div className="bullet-points">
					{descriptions.map((desc, index) => (
						<div key={index} className="description-field">
							<input
								type="text"
								value={desc}
								onChange={(e) => handleDescriptionChange(index, e.target.value)}
							/>
							<button
								type="button"
								onClick={() => handleRemoveDescription(index)}
							>
								Remove
							</button>
						</div>
					))}
					<button type="button" id="add-bullet" onClick={handleAddDescription}>
						Add Bullet Point
					</button>
				</div>
			</div>
			<button type="button" onClick={handleSave}>
				Save
			</button>
		</form>
	);
}

Form.propTypes = {
	form: PropTypes.shape({
		id: PropTypes.string.isRequired,
		fields: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				type: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
	initialValues: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
};

export default Form;
