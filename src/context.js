import React, { useState, useContext, useEffect } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=9f9080a7&s=batman`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);

	const getMovies = async () => {
		setLoading(true);
		try {
			const response = await fetch(API_ENDPOINT);
			const data = await response.json();
			console.log(data["Search"]);
			setMovies(data["Search"]);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<AppContext.Provider value={{ movies, loading }}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
