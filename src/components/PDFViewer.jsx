import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

const PDFViewerComponent = ({ personalDetails }) => {
	return (
		<PDFViewer width="100%" height="600">
			<MyDocument personalDetails={personalDetails} />
		</PDFViewer>
	);
};

export default PDFViewerComponent;
