import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FetchPages } from "./fetch.pages.pipe";
import { PaginatorComponent } from "./paginator.component";

@NgModule({
  imports: [CommonModule],
  declarations: [PaginatorComponent, FetchPages],
  exports: [PaginatorComponent]
})
export class PaginatorModule {}
