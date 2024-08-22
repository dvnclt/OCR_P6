
// Base url
export const baseUrl = "http://localhost:8000/api/v1/titles/";

// Genre Base Url
export const genreBaseUrl = "http://localhost:8000/api/v1/genres/";

// Urls films triés par score IMDB
export const scoreUrlPage1 = `${baseUrl}?page=1&sort_by=-imdb_score`;
export const scoreUrlPage2 = `${baseUrl}?page=2&sort_by=-imdb_score`;

// Urls film genre = action + triés par score IMDB
export const actionScoreUrlPage1 = `${baseUrl}?genre=Action&page=1&sort_by=-imdb_score`;
export const actionScoreUrlPage2 = `${baseUrl}?genre=Action&page=2&sort_by=-imdb_score`;

// Urls film genre = biography + triés par score IMDB
export const biographyScoreUrlPage1 = `${baseUrl}?genre=Biography&page=1&sort_by=-imdb_score`;
export const biographyScoreUrlPage2 = `${baseUrl}?genre=Biography&page=2&sort_by=-imdb_score`;
