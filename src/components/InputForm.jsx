import { useState } from "react";
import Accordion from "./Accordion";
import List from "./List";
import Form from "./Form";
import "../styles/InputForm.css";

const workExperienceForm = {
	id: "work-experience-details",
	fields: [
		{ label: "Company Name", type: "text", name: "companyName" },
		{ label: "Position", type: "text", name: "position" },
		{ label: "Location", type: "text", name: "location" },
		{ label: "Start Date", type: "date", name: "startDate" },
		{ label: "End Date", type: "date", name: "endDate" },
	],
};

const projectForm = {
	id: "project-details",
	fields: [
		{ label: "Project Name", type: "text", name: "projectName" },
		{ label: "Link", type: "url", name: "projectUrl" },
	],
};

const projectItems = {
	form: projectForm,
	data: [
		{
			title: "Project 1",
			content: {
				projectName: "Project 1",
				projectUrl: "https://project1.com",
			},
		},
		{
			title: "Project 2",
			content: {
				projectName: "Project 2",
				projectUrl: "https://project2.com",
			},
		},
	],
};

const workExperienceItems = {
	form: workExperienceForm,
	data: [
		{
			title: "Software Engineer",
			content: {
				companyName: "Google",
				position: "Software Engineer",
				location: "Mountain View, CA",
				startDate: "2020-06-01",
				endDate: "2021-08-01",
				description: ["Worked on search algorithms", "Improved performance"], // Bullet points
			},
		},
		{
			title: "Product Manager",
			content: {
				companyName: "Facebook",
				position: "Product Manager",
				location: "Menlo Park, CA",
				startDate: "2018-06-01",
				endDate: "2020-06-01",
				description: ["Managed product roadmap", "Led a team of 10"],
			},
		},
		{
			title: "Data Analyst",
			content: {
				companyName: "Amazon",
				position: "Data Analyst",
				location: "Seattle, WA",
				startDate: "2016-06-01",
				endDate: "2018-06-01",
				description: ["Analyzed customer data", "Generated reports"],
			},
		},
	],
};

const personalDetailForm = {
	id: "personal-details",
	fields: [
		{ label: "Full Name", type: "text", name: "fullName" },
		{ label: "Phone Number", type: "tel", name: "phoneNumber" },
		{ label: "Email", type: "email", name: "email" },
		{ label: "GitHub", type: "url", name: "github" },
		{ label: "LinkedIn", type: "url", name: "linkedin" },
		{ label: "Address", type: "text", name: "address" },
	],
};

const educationForm = {
	id: "education-details",
	fields: [
		{ label: "University Name", type: "text", name: "universityName" },
		{ label: "Degree", type: "text", name: "degree" },
		{ label: "Location", type: "text", name: "location" },
		{ label: "Graduation Month & Year", type: "month", name: "graduationDate" },
		{
			label: "GPA",
			type: "number",
			name: "gpa",
			step: "0.01",
			min: "0",
			max: "4",
		},
		{ label: "Relevant Coursework", type: "text", name: "coursework" },
	],
};

const educationItems = {
	form: educationForm,
	data: [
		{
			title: "Soul Society Academy",
			content: {
				universityName: "Soul Society Academy",
				degree: "Shinigami Studies",
				location: "Seireitei",
				graduationDate: "2023-06",
				gpa: "3.95",
				coursework: "Kido Magic, Hollow Studies",
				description: [], // Add bullet points for courses or achievements
			},
		},
		{
			title: "Hogwarts School of Witchcraft and Wizardry",
			content: {
				universityName: "Hogwarts School",
				degree: "Defense Against the Dark Arts",
				location: "Scotland",
				graduationDate: "2020-05",
				gpa: "3.9",
				coursework: "Potion Brewing, Magical Defense",
				description: [],
			},
		},
		{
			title: "Xavier's School for Gifted Youngsters",
			content: {
				universityName: "Xavier's School",
				degree: "Mutant Studies",
				location: "Westchester County, New York",
				graduationDate: "2021-08",
				gpa: "4.0",
				coursework: "Telepathy, Advanced Combat",
				description: [],
			},
		},
	],
};

function InputForm() {
	const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
	const [sections, setSections] = useState([
		{
			title: "Personal Details",
			data: null,
			form: personalDetailForm,
			type: "Personal",
		},
		{
			title: "Education",
			data: educationItems.data,
			form: educationForm,
			type: "Education",
		},
		{
			title: "Work Experience",
			data: workExperienceItems.data,
			form: workExperienceForm,
			type: "Work Experience",
		},
		{
			title: "Projects",
			data: projectItems.data,
			form: projectForm,
			type: "Project",
		},
	]);
	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState("");
	const [newSectionType, setNewSectionType] = useState("Education");

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
							: "projectName"
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
						: "projectName"
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
			form:
				newSectionType === "Education"
					? educationForm
					: newSectionType === "Work Experience"
					? workExperienceForm
					: projectForm,
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

	return (
		<div>
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
						<option value="Education">Education</option>
						<option value="Work Experience">Work Experience</option>
						<option value="Project">Project</option>
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
	);
}

export default InputForm;
