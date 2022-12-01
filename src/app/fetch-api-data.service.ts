import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

const apiUrl = "https://my-flix-nejla.herokuapp.com";
@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getUser(): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .post(
        `${apiUrl}/users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later");
  }
}
