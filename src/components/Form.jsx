import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import "../styles/Form.css";

function Form({ form, initialValues, onSave, onCancel }) {
	const [formData, setFormData] = useState({});
	const [descriptions, setDescriptions] = useState([]);

	useEffect(() => {
		setFormData(initialValues);
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
		setDescriptions([...descriptions, ""]);
	};

	const handleRemoveDescription = (index) => {
		const updatedDescriptions = descriptions.filter((_, i) => i !== index);
		setDescriptions(updatedDescriptions);
	};

	const handleSave = () => {
		onSave({ ...formData, description: descriptions });
	};

	const handleClear = () => {
		// Reset formData to initial empty values
		const clearedData = form.fields.reduce((acc, field) => {
			acc[field.name] = ""; // Set each field to an empty string
			return acc;
		}, {});

		setFormData(clearedData);
		setDescriptions([]); // Clear all descriptions
	};

	const isFormInvalid = () => {
		// Check if the required title field is empty for specific forms
		const titleFieldName =
			form.id === "education-details"
				? "universityName"
				: form.id === "work-experience-details"
				? "position"
				: form.id === "project-details"
				? "projectName"
				: form.id === "achievements-details"
				? "achievement"
				: form.id === "certifications-details"
				? "certification"
				: form.id === "skills-details"
				? "skill"
				: form.id === "languages-details"
				? "language"
				: form.id === "hobbies-details"
				? "hobby"
				: form.id === "interests-details"
				? "interest"
				: form.id === "other-details"
				? "title"
				: null; // Handle additional forms if necessary

		// Check if the specific title field is empty if applicable
		const isTitleFieldEmpty =
			titleFieldName &&
			(!formData[titleFieldName] || formData[titleFieldName].trim() === "");

		// Only check if the form is empty if it requires a title field
		if (titleFieldName) {
			return isTitleFieldEmpty;
		}

		// For forms that don't require a title field, allow saving as long as any field is filled
		return false;
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
			<div className="form-actions">
				<button
					id="save-btn"
					type="button"
					onClick={handleSave}
					disabled={isFormInvalid()} // Disable if the form is invalid
				>
					Save
				</button>
				{onCancel && (
					<button type="button" onClick={onCancel}>
						Cancel
					</button>
				)}
				<button type="button" onClick={handleClear}>
					Clear
				</button>
			</div>
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
	onCancel: PropTypes.func, // Handle cancel action
};

export default Form;
