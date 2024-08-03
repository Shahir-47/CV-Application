import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";

// Dummy data for personal details
const personalDetails = {
	fullName: "SHINICHI SHI",
	phoneNumber: "1234567890",
	email: "zoro@kaguya-sama.com",
	github: "https://github.com/ShinichiShi",
	linkedin: "https://linkedin.com/in/supreeth-c-shinichi",
	address: "Impel Down, Block E",
};

const PDFViewerComponent = () => {
	return (
		<PDFViewer width="100%" height="600">
			<MyDocument personalDetails={personalDetails} />
		</PDFViewer>
	);
};

export default PDFViewerComponent;
