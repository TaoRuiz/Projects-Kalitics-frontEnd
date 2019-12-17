import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: CrudModule.MODULE_LIST,
  exports: CrudModule.MODULE_LIST
})
export class CrudModule {
  static readonly MODULE_LIST = [CommonModule, ReactiveFormsModule];
}
