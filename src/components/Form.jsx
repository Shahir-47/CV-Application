import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import "../styles/Form.css";

function Form({ form, initialValues, onSave, onCancel }) {
	const [formData, setFormData] = useState({});
	const [descriptions, setDescriptions] = useState([]);

	useEffect(() => {
		// Initialize formData with initialValues or default values
		setFormData((prevFormData) => ({
			...form.fields.reduce((acc, field) => {
				acc[field.name] = field.name === "endDate" ? "Present" : "";
				return acc;
			}, {}),
			...initialValues,
		}));

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
			acc[field.name] = field.name === "endDate" ? "Present" : ""; // Default "Present" for endDate
			return acc;
		}, {});

		setFormData(clearedData);
		setDescriptions([]); // Clear all descriptions
	};

	const isFormInvalid = () => {
		// For your requirement, no form fields are mandatory, so return false
		return false;
	};

	// Determine if the description field should be shown
	const shouldShowDescription = ![
		"personal-details",
		"skills-details",
		"languages-details",
		"hobbies-details",
		"interests-details",
	].includes(form.id);

	return (
		<form id={form.id}>
			{form.fields.map((field, index) => {
				if (field.type === "select" && field.name === "endDate") {
					// Dynamically create options for end date
					const pastMonths = [];
					const today = new Date();
					for (let year = 2000; year <= today.getFullYear(); year++) {
						for (let month = 0; month < 12; month++) {
							const date = new Date(year, month);
							if (date <= today) {
								const value = date.toISOString().substr(0, 7);
								const label = date.toLocaleString("default", {
									month: "long",
									year: "numeric",
								});
								pastMonths.push({ label, value });
							}
						}
					}

					return (
						<div key={index} className="input-field">
							<label>{field.label}</label>
							<select
								name={field.name}
								value={formData[field.name] || "Present"}
								onChange={handleInputChange}
							>
								{pastMonths.map((option, i) => (
									<option key={`month-${i}`} value={option.value}>
										{option.label}
									</option>
								))}
								<option value="Present">Present</option>
							</select>
						</div>
					);
				} else {
					return (
						<InputField
							key={index}
							label={field.label}
							type={field.type}
							name={field.name}
							value={formData[field.name] || ""}
							onChange={handleInputChange}
						/>
					);
				}
			})}
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
