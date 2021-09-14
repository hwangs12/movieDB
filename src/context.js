import React, { useState, useContext } from "react";
import useFetch from "./useFetch";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_DB_APIKEY}`;

const searchType = "&s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [title, setTitle] = useState("batman");
	const { data, loading, message } = useFetch(
		API_ENDPOINT,
		searchType,
		title
	);

	const handleChange = (e) => {
		setTitle(e.target.value);
	};

	return (
		<AppContext.Provider
			value={{ data, loading, title, message, handleChange }}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
