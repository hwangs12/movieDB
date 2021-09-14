import { useState, useEffect } from "react";

const useFetch = (endpoint, type, title) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [message, setMessage] = useState({ show: false, msg: "" });

	useEffect(() => {
		const getData = async (searchTerm) => {
			const url = `${endpoint}${type}${searchTerm}`;
			setLoading(true);
			try {
				const response = await fetch(`${url}`);
				const data = await response.json();
				if (data.Response === "False") {
					setMessage({ show: true, msg: data["Error"] });
				} else {
					setMessage({ show: false, msg: "" });
					setData(data["Search"] || data);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getData(title);
	}, [endpoint, type, title]);

	return { loading, data, message };
};

export default useFetch;
