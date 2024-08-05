// PDFViewerComponent.jsx

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PDFViewerComponent = ({ sections }) => {
	// Extract full name from the sections data
	// Extract full name from the sections data
	const personalDetails = sections.find(
		(section) => section.type === "Personal"
	);
	const fullName = personalDetails?.data?.fullName?.trim(); // Trim to handle extra spaces

	// Construct a title for the PDF document
	const documentTitle = fullName ? `${fullName} Resume` : "Resume";

	return (
		<PDFViewer width="100%" height="600">
			<MyDocument sections={sections} title={documentTitle} />
		</PDFViewer>
	);
};

export default PDFViewerComponent;
