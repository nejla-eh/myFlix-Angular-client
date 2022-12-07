import { Component, OnInit } from "@angular/core";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Open the user registration dialog when signup button is clicked
   * @function openUserRegistrationDialog
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px",
    });
  }

  /**
   * Open the user login dialog when login button is clicked
   * @function openUserLoginDialog
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "280px",
    });
  }
}
