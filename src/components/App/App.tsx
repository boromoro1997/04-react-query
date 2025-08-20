import css from './App.module.css';
import fetchMovies from '../../services/movieService.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie.ts';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

function App() {
  const [serchedMovie, setSearchedMovie] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setSelectedMovie(null);
    // setIsModalOpen(false);
  };

  const modalOpener = (movieItem: Movie) => {
    setSelectedMovie(movieItem);
    // openModal();
  };
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', serchedMovie, currentPage],
    queryFn: () => fetchMovies(serchedMovie, currentPage),
    enabled: serchedMovie !== '',
    placeholderData: keepPreviousData,
  });
  console.log(data);
  const handleSearch = (searchedMovie: string) => {
    setSearchedMovie(searchedMovie);
    setCurrentPage(1);
  };
  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data]);
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && data.results.length > 0 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {/* {data &&
        data.results.length === 0 &&
        toast.error('No movies found for your request.')} */}
      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={modalOpener} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster />
    </>
  );
}

export default App;
