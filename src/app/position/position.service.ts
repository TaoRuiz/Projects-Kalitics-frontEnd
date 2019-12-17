import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Position } from "../models/position";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PositionService {
  constructor(private http: HttpClient) {}

  /** Fonction de récupération de toutes les positions (fonction dans l'entreprise) */
  all() {
    return this.http
      .get(environment.apiURL + "positions")
      .pipe(map(response => response["hydra:member"] as Position[]));
  }
}
