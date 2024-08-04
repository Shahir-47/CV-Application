// PDFViewerComponent.jsx

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PDFViewerComponent = ({
	personalDetails,
	educationData,
	skillsData,
	workExperienceData,
	projectData,
	achievementsData,
	certificationsData,
	languagesData,
	hobbiesData,
	interestsData,
	otherData,
}) => {
	return (
		<PDFViewer width="100%" height="600">
			<MyDocument
				personalDetails={personalDetails}
				educationData={educationData}
				skillsData={skillsData}
				workExperienceData={workExperienceData}
				projectData={projectData}
				achievementsData={achievementsData}
				certificationsData={certificationsData}
				languagesData={languagesData}
				hobbiesData={hobbiesData}
				interestsData={interestsData}
				otherData={otherData}
			/>
		</PDFViewer>
	);
};

export default PDFViewerComponent;
