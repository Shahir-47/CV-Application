import { useState } from "react";
import contentLogo from "../assets/content.svg";

function IndividualTab(title, logo, isActive, onClick) {
	return (
		<div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
			<img src={logo} alt="content" />
			<span>{title}</span>
		</div>
	);
}

function SelectionTab() {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<div className="selection-tab">
			<button>
				<img src={contentLogo} alt="content" />
				<span>{title}</span>
			</button>
			<button></button>
		</div>
	);
}
