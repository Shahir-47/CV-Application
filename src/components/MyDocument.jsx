import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: 20,
	},
	header: {
		marginBottom: 20,
	},
	section: {
		marginBottom: 10,
	},
	text: {
		fontSize: 12,
		marginBottom: 4,
	},
	contactInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	link: {
		color: "blue",
		textDecoration: "underline",
	},
});

// Create Document Component
const MyDocument = ({ personalDetails }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.header}>
				<Text style={{ fontSize: 24 }}>{personalDetails.fullName}</Text>
			</View>
			<View style={styles.contactInfo}>
				<Text style={styles.text}>📞 {personalDetails.phoneNumber}</Text>
				<Text style={styles.text}>📧 {personalDetails.email}</Text>
				<Text style={styles.text}>
					🔗{" "}
					<a style={styles.link} href={personalDetails.github}>
						{personalDetails.github}
					</a>
				</Text>
				<Text style={styles.text}>
					🔗{" "}
					<a style={styles.link} href={personalDetails.linkedin}>
						{personalDetails.linkedin}
					</a>
				</Text>
				<Text style={styles.text}>📍 {personalDetails.address}</Text>
			</View>
		</Page>
	</Document>
);

export default MyDocument;
