import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { skip, startWith, tap } from 'rxjs/operators';
import { selectQueryParam } from 'src/app/store';
import * as <%= classify(name) %>Actions from '../store/actions/<%=dasherize(name)%>.actions';
import * as <%= classify(name) %>Selectors from '../store/selectors/<%=dasherize(name)%>.selectors';

@Component({
  selector: 'app-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.scss'],
})
export class <%= classify(name) %>Component implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  destroy$ = new Subject<void>();
  <%=camelize(name)%>s$ = this.store.pipe(select(<%= classify(name) %>Selectors.selectAll));
  loading$ = this.store.pipe(select(<%= classify(name) %>Selectors.selectIsLoading));
  pageIndex$ = this.store.pipe(select(<%= classify(name) %>Selectors.selectPageIndex));
  totalCount$ = this.store.pipe(select(<%= classify(name) %>Selectors.selectTotalElementsCount));

  constructor(private store: Store) {}

  add() {
    this.store.dispatch(<%= classify(name) %>Actions.addDialog({}));
  }

  edit(uuid: string) {
    this.store.dispatch(<%= classify(name) %>Actions.editDialog({ uuid }));
  }

  remove(uuid: string) {
    this.store.dispatch(<%= classify(name) %>Actions.deleteDialog({ uuid }));
  }

  ngAfterViewInit() {
    const searchKeywordChange$ = this.store.pipe(
      select(selectQueryParam('searchKeyword')),
      tap(() => {
        this.paginator.firstPage();
      })
    );

    const paginatorChange$ = this.paginator.page.pipe(
      startWith(this.paginator)
    );

    combineLatest([paginatorChange$, searchKeywordChange$])
      .pipe(skip(1))
      .subscribe(([{ pageSize, pageIndex }, searchKeyword]) => {
        this.store.dispatch(<%= classify(name) %>Actions.setPageSize({ pageSize }));
        this.store.dispatch(
          <%= classify(name) %>Actions.load({
            pageSize,
            pageIndex,
            searchKeyword,
          })
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
