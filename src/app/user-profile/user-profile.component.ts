import { Component, Input, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  @Input() updatedUser = {
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetch user data via API
   * @returns object with user information
   * @function getUserInfo
   */

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
    });
  }

  /**
   * Update user data, such as username, password, email, or birthday
   * @function updateUserInfo
   */

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open("User profile successfully updated", "OK", {
        duration: 2000,
      });
      if (this.user.Username !== result.Username) {
        localStorage.clear();
        this.router.navigate(["welcome"]);
        this.snackBar.open(
          "User profile successfully updated. Please login using your new credentials",
          "OK",
          {
            duration: 2000,
          }
        );
      }
    });
  }

  /**
   * Delete user data for the user that is logged in
   * @function deleteAccount
   */

  deleteAccount(): void {
    if (confirm("All your data will be lost - this cannnot be undone!")) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open(
          "You have successfully deleted your account - we are sorry to see you go!",
          "OK",
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
