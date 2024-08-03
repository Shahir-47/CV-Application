// InputForm.jsx
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
	const [personalDetails, setPersonalDetails] = useState({});
	const [educationDetails, setEducationDetails] = useState(educationItems.data);
	const [workExperienceDetails, setWorkExperienceDetails] = useState(
		workExperienceItems.data
	);

	const handleAccordionClick = (index) => {
		setActiveAccordionIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleSavePersonalDetails = (data) => {
		setPersonalDetails(data);
	};

	const handleSaveEducationDetails = (index, data) => {
		const updatedDetails = [...educationDetails];
		updatedDetails[index] = {
			...updatedDetails[index],
			title: data.universityName, // Update title
			content: { ...data },
		};
		setEducationDetails(updatedDetails);
	};

	const handleSaveWorkExperienceDetails = (index, data) => {
		const updatedDetails = [...workExperienceDetails];
		updatedDetails[index] = {
			...updatedDetails[index],
			title: data.position, // Update title
			content: { ...data },
		};
		setWorkExperienceDetails(updatedDetails);
	};

	const handleAddEducation = (data) => {
		const newEntry = {
			title: data.universityName,
			content: { ...data },
		};
		setEducationDetails([...educationDetails, newEntry]);
		setActiveAccordionIndex(-1); // Close accordion after adding
	};

	const handleAddWorkExperience = (data) => {
		const newEntry = {
			title: data.position,
			content: { ...data },
		};
		setWorkExperienceDetails([...workExperienceDetails, newEntry]);
		setActiveAccordionIndex(-1); // Close accordion after adding
	};

	const handleCancel = () => {
		setActiveAccordionIndex(-1);
	};

	return (
		<div>
			<Accordion
				title="Personal Details"
				isActive={activeAccordionIndex === 0}
				onClick={() => handleAccordionClick(0)}
			>
				<Form
					form={personalDetailForm}
					initialValues={personalDetails}
					onSave={handleSavePersonalDetails}
					onCancel={handleCancel}
				/>
			</Accordion>
			<Accordion
				title="Education"
				isActive={activeAccordionIndex === 1}
				onClick={() => handleAccordionClick(1)}
			>
				<List
					items={educationItems}
					onSave={handleSaveEducationDetails}
					data={educationDetails}
					onAdd={handleAddEducation}
				/>
			</Accordion>
			<Accordion
				title="Work Experience"
				isActive={activeAccordionIndex === 2}
				onClick={() => handleAccordionClick(2)}
			>
				<List
					items={workExperienceItems}
					onSave={handleSaveWorkExperienceDetails}
					data={workExperienceDetails}
					onAdd={handleAddWorkExperience}
				/>
			</Accordion>
		</div>
	);
}

export default InputForm;
