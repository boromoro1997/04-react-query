import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
interface SearchBarProps {
  onSubmit: (newMovie: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const movie = formData.get('query') as string;
    if (movie === '') {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(movie);
    console.log(movie);
  };
  return (
    <header className={styles.header}>
      {' '}
      <div className={styles.container}>
        {' '}
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB{' '}
        </a>{' '}
        <form className={styles.form} action={handleSubmit}>
          {' '}
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />{' '}
          <button className={styles.button} type="submit">
            Search{' '}
          </button>{' '}
        </form>{' '}
        <Toaster
          toastOptions={{
            style: {
              background: '#ec2626ff',
              color: '#fff',
            },
            error: {
              iconTheme: {
                primary: 'white',
                secondary: 'black',
              },
            },
          }}
        />
      </div>
    </header>
  );
}
