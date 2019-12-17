import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  /** Fonction de récupération de tous les utilisateurs */
  all() {
    return this.http
      .get(environment.apiURL + "users")
      .pipe(map(response => response["hydra:member"] as User[]));
  }

  /** Fonction de récupération d'un utilisateur par son ID */
  find(id: number) {
    return this.http.get<User>(environment.apiURL + `users/${id}`);
  }

  /** Fonction de création d'un utilisateur */
  create(user: User) {
    return this.http.post<User>(environment.apiURL + `users`, user);
  }

  /** Fonction de mise à jour d'un utilisateur */
  update(user: User) {
    return this.http.put<User>(environment.apiURL + `users/${user.id}`, user);
  }
}
