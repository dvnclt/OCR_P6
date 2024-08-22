import { bestMovie , topMovies , topActionMovies, topBiographyMovies, loadGenres } from "./script.js";
import { handleCategorySelection } from "./script.js";
import { scoreUrlPage1, scoreUrlPage2 } from "./config.js";
import { actionScoreUrlPage1, actionScoreUrlPage2 } from "./config.js";
import { biographyScoreUrlPage1, biographyScoreUrlPage2 } from "./config.js";
import { genreBaseUrl } from "./config.js";






bestMovie(scoreUrlPage1);
topMovies(scoreUrlPage1, scoreUrlPage2);
topActionMovies(actionScoreUrlPage1, actionScoreUrlPage2);
topBiographyMovies(biographyScoreUrlPage1, biographyScoreUrlPage2);
loadGenres(genreBaseUrl);

handleCategorySelection();