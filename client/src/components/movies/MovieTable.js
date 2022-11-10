import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const MovieTable = () => {
    const [movies, setMovies] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const confirmDelete = async (id) => {
		const payload = {
			id: id.toString(),
		};
		await axios.post(
			'http://localhost:4000/admin/movies/delete',
			JSON.stringify(payload)
		);
		fetchMovies();
	};

	const fetchMovies = async () => {
		try {
			const result = await axios(`http://localhost:4000/movies`);
			if (result.data.movies !== null) {
				await setMovies(result.data.movies);
				setLoaded(true);
			} else {
				setErrorMessage('nothing data to load');
			}
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);
    
    return (
        <>
        {!loaded ? (
				(() => {
					if (errorMessage) {
						return (
							<div className='row'>
								<p>Oops... {errorMessage}</p>
							</div>
						);
					} else {
						return (
							<div className='row'>
								<p>Loading...</p>
							</div>
						);
					}
				})()
			) : (
				<>
				<div className='row'>
					<div className='col-12'>
						<Link to={`/admin/movies/create`} className='btn btn-success'>Add</Link>
					</div>
				</div>
				<div className='row mt-4'>
					<div className='col-12'>
						<table className='table table-striped table-bordered'>
							<thead>
								<tr>
									<th>No</th>
									<th>Name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{movies.map((movie, index) => (
									<tr key={index}>
										<td>{index+1}</td>
										<td><Link to={`/movies/${movie.id}`}>{movie.title}</Link></td>
										<td>
											<div class="dropdown">
												<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
													Action
												</button>
												<ul class="dropdown-menu">
													<li><Link to={`/admin/movies/${movie.id}/edit`} class="dropdown-item" href="#">Edit</Link></li>
													<li>
															<span
																className='dropdown-item'
																style={{ cursor: 'pointer' }}
																onClick={() => {
																	if (window.confirm('Are you sure?')) {
																		confirmDelete(movie.id);
																	}
																}}
															>
																Delete
															</span>
													</li>
												</ul>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				</>
			)}
        </>
    );
};

export default MovieTable