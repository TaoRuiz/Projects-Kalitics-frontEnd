import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserFormComponent } from "./user-form/user-form.component";

const routes: Routes = [
  {
    path: "users/:id/edit",
    component: UserFormComponent
  },
  {
    path: "users/new",
    component: UserFormComponent
  },
  {
    path: "users/list",
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
