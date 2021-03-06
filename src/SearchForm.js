import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
	const { title, message, handleChange } = useGlobalContext();
	return (
		<form onSubmit={(e) => e.preventDefault()} className="search-form">
			<h2>search movies</h2>
			<input
				type="text"
				className="form-input"
				value={title}
				onChange={handleChange}
			/>
			<div className="error">{message.msg}</div>
		</form>
	);
};

export default SearchForm;
