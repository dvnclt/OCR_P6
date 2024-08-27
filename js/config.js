
// Base url
export const baseURL = "http://localhost:8000/api/v1/titles/";

// Genre Base Url
export const genreBaseUrl = "http://localhost:8000/api/v1/genres/";

// Urls films triés par score IMDB
export const scoreUrlPage1 = `${baseURL}?page=1&sort_by=-imdb_score`;
export const scoreUrlPage2 = `${baseURL}?page=2&sort_by=-imdb_score`;

// Urls film genre = action + triés par score IMDB
export const actionScoreUrlPage1 = `${baseURL}?genre=Action&page=1&sort_by=-imdb_score`;
export const actionScoreUrlPage2 = `${baseURL}?genre=Action&page=2&sort_by=-imdb_score`;

// Urls film genre = biography + triés par score IMDB
export const biographyScoreUrlPage1 = `${baseURL}?genre=Biography&page=1&sort_by=-imdb_score`;
export const biographyScoreUrlPage2 = `${baseURL}?genre=Biography&page=2&sort_by=-imdb_score`;





export const topActionMoviesURL = `${baseURL}?genre=Action&page=1&sort_by=-imdb_score`;

export const topBiographyMoviesURL = `${baseURL}?genre=Biography&page=1&sort_by=-imdb_score`;
