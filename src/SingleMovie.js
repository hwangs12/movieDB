import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { API_ENDPOINT } from "./context";

const photoUnavail =
	"https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
	const { id } = useParams();
	const { loading, message, data } = useFetch(API_ENDPOINT, "&i=", id);

	if (loading) {
		return <div className="loading"></div>;
	}

	if (message.show) {
		return (
			<div className="page-message">
				<h1>{message.msg}</h1>
				<Link to="/" className="btn">
					back to movies
				</Link>
			</div>
		);
	}
	const { Poster: poster, Title: title, Plot: plot, Year: year } = data;
	return (
		<section className="single-movie">
			<img
				src={(poster === "N/A" && photoUnavail) || poster}
				alt={title}
			/>
			<div className="single-movie-info">
				<h2>{title}</h2>
				<p>{plot}</p>
				<h4>{year}</h4>
				<Link to="/" className="btn">
					back to movies
				</Link>
			</div>
		</section>
	);
};

export default SingleMovie;
