import React, { useState, useContext, useEffect } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_DB_APIKEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [title, setTitle] = useState("batman");
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setTitle(e.target.value);
	};

	const getMovies = async (url) => {
		setLoading(true);
		try {
			const response = await fetch(`${url}`);
			const data = await response.json();
			if (data["Search"]) {
				setMessage("");
				setMovies(data["Search"]);
				setLoading(false);
			} else {
				setMessage(data["Error"]);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies(`${API_ENDPOINT}&s=${title}`);
	}, [title]);

	return (
		<AppContext.Provider
			value={{ movies, loading, title, message, handleChange }}
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
