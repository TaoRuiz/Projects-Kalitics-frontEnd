import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  /** Tableau contenant la liste des utilisateurs, initialement vide */
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    /** A l'initalisation de la page, récupération de la liste de tous les utilisateurs */
    this.userService.all().subscribe(users => (this.users = users));
  }
}
