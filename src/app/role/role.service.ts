import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Role } from "../models/role";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(private http: HttpClient) {}

  /** Fonction de récupération de tous les roles */
  all() {
    return this.http
      .get(environment.apiURL + "roles")
      .pipe(map(response => response["hydra:member"] as Role[]));
  }
}
