import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { GenreComponent } from "../genre/genre.component";
import { DirectorComponent } from "../director/director.component";
import { MovieDetailsComponent } from "../movie-details/movie-details.component";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetch movies via API and set movies state to returned JSON file
   * @returns array holding movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Fetch user info via API and set favorites state to returned JSON file
   * @returns array holding IDs of favorites
   * @function getFavoriteMovies
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
    });
  }

  /**
   * Adds a movie to a user's favorites via an API call
   * @param {string} movieId
   * @function addToFavorite
   */

  addToFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Removes a movie from a user's favorites via an API call
   * @param {string} movieId
   * @function removeFromFavorite
   */

  removeFromFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Checks if a movie is included in a user's favorite movies
   * @param {string} movieId
   * @returns boolean
   * @function movieIsFavorite
   */

  movieIsFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.movieIsFavorite(movieId)) {
      this.removeFromFavorite(movieId);
    } else {
      this.addToFavorite(movieId);
    }
  }

  /**
   * Opens genre information from GenreComponent
   * @param {Movie} movie
   * @function openGenre
   */

  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      panelClass: "genre-dialog-background",
      width: "400px",
    });
  }

  /**
   * Opens director information from DirectorComponent
   * @param {Movie} movie
   * @function openDirector
   */

  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: { Name, Birth, Bio },
      panelClass: "director-dialog-background",
      width: "400px",
    });
  }

  /**
   * Opens movie details from MovieDetailsComponent
   * @param {Movie} movie
   * @function openMovieDetails
   */

  openMovieDetails(movie: any): void {
    const { Name, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Name, Description },
      panelClass: "synopsis-dialog-background",
      width: "400px",
    });
  }
}
