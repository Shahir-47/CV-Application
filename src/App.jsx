import PDFViewer from "./components/PDFViewer.jsx";
import InputForm from "./components/InputForm.jsx";
import "./App.css";

function App() {
	return (
		<div className="main-page">
			<InputForm />
			<PDFViewer />
		</div>
	);
}

export default App;
