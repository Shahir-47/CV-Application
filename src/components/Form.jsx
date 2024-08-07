import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import deleteLogo from "../assets/delete.svg";
import add from "../assets/add.svg";
import "../styles/Form.css";

function Form({ form, initialValues, onSave, onCancel }) {
	const [formData, setFormData] = useState({});
	const [descriptions, setDescriptions] = useState([]);
	const [errors, setErrors] = useState({});

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
		const newErrors = validateForm();
		if (Object.keys(newErrors).length === 0) {
			onSave({ ...formData, description: descriptions });
		} else {
			setErrors(newErrors);
		}
	};

	const handleClear = () => {
		// Reset formData to initial empty values, defaulting "End Date" to "Present"
		const clearedData = form.fields.reduce((acc, field) => {
			acc[field.name] = field.name === "endDate" ? "Present" : ""; // Default "End Date" to "Present"
			return acc;
		}, {});

		setFormData(clearedData);
		setDescriptions([]); // Clear all descriptions
		setErrors({}); // Clear all errors
	};

	const validateForm = () => {
		const newErrors = {};
		form.fields.forEach((field) => {
			if (!formData[field.name]?.trim() && field.required) {
				newErrors[field.name] = `${field.label} is required`;
			}
		});
		return newErrors;
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
		return Object.keys(validateForm()).length > 0;
	};

	const calculateRows = (text) => {
		const lineBreaks = text.split("\n").length;
		const charWidth = 50; // Adjust this based on your textarea width
		const lines = Math.ceil(text.length / charWidth);
		return Math.max(lineBreaks, lines, 1); // Ensure at least one row
	};

	return (
		<form id={form.id}>
			<p className="required-info">
				Fields with a <span className="required-asterisk">*</span> are required.
			</p>
			{form.fields.map((field, index) => (
				<div key={index} className="form-group">
					<InputField
						label={field.label}
						type={field.type}
						name={field.name}
						value={formData[field.name] || ""}
						onChange={handleInputChange}
						required={field.required}
						error={errors[field.name]}
					/>
				</div>
			))}
			{shouldShowDescription && (
				<div className="description">
					<label>Description:</label>
					<div className="bullet-points">
						{descriptions.map((desc, index) => (
							<div key={index} className="description-field">
								<textarea
									value={desc}
									onChange={(e) =>
										handleDescriptionChange(index, e.target.value)
									}
									rows={calculateRows(desc)}
								/>
								<button
									type="button"
									className="delete-btn"
									onClick={() => handleRemoveDescription(index)}
								>
									<img className="desc-delete" src={deleteLogo} alt="Delete" />
								</button>
								{index === descriptions.length - 1 && (
									<button
										className="add-desc"
										type="button"
										id="add-bullet"
										onClick={handleAddDescription}
									>
										<img src={add} alt="Add" />
									</button>
								)}
							</div>
						))}
						{descriptions.length === 0 && (
							<button
								className="add-desc"
								type="button"
								onClick={handleAddDescription}
							>
								<img src={add} alt="Add" />
							</button>
						)}
					</div>
				</div>
			)}
			<div className="form-actions">
				<button
					className="save-btn"
					type="button"
					onClick={handleSave}
					disabled={isFormInvalid()}
				>
					Save
				</button>
				{onCancel && (
					<button className="cancel-btn" type="button" onClick={onCancel}>
						Cancel
					</button>
				)}
				<button className="clear-btn" type="button" onClick={handleClear}>
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
				required: PropTypes.bool,
			})
		).isRequired,
	}).isRequired,
	initialValues: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func,
};

export default Form;
