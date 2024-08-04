// PDFViewerComponent.jsx

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PDFViewerComponent = ({
	personalDetails,
	educationData,
	skillsData,
	workExperienceData,
}) => {
	return (
		<PDFViewer width="100%" height="600">
			<MyDocument
				personalDetails={personalDetails}
				educationData={educationData}
				skillsData={skillsData}
				workExperienceData={workExperienceData}
			/>
		</PDFViewer>
	);
};

export default PDFViewerComponent;
