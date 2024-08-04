import { useState } from "react";
import Accordion from "./Accordion";
import List from "./List";
import Form from "./Form";
import PDFViewerComponent from "./PDFViewer";
import {
	sectionsData,
	educationForm,
	workExperienceForm,
	projectForm,
	achievementsForm,
	certificationsForm,
	skillsForm,
	languagesForm,
	hobbiesForm,
	interestsForm,
	otherForm,
} from "../data.js"; // Import sectionsData and other forms
import "../styles/InputForm.css";

function InputForm() {
	const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
	const [sections, setSections] = useState(sectionsData); // Use sectionsData to initialize the state
	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState("");
	const [newSectionType, setNewSectionType] = useState("Education");

	const formTypes = {
		Education: educationForm,
		"Work Experience": workExperienceForm,
		Project: projectForm,
		Achievement: achievementsForm,
		Certification: certificationsForm,
		Skill: skillsForm,
		Language: languagesForm,
		Hobby: hobbiesForm,
		Interest: interestsForm,
		Other: otherForm,
	};

	const handleAccordionClick = (index) => {
		// Collapse the "Add New Section" form whenever an accordion is clicked
		setIsAddingSection(false); // Collapse new section form
		setActiveAccordionIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleSaveDetails = (index, itemIndex, data) => {
		const updatedSections = [...sections];
		const section = updatedSections[index];

		// Update the data within the section
		if (section.type === "Personal") {
			section.data = data; // Update personal details
		} else {
			section.data[itemIndex] = {
				...section.data[itemIndex],
				title:
					data[
						section.type === "Education"
							? "universityName"
							: section.type === "Work Experience"
							? "position"
							: section.type === "Project"
							? "projectName"
							: section.type === "Achievement"
							? "achievement"
							: section.type === "Certification"
							? "certification"
							: section.type === "Skill"
							? "skill"
							: section.type === "Language"
							? "language"
							: section.type === "Hobby"
							? "hobby"
							: section.type === "Interest"
							? "interest"
							: "title" // Handle the "Other" form
					], // Update title based on section type
				content: { ...data },
			};
		}

		setSections(updatedSections);
	};

	const handleAddEntry = (index, data) => {
		const updatedSections = [...sections];
		const section = updatedSections[index];

		const newEntry = {
			title:
				data[
					section.type === "Education"
						? "universityName"
						: section.type === "Work Experience"
						? "position"
						: section.type === "Project"
						? "projectName"
						: section.type === "Achievement"
						? "achievement"
						: section.type === "Certification"
						? "certification"
						: section.type === "Skill"
						? "skill"
						: section.type === "Language"
						? "language"
						: section.type === "Hobby"
						? "hobby"
						: section.type === "Interest"
						? "interest"
						: "title" // Handle the "Other" form
				],
			content: { ...data },
		};

		section.data.push(newEntry);
		setSections(updatedSections);
	};

	const handleDeleteEntry = (sectionIndex, itemIndex) => {
		const updatedSections = [...sections];
		updatedSections[sectionIndex].data = updatedSections[
			sectionIndex
		].data.filter((_, i) => i !== itemIndex);
		setSections(updatedSections);
	};

	const handleAddSection = () => {
		setIsAddingSection(true);
		setActiveAccordionIndex(-1); // Collapse all existing accordions
	};

	const handleCancelAddSection = () => {
		setIsAddingSection(false);
		setNewSectionName("");
		setNewSectionType("Education");
	};

	const handleSaveNewSection = () => {
		const newSection = {
			title: newSectionName,
			type: newSectionType,
			data: [],
			form: formTypes[newSectionType],
		};
		setSections([...sections, newSection]);
		handleCancelAddSection(); // Reset form and close
	};

	const handleDeleteSection = (index) => {
		const updatedSections = sections.filter((_, i) => i !== index);
		setSections(updatedSections);
		setActiveAccordionIndex(-1); // Collapse active accordion after deleting
	};

	const handleMoveSection = (index, direction) => {
		const updatedSections = [...sections];
		const sectionToMove = updatedSections[index];

		// Move section up or down
		if (direction === "up" && index > 0) {
			updatedSections.splice(index, 1);
			updatedSections.splice(index - 1, 0, sectionToMove);
			if (activeAccordionIndex === index) {
				setActiveAccordionIndex(index - 1); // Keep the accordion open
			}
		} else if (direction === "down" && index < updatedSections.length - 1) {
			updatedSections.splice(index, 1);
			updatedSections.splice(index + 1, 0, sectionToMove);
			if (activeAccordionIndex === index) {
				setActiveAccordionIndex(index + 1); // Keep the accordion open
			}
		}

		// Ensure the accordion stays open
		if (direction === "up" && activeAccordionIndex === index) {
			setActiveAccordionIndex(index - 1);
		} else if (direction === "down" && activeAccordionIndex === index) {
			setActiveAccordionIndex(index + 1);
		} else {
			// Re-find the accordion by its unique identifier or title
			const openSection = updatedSections.findIndex(
				(section) => section.title === sections[activeAccordionIndex].title
			);
			setActiveAccordionIndex(openSection);
		}

		setSections(updatedSections);
	};

	// Extract personal details
	const personalDetails = sections.find(
		(section) => section.type === "Personal"
	)?.data;

	// Extract education data
	const educationData = sections.find(
		(section) => section.type === "Education"
	)?.data;

	const skillsData = sections.find((section) => section.type === "Skill")?.data;

	const workExperienceData = sections.find(
		(section) => section.type === "Work Experience"
	)?.data;

	const projectData = sections.find(
		(section) => section.type === "Project"
	)?.data;

	const achievementsData = sections.find(
		(section) => section.type === "Achievement"
	)?.data;

	const certificationsData = sections.find(
		(section) => section.type === "Certification"
	)?.data;

	return (
		<div className="content">
			<div className="input-form">
				{sections.map((section, index) => (
					<Accordion
						key={index}
						title={section.title}
						isActive={activeAccordionIndex === index}
						onClick={() => handleAccordionClick(index)}
						controls={
							<div className="section-controls">
								<button
									type="button"
									onClick={() => handleMoveSection(index, "up")}
									className="move-up-button"
									disabled={index === 0} // Disable if at the top
								>
									Up
								</button>
								<button
									type="button"
									onClick={() => handleMoveSection(index, "down")}
									className="move-down-button"
									disabled={index === sections.length - 1} // Disable if at the bottom
								>
									Down
								</button>
								<button
									type="button"
									onClick={() => handleDeleteSection(index)}
									className="delete-section-button"
								>
									Delete
								</button>
							</div>
						}
					>
						{section.type === "Personal" ? (
							<Form
								form={section.form}
								initialValues={section.data || {}}
								onSave={(data) => handleSaveDetails(index, null, data)}
								onCancel={handleCancelAddSection}
							/>
						) : (
							<List
								items={{ form: section.form }}
								onSave={(itemIndex, data) =>
									handleSaveDetails(index, itemIndex, data)
								}
								data={section.data}
								onAdd={(data) => handleAddEntry(index, data)}
								onDelete={(itemIndex) => handleDeleteEntry(index, itemIndex)}
							/>
						)}
					</Accordion>
				))}

				<button type="button" onClick={handleAddSection}>
					Add New Section
				</button>
				{isAddingSection && (
					<div className="new-section-form">
						<h3>Add New Section</h3>
						<input
							type="text"
							placeholder="Section Name"
							value={newSectionName}
							onChange={(e) => setNewSectionName(e.target.value)}
						/>
						<select
							value={newSectionType}
							onChange={(e) => setNewSectionType(e.target.value)}
						>
							{Object.keys(formTypes).map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
						<button
							type="button"
							onClick={handleSaveNewSection}
							disabled={!newSectionName.trim()}
						>
							Save Section
						</button>
						<button type="button" onClick={handleCancelAddSection}>
							Cancel
						</button>
					</div>
				)}
			</div>
			<PDFViewerComponent
				personalDetails={personalDetails}
				educationData={educationData}
				skillsData={skillsData}
				workExperienceData={workExperienceData}
				projectData={projectData}
				achievementsData={achievementsData}
				certificationsData={certificationsData}
			/>
		</div>
	);
}

export default InputForm;
