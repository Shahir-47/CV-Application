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
	const [activeAccordionId, setActiveAccordionId] = useState(null);
	const [sections, setSections] = useState(
		sectionsData.map((section, index) => ({
			...section,
			id: `${section.title}-${index}`, // Assign a unique ID to each section
		}))
	);
	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState("");
	const [newSectionType, setNewSectionType] = useState("Education");
	const [editingIndex, setEditingIndex] = useState(-1);
	const [editTitle, setEditTitle] = useState("");

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

	const handleAccordionClick = (id) => {
		// Disable toggle action if in edit mode
		if (editingIndex !== -1) return;

		setIsAddingSection(false); // Collapse new section form
		setActiveAccordionId((prevId) => (prevId === id ? null : id));
	};

	const handleSaveDetails = (id, itemIndex, data) => {
		const updatedSections = sections.map((section) => {
			if (section.id === id) {
				if (itemIndex === null) {
					section.data = data;
				} else if (section.type === "Personal") {
					section.data = data;
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
									: "title"
							],
						content: { ...data },
					};
				}
			}
			return section;
		});

		setSections(updatedSections);
	};

	const handleAddEntry = (id, data) => {
		const updatedSections = sections.map((section) => {
			if (section.id === id) {
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
								: "title"
						],
					content: { ...data },
					position: section.data.length,
				};

				section.data.push(newEntry);
			}
			return section;
		});

		setSections(updatedSections);
	};

	const handleDeleteEntry = (sectionId, itemIndex) => {
		const updatedSections = sections.map((section) => {
			if (section.id === sectionId) {
				section.data = section.data.filter((_, i) => i !== itemIndex);
			}
			return section;
		});

		setSections(updatedSections);
	};

	const handleAddSection = () => {
		setIsAddingSection(true);
		setActiveAccordionId(null); // Collapse all existing accordions
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
			id: `${newSectionName}-${sections.length}`, // Assign a unique ID to the new section
		};
		setSections([...sections, newSection]);
		handleCancelAddSection();
	};

	const handleDeleteSection = (id) => {
		const updatedSections = sections.filter((section) => section.id !== id);
		setSections(updatedSections);
		setActiveAccordionId(null); // Collapse active accordion after deleting
	};

	const handleMoveSection = (index, direction) => {
		const updatedSections = [...sections];
		let newIndex = index;

		if (direction === "up" && index > 0) {
			[updatedSections[index], updatedSections[index - 1]] = [
				updatedSections[index - 1],
				updatedSections[index],
			];
			newIndex = index - 1;
		} else if (direction === "down" && index < updatedSections.length - 1) {
			[updatedSections[index], updatedSections[index + 1]] = [
				updatedSections[index + 1],
				updatedSections[index],
			];
			newIndex = index + 1;
		}

		setSections(updatedSections);

		// Ensure the active section remains active
		setActiveAccordionId((prevId) => {
			if (prevId === sections[index].id) {
				// If the active section is the one being moved, it should remain active
				return updatedSections[newIndex].id;
			} else {
				// Otherwise, keep the current active section
				return prevId;
			}
		});

		setEditingIndex((prevIndex) =>
			prevIndex === index
				? newIndex
				: prevIndex === newIndex
				? index
				: prevIndex
		);
	};

	// Handle rename action
	const handleRenameSection = (index) => {
		setEditingIndex(index);
		setEditTitle(sections[index].title);
	};

	// Save the new name
	const handleSaveRename = (index) => {
		const updatedSections = [...sections];
		updatedSections[index].title = editTitle;
		setSections(updatedSections);
		setEditingIndex(-1);
	};

	// Cancel the rename action
	const handleCancelRename = () => {
		setEditingIndex(-1);
	};

	return (
		<div className="content">
			<div className="input-form">
				{sections.map((section, index) => (
					<Accordion
						key={section.id} // Use the unique ID as the key
						title={section.title}
						isActive={activeAccordionId === section.id}
						onClick={() => handleAccordionClick(section.id)}
						editing={editingIndex === index}
						editTitle={editTitle}
						onTitleChange={setEditTitle}
						controls={
							editingIndex === index ? (
								<div className="section-controls">
									<button
										type="button"
										onClick={() => handleSaveRename(index)}
										className="save-button"
										disabled={!editTitle.trim()}
									>
										Save
									</button>
									<button
										type="button"
										onClick={handleCancelRename}
										className="cancel-button"
									>
										Cancel
									</button>
								</div>
							) : (
								<div className="section-controls">
									<button
										type="button"
										onClick={() => handleMoveSection(index, "up")}
										className="move-up-button"
										disabled={index === 0}
									>
										Up
									</button>
									<button
										type="button"
										onClick={() => handleMoveSection(index, "down")}
										className="move-down-button"
										disabled={index === sections.length - 1}
									>
										Down
									</button>
									<button
										type="button"
										onClick={() => handleDeleteSection(section.id)}
										className="delete-section-button"
									>
										Delete
									</button>
									<button
										type="button"
										onClick={() => handleRenameSection(index)}
										className="rename-button"
									>
										Rename
									</button>
								</div>
							)
						}
					>
						{section.type === "Personal" ? (
							<Form
								form={section.form}
								initialValues={section.data || {}}
								onSave={(data) => handleSaveDetails(section.id, null, data)}
								onCancel={() => setActiveAccordionId(null)}
							/>
						) : (
							<List
								items={{ form: section.form }}
								onSave={(itemIndex, formData) =>
									handleSaveDetails(section.id, itemIndex, formData)
								}
								data={section.data}
								onAdd={(data) => handleAddEntry(section.id, data)}
								onDelete={(itemIndex) =>
									handleDeleteEntry(section.id, itemIndex)
								}
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
			<PDFViewerComponent sections={sections} />
		</div>
	);
}

export default InputForm;
