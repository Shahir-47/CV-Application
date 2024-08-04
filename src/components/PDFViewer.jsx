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
			/>
		</PDFViewer>
	);
};

export default PDFViewerComponent;
