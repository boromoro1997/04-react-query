import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie.ts';
interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(movie => {
        const { id, title, poster_path } = movie;
        return (
          <li
            key={id}
            onClick={() => onSelect(movie)}
            style={{ cursor: 'pointer' }}
          >
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                loading="lazy"
              />
              <h2 className={css.title}>{title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
