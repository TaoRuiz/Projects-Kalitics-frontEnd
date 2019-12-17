import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list/user-list.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserFormComponent } from "./user-form/user-form.component";
import { CrudModule } from "../crud/crud.module";

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [CommonModule, UserRoutingModule, CrudModule],
  exports: []
})
export class UserModule {}
