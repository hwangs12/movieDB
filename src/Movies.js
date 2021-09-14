import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

//IF THERE IS NO IMAGE, USE THIS URL
const url =
	"https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
	const { loading, movies } = useGlobalContext();

	if (loading) {
		return <div className="loading"></div>;
	}
	return (
		<section className="movies">
			{movies.map((movie, _index) => {
				const { Title, Year, Poster, imdbID: id } = movie;
				return (
					<Link
						key={`${id}${_index}`}
						className="movie"
						to={`/movies/${id}`}
					>
						<img
							src={(Poster === "N/A" && url) || Poster}
							alt={Title}
						/>
						<div className="movie-info">
							<h4 className="title">{Title}</h4>
							<p>{Year}</p>
						</div>
					</Link>
				);
			})}
		</section>
	);
};

export default Movies;
