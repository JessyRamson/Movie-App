import axios from "axios";
import { apiKey } from "../constants";

// endpoints

const baseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
const movieDetails = (id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCredits = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovies = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMovies = (id) => `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const personDetails = (id) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMovies = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://forums.tumult.com/uploads/db2156/optimized/3X/6/3/63ac645bde3ebe63fd9a24aa9d90af88b30e995f_2_388x690.jpeg";
export const fallbackPersonPoster =
  "https://t4.ftcdn.net/jpg/01/26/61/13/360_F_126611337_m8kcRtS5G7AhrFpOQ0Wufx4PgL6J4yxg.jpg";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
