import axios from "axios";
import type { Movie } from "../types/movie.ts"
interface SearchResponse {
  results: Movie[];
  total_pages: number;
}
const url ='https://api.themoviedb.org/3/search/movie?query=';
const myKey = import.meta.env.VITE_TMDB_TOKEN;
export default async function fetchMovies(query:string, page:number):Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(url, 
{ 
    params: {
        include_adult: false,
        language: "en-US",
        page,
        query
  },
    headers: {
    Authorization: `Bearer ${myKey}`,
  }
    })
  return response.data;
}