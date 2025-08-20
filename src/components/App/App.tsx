import './App.module.css';
import fetchMovies from '../../services/movieService.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie.ts';

function App() {
  const [movies, setMovie] = useState<Movie[]>([]);
  const [isLoading, setLoad] = useState(false);
  const [isError, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const modalOpener = (movieItem: Movie) => {
    setSelectedMovie(movieItem);
    openModal();
  };
  const handleSearch = async (searchedWord: string) => {
    try {
      setMovie([]);
      setLoad(true);
      setError(false);

      const newMovieList = await fetchMovies(searchedWord);
      console.log(newMovieList);
      setMovie(newMovieList);
      console.log(movies);
      if (newMovieList.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
    } catch {
      setError(true);
    } finally {
      setLoad(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={modalOpener} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster />
    </>
  );
}

export default App;
