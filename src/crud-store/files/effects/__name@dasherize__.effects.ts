import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  mapTo,
  skip,
  takeUntil,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { <%= classify(name) %>Service } from '../../_api/<%= dasherize(name) %>.service';
import { Store, select } from '@ngrx/store';
import { selectRouteNestedParam } from '..';
import { MatDialog } from '@angular/material/dialog';
import { <%= classify(name) %>UpsertDialogComponent } from 'src/app/<%= dasherize(name) %>/<%= dasherize(name) %>-upsert-dialog/<%= dasherize(name) %>-upsert-dialog.component';
import { ConfirmDialogComponent } from 'src/app/_shared/confirm-dialog/confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import * as <%= classify(name) %>Actions from '../actions/<%= dasherize(name) %>.actions';
import * as <%= classify(name) %>Selectors from '../selectors/<%= dasherize(name) %>.selectors';


@Injectable()
export class <%= classify(name) %>sEffects {
  constructor(
    private actions$: Actions,
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private store: Store,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.load),
      withLatestFrom(this.store.select(selectRouteNestedParam('companyUuid'))),
      switchMap(([payload, uuid]) => {
        const nextRequest$ = this.actions$.pipe(
          ofType(<%= classify(name) %>Actions.load),
          skip(1)
        );
        return this.<%= camelize(name) %>Service.get({ uuid, ...payload }).pipe(
          takeUntil(nextRequest$),
          map((payload) =>
            <%= classify(name) %>Actions.loadSuccess({
              payload,
            })
          ),
          catchError((error) => of(<%= classify(name) %>Actions.loadFailure(error)))
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.add),
      withLatestFrom(this.store.select(selectRouteNestedParam('companyUuid'))),
      switchMap(([{ payload }, uuid]) => {
        return this.<%= camelize(name) %>Service.create({ ...payload, uuid }).pipe(
          map((payload) =>
            <%= classify(name) %>Actions.addSuccess({
              payload,
            })
          ),
          catchError((error) => of(<%= classify(name) %>Actions.addFailure(error)))
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.update),
      switchMap(({ payload }) => {
        return this.<%= camelize(name) %>Service.update(payload).pipe(
          map(({ uuid, ...payload }) =>
            <%= classify(name) %>Actions.updateSuccess({
              payload: { id: uuid, changes: payload },
            })
          ),
          catchError((error) => of(<%= classify(name) %>Actions.updateFailure(error)))
        );
      })
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.loadById),
      switchMap(({ uuid }) => {
        return this.<%= camelize(name) %>Service.getById(uuid).pipe(
          map((payload) =>
            <%= classify(name) %>Actions.loadByIdSuccess({
              payload,
            })
          ),
          catchError((error) => of(<%= classify(name) %>Actions.loadByIdFailure(error)))
        );
      })
    )
  );

  loadByIdForDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.loadByIdForDialog),
      switchMap(({ uuid }) => {
        return this.<%= camelize(name) %>Service.getById(uuid).pipe(
          map((payload) =>
            <%= classify(name) %>Actions.loadByIdForDialogSuccess({
              payload,
            })
          ),
          catchError((error) =>
            of(<%= classify(name) %>Actions.loadByIdForDialogFailure(error))
          )
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.deleteItem),
      switchMap(({ uuid }) =>
        this.<%= camelize(name) %>Service.delete(uuid).pipe(
          mapTo(
            <%= classify(name) %>Actions.deleteItemSuccess({
              uuid,
            })
          ),
          catchError((error) => of(<%= classify(name) %>Actions.deleteItemFailure(error)))
        )
      )
    )
  );

  checkCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.deleteItemSuccess),
      withLatestFrom(this.store.pipe(select(<%= classify(name) %>Selectors.selectState))),
      mergeMap(([, state]) => {
        if (state.pageIndex && !state.ids.length) {
          return of(<%= classify(name) %>Actions.load({}));
        }
        return EMPTY;
      })
    )
  );

  addDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(<%= classify(name) %>Actions.addDialog),
        tap(({ initData }) =>
          this.dialog.open(<%= classify(name) %>UpsertDialogComponent, {
            width: '650px',
            data: {
              initData,
            },
          })
        )
      ),
    { dispatch: false }
  );

  editDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.editDialog),
      map(({ uuid }) => <%= classify(name) %>Actions.loadByIdForDialog({ uuid }))
    )
  );

  editSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(<%= classify(name) %>Actions.loadByIdForDialogSuccess),
        tap(({ payload }) =>
          this.dialog.open(<%= classify(name) %>UpsertDialogComponent, {
            width: '850px',
            data: { entity: payload },
          })
        )
      ),
    { dispatch: false }
  );

  upsertSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.addSuccess, <%= classify(name) %>Actions.updateSuccess),
      mapTo(<%= classify(name) %>Actions.closeDialog())
    )
  );

  deleteDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.deleteDialog),
      mergeMap(({ uuid }) => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '450px',
          data: {
            title: this.translate.instant('dialog.entity.delete', {
              type: this.translate.instant('text.<%= dasherize(name) %>'),
            }),
            body: this.translate.instant('dialog.entity.delete_confirm', {
              type: this.translate.instant('text.<%= dasherize(name) %>'),
            }),
          },
        });

        return dialogRef.afterClosed().pipe(
          map((confirm) => {
            if (confirm) {
              return <%= classify(name) %>Actions.deleteItem({ uuid });
            }
            return <%= classify(name) %>Actions.cancelDialog();
          })
        );
      })
    )
  );

  closeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(<%= classify(name) %>Actions.closeDialog),
        tap(() => this.dialog.closeAll())
      ),
    { dispatch: false }
  );
}
