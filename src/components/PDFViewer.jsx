import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import propTypes from "prop-types";
import "../styles/PDFViewerComponent.css";

const PDFViewerComponent = ({ sections }) => {
	// Extract full name from the sections data
	const personalDetails = sections.find(
		(section) => section.type === "Personal"
	);
	const fullName = personalDetails?.data?.fullName?.trim(); // Trim to handle extra spaces

	// Construct a title for the PDF document
	const documentTitle = fullName ? `${fullName} Resume` : "Resume";

	return (
		<div className="pdf-viewer-container">
			<PDFViewer className="pdf-viewer">
				<MyDocument sections={sections} title={documentTitle} />
			</PDFViewer>
		</div>
	);
};

PDFViewerComponent.propTypes = {
	sections: propTypes.array.isRequired,
};

export default PDFViewerComponent;
