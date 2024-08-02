import { useState } from "react";
import InputField from "./InputField";
import Form from "./Form";

function List({ items }) {
	const [activeIndex, setActiveIndex] = useState(-1);

	// Function to handle the click event and toggle the active state
	const handleItemClick = (index) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	return (
		<div>
			{items.data.map((item, index) => (
				<div
					key={index}
					className={`item ${activeIndex === index ? "active" : ""}`}
				>
					<div className="item-header" onClick={() => handleItemClick(index)}>
						<h2>{item.title}</h2>
					</div>
					{activeIndex === index && (
						<div className="item-content">
							<Form form={items.form} />
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default List;
