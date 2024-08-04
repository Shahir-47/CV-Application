// MyDocument.jsx

import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
	Link,
	Font,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
	family: "Open Sans",
	fonts: [
		{
			src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
		},
		{
			src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
			fontWeight: 600,
		},
	],
});

// Import PNG icons
import PhoneIcon from "../assets/phone.png"; // Ensure the path and file name are correct
import EmailIcon from "../assets/email.png";
import GitHubIcon from "../assets/github.png";
import LinkedInIcon from "../assets/linkedin.png";
import AddressIcon from "../assets/address.png";

// Create styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: 10,
		paddingBottom: 0,
		fontFamily: "Open Sans", // Use registered font family
	},
	header: {
		marginBottom: 3,
		textAlign: "center",
	},
	link: {
		fontSize: 12,
		textDecoration: "underline",
		color: "#000000",
	},
	text: {
		fontSize: 12,
	},
	boldText: {
		fontSize: 12,
		fontWeight: 800, // Use the registered bold font
	},
	icon: {
		width: 16,
		height: 16,
		marginRight: 5,
	},
	contactInfo: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		marginBottom: 5,
	},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 900,
	},
	separator: {
		borderBottomWidth: 1,
		marginBottom: 3,
	},
	educationItem: {
		marginBottom: 3,
	},
	universityRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	degreeRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	bulletPoints: {
		marginLeft: 5,
	},
	bulletText: {
		fontSize: 12,
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

// Utility function to format the date as "Month Year"
const formatDate = (dateString) => {
	if (!dateString) return "";

	const [year, month] = dateString.split("-");
	const date = new Date(year, month - 1);

	return date.toLocaleString("default", { month: "long", year: "numeric" });
};

// Create Document Component
const MyDocument = ({ personalDetails, educationData }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			{/* Header Section */}
			<View style={styles.header}>
				<Text style={{ fontSize: 24 }}>{personalDetails?.fullName || ""}</Text>
			</View>

			{/* Contact Information */}
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

			{/* Education Section */}
			<View>
				<Text style={styles.sectionTitle}>EDUCATION</Text>
				<View style={styles.separator} />

				{educationData?.map((education, index) => (
					<View key={index} style={styles.educationItem}>
						{/* University Name and Location */}
						<View style={styles.universityRow}>
							<Text style={styles.boldText}>
								{education?.content?.universityName || ""}
							</Text>
							<Text style={styles.boldText}>
								{education?.content?.location || ""}
							</Text>
						</View>

						{/* Degree and Graduation Date */}
						<View style={styles.degreeRow}>
							<Text style={styles.boldText}>
								{education?.content?.degree || ""}
							</Text>
							<Text style={styles.text}>
								{formatDate(education?.content?.graduationDate) || ""}
							</Text>
						</View>

						{/* GPA */}
						{education?.content?.gpa && (
							<View style={styles.bulletPoints}>
								<Text style={styles.bulletText}>
									• GPA: {education.content.gpa}
								</Text>
							</View>
						)}

						{/* Relevant Coursework */}
						{education?.content?.coursework && (
							<View style={styles.bulletPoints}>
								<Text style={styles.bulletText}>
									• Relevant Coursework: {education.content.coursework}
								</Text>
							</View>
						)}

						{/* Description */}
						{education?.content?.description?.length > 0 && (
							<View style={styles.bulletPoints}>
								{education.content.description.map((desc, idx) => (
									<Text key={idx} style={styles.bulletText}>
										• {desc}
									</Text>
								))}
							</View>
						)}
					</View>
				))}
			</View>
		</Page>
	</Document>
);

export default MyDocument;
