// PDFViewerComponent.jsx

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PDFViewerComponent = ({ sections }) => {
	return (
		<PDFViewer width="100%" height="600">
			<MyDocument sections={sections} />
		</PDFViewer>
	);
};

export default PDFViewerComponent;
