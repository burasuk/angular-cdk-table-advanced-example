import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges
} from "@angular/core";
import {
  MatPaginator,
  MatPaginatorDefaultOptions,
  MatPaginatorIntl,
  MAT_PAGINATOR_DEFAULT_OPTIONS
} from "@angular/material/paginator";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"]
})
export class PaginatorComponent extends MatPaginator
  implements OnInit, DoCheck {
  pages: number[] = [];

  firstLastPage = 5;
  pageNeighbours = 1;

  constructor(
    intl: MatPaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
    defaults?: MatPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, defaults);
  }
  ngDoCheck(): void {
    console.log("Uruchamiam się zawsze :smile:");
  }

  ngOnInit(): void {
    this.page.pipe(tap(x => (this.pages = this.createPageArray()))).subscribe();
    this.emitPageEvent(0);
    console.log(this.pageSize);
  }

  setPage(page: number) {
    const previousPageIndex = this.pageIndex;
    this.pageIndex = page;
    this.emitPageEvent(previousPageIndex);
  }

  emitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: super.length
    });
  }

  changePageSize(selectedPageSize) {
    this.pageSize = selectedPageSize;
    this.setPage(0);
    this.emitPageEvent(0);
  }

  showFirstEllipsis(): boolean {
    return this.getCurrent() >= this.firstLastPage;
  }

  showLastEllipsis(): boolean {
    let numberOfpagesIsSmallerThanFistLastPages =
      this.getNumberOfPages() <= this.firstLastPage;
    return !(
      this.getCurrent() > this.getNumberOfPages() - this.firstLastPage ||
      numberOfpagesIsSmallerThanFistLastPages
    );
  }

  isFirstPage(): boolean {
    return this.getCurrent() === 1;
  }

  getCurrent(): number {
    return this.pageIndex;
  }

  private createPageArray(): number[] {
    let maxArray = this.firstLastPage - 1;
    if (this.getNumberOfPages() >= this.firstLastPage) {
    } else {
      maxArray = this.getNumberOfPages() - 1;
    }
    console.log("createPageArray", this.getNumberOfPages());
    if (this.getCurrent() < this.firstLastPage) {
      return Array.from(Array(maxArray), (x, index) => index + 1);
    } else if (
      this.getCurrent() >
      this.getNumberOfPages() - this.firstLastPage
    ) {
      return Array.from(
        Array(4),
        (x, index) => index + (this.getNumberOfPages() - this.firstLastPage)
      );
    } else {
      return [this.getCurrent() - 1, this.getCurrent(), this.getCurrent() + 1];
    }
  }
}
