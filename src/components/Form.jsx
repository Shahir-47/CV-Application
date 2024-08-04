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
		// Reset formData to initial empty values, defaulting "End Date" to "Present"
		const clearedData = form.fields.reduce((acc, field) => {
			acc[field.name] = field.name === "endDate" ? "Present" : ""; // Default "End Date" to "Present"
			return acc;
		}, {});

		setFormData(clearedData);
		setDescriptions([]); // Clear all descriptions
	};

	// Determine if the description field should be shown
	const shouldShowDescription = ![
		"personal-details",
		"skills-details",
		"languages-details",
		"hobbies-details",
		"interests-details",
	].includes(form.id);

	// Validation logic for required fields
	const isFormInvalid = () => {
		const validations = {
			"education-details": () => !formData.universityName?.trim(),
			"work-experience-details": () => !formData.position?.trim(),
			"project-details": () => !formData.projectName?.trim(),
			"achievements-details": () => !formData.achievement?.trim(),
			"certifications-details": () => !formData.certification?.trim(),
			"skills-details": () =>
				!formData.skill?.trim() || !formData.specifics?.trim(),
			"languages-details": () => !formData.language?.trim(),
			"hobbies-details": () => !formData.hobby?.trim(),
			"interests-details": () => !formData.interest?.trim(),
			"other-details": () => !formData.title?.trim(),
		};
		return validations[form.id]?.();
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
			{shouldShowDescription && (
				<div className="description">
					<label>Description:</label>
					<div className="bullet-points">
						{descriptions.map((desc, index) => (
							<div key={index} className="description-field">
								<input
									type="text"
									value={desc}
									onChange={(e) =>
										handleDescriptionChange(index, e.target.value)
									}
								/>
								<button
									type="button"
									onClick={() => handleRemoveDescription(index)}
								>
									Remove
								</button>
							</div>
						))}
						<button
							type="button"
							id="add-bullet"
							onClick={handleAddDescription}
						>
							Add Bullet Point
						</button>
					</div>
				</div>
			)}
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
