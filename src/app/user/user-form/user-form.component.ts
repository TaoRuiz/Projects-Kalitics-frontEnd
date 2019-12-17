import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "src/app/models/user";
import { FormGroup, FormControl } from "@angular/forms";
import { RoleService } from "src/app/role/role.service";
import { PositionService } from "src/app/position/position.service";
import { Position } from "src/app/models/position";
import { Role } from "src/app/models/role";
import { skip } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent implements OnInit, OnDestroy {
  /**
   * Stockage des infos utilisateur en cas de MaJ
   */
  user: User = null;

  /**
   * Tableau de stockage de toutes les positions
   */
  positions: Position[] = [];

  /**
   * Tableau de stoackge de tous les rôles
   */
  roles: Role[] = [];

  /**
   * Tableau de la liste des avatars
   */
  avatars = [
    { value: "default.png", title: "Par défaut" },
    { value: "female_1.png", title: "Femme1" },
    { value: "female_2.png", title: "Femme2" },
    { value: "female_3.png", title: "Femme3" },
    { value: "female_4.png", title: "Femme4" },
    { value: "male_1.png", title: "Homme1" },
    { value: "male_2.png", title: "Homme2" },
    { value: "male_3.png", title: "Homme3" },
    { value: "male_4.png", title: "Homme4" }
  ];

  /**
   * Stoackage des souscriptions, à détruire au ngOnDestroy
   */
  subscriptions: Subscription[] = [];

  /**
   * Définition de la structure du formulaire
   */
  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    avatar: new FormControl("default.png"),
    position: new FormControl(),
    roles: new FormControl([])
  });

  constructor(
    private url: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private positionService: PositionService,
    private router: Router
  ) {}

  ngOnDestroy() {
    // Vidange de la liste des souscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    // Récupération de la liste des rôles depuis API
    this.subscriptions.push(
      this.roleService.all().subscribe(roles => (this.roles = roles))
    );

    // Récupération de la liste des positions depuis API
    this.subscriptions.push(
      this.positionService
        .all()
        .subscribe(positions => (this.positions = positions))
    );

    // On vérifie s'il y a un ID dans l'URL (modification d'un user)
    const id = this.url.snapshot.paramMap.get("id");

    // S'il y a un identifiant
    if (id) {
      // Récupération des données utilisateur
      this.subscriptions.push(
        this.userService.find(+id).subscribe(user => {
          this.user = user;

          // Mise à jour du formulaire
          this.form.patchValue({
            ...this.user,

            // Conversion entity position => id
            position: this.user.position.id,

            // Conversion entity role => id
            roles: this.user.roles.map(role => role.id)
          });
        })
      );
    }

    /**
     * Variable permettant de savoir si à l'initialisation de la position il
     * est nécessaire d'appliquer les rôles rattachés à la position ou non.
     *
     * Dans le cas d'une création, le premier choix de position modifie les rôles.
     *
     * Dans le cas d'une modification, le premier "choix" sera appliqué depuis les informations utilisateur
     * il ne faut donc pas qu'il "écrase" les rôles précedemment appliqués
     *
     */
    const mustSkip = id ? 1 : 0;

    // Au changement de Position, mise à jour des rôles
    this.subscriptions.push(
      this.form
        .get("position")
        .valueChanges.pipe(skip(mustSkip)) // Saut du premier changement de valeur de la position (initialisation du formulaire)
        .subscribe(posId => {
          // Récupération de la position nouvellement choisie
          const currentPos = this.positions.find(
            position => position.id === posId
          );

          // Mise à jour des rôles par rapport à la nouvelle position
          this.form
            .get("roles")
            .patchValue(currentPos.roles.map(role => role.id));
        })
    );
  }

  /**
   * A la soumission du formulaire
   */
  handleSubmit() {
    // Préparation des données à soumettre à l'API
    const resultat = {
      ...this.form.value,
      roles: this.form.value.roles.map(role => "/api/roles/" + role), // Conversion ID => IRI
      position: `/api/positions/${this.form.value.position}` // Conversion ID => IRI
    };

    // Si l'utilisateur est défini (il s'agit d'une modification)
    if (this.user) {
      resultat.id = this.user.id; // Ajout de l'ID utilisateur aux données formulaire

      // Soumission du formulaire
      this.subscriptions.push(
        this.userService.update(resultat as User).subscribe(confirm => {
          // Redirection vers la liste des utilisateurs
          this.router.navigateByUrl("/users/list");
        })
      );
    }

    // Si l'utilisateur n'est pas encore défini (il s'agit d'un ajout)
    if (!this.user) {
      this.subscriptions.push(
        this.userService.create(resultat as User).subscribe(createdUser => {
          // Redirection vers la page de l'utilisateur crée
          this.router.navigateByUrl(`/users/${createdUser.id}/edit`);
        })
      );
    }
  }
}
