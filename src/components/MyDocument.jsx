// MyDocument.jsx

import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
	Link,
} from "@react-pdf/renderer";

// Import PNG icons
import PhoneIcon from "../assets/phone.svg"; // Ensure the path and file name are correct
import EmailIcon from "../assets/email.png";
import GitHubIcon from "../assets/github.svg";
import LinkedInIcon from "../assets/linkedin.svg";
import AddressIcon from "../assets/address.svg";

// Create styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		paddingTop: 10,
		paddingLeft: 0, // Ensure no left padding
		paddingRight: 0, // Ensure no right padding
		paddingBottom: 0, // Add this line if needed
		alignItems: "flex-start",
	},
	header: {
		marginBottom: 10,
		textAlign: "center", // Center-align the header text
	},
	link: {
		fontSize: 12,
		marginBottom: 4,
		textDecoration: "underline",
	},
	text: {
		fontSize: 12,
		marginBottom: 4,
	},
	icon: {
		width: 16, // Set a size for the PNG icon
		height: 16,
		marginRight: 5,
	},
	contactInfo: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		marginLeft: 0, // Ensure no left margin
		paddingLeft: 0, // Ensure no left padding
	},
	contactItem: {
		flexDirection: "row", // Make the text and icon in a row
		alignItems: "center", // Align items vertically center
		margin: "0 15px 0 0", // Space between contact items, ensure no left margin
		padding: 0,
	},
});

// Utility function to extract username from URL
const extractUsername = (url) => {
	try {
		const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
		const pathSegments = parsedUrl.pathname.split("/");
		return pathSegments[pathSegments.length - 1];
	} catch (error) {
		console.error("Invalid URL:", url);
		return url; // Return the original URL if there's an error
	}
};

// Create Document Component
const MyDocument = ({ personalDetails }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.header}>
				<Text style={{ fontSize: 24 }}>{personalDetails?.fullName || ""}</Text>
			</View>
			<View style={styles.contactInfo}>
				<View style={styles.contactItem}>
					<Image style={styles.icon} src={PhoneIcon} />
					<Text style={styles.text}>{personalDetails?.phoneNumber || ""}</Text>
				</View>
				<View style={styles.contactItem}>
					<Image style={styles.icon} src={EmailIcon} />
					<Text style={styles.link}>{personalDetails?.email || ""}</Text>
				</View>
				<View style={styles.contactItem}>
					<Image style={styles.icon} src={GitHubIcon} />
					<Link
						style={styles.link}
						src={`https://${personalDetails?.github || ""}`}
					>
						{extractUsername(personalDetails?.github || "")}
					</Link>
				</View>
				<View style={styles.contactItem}>
					<Image style={styles.icon} src={LinkedInIcon} />
					<Link
						style={styles.link}
						src={`https://${personalDetails?.linkedin || ""}`}
					>
						{extractUsername(personalDetails?.linkedin || "")}
					</Link>
				</View>
				<View style={styles.contactItem}>
					<Image style={styles.icon} src={AddressIcon} />
					<Text style={styles.text}>{personalDetails?.address || ""}</Text>
				</View>
			</View>
		</Page>
	</Document>
);

export default MyDocument;
