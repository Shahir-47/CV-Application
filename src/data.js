// data.js

export const workExperienceForm = {
	id: "work-experience-details",
	fields: [
		{ label: "Company Name", type: "text", name: "companyName" },
		{ label: "Position", type: "text", name: "position" },
		{ label: "Location", type: "text", name: "location" },
		{ label: "Start Date", type: "date", name: "startDate" },
		{ label: "End Date", type: "date", name: "endDate" },
	],
};

export const projectForm = {
	id: "project-details",
	fields: [
		{ label: "Project Name", type: "text", name: "projectName" },
		{ label: "Link", type: "url", name: "projectUrl" },
	],
};

export const projectItems = {
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

export const workExperienceItems = {
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

export const personalDetailForm = {
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

export const educationForm = {
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

export const educationItems = {
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

export const sectionsData = [
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
];
