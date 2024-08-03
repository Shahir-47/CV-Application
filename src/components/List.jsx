// List.jsx
import React, { useState } from "react";
import Form from "./Form";

function List({ items, onSave, data }) {
	const [activeIndex, setActiveIndex] = useState(-1);

	const handleItemClick = (index) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	return (
		<div>
			{data.map((item, index) => (
				<div
					key={index}
					className={`item ${activeIndex === index ? "active" : ""}`}
				>
					<div className="item-header" onClick={() => handleItemClick(index)}>
						<h2>{item.title}</h2>
					</div>
					{activeIndex === index && (
						<div className="item-content">
							<Form
								form={items.form}
								initialValues={item.content}
								onSave={(formData) => onSave(index, formData)}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default List;
