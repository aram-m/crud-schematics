import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { take, filter, switchMapTo } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as <%= classify(name) %>Actions from '../store/actions/<%=dasherize(name)%>.actions';
import { selectIsLoaded } from '../store/selectors/<%=dasherize(name)%>.selectors';
import { PermissionsService } from '../_api/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class  <%= classify(name) %>sGuard implements CanActivate {
  constructor(private store: Store, private permissions: PermissionsService) {}

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    this.store.dispatch(
      <%= classify(name) %>Actions.load({
        ...route.queryParams,
      })
    );
    return this.waitForDataToLoad().pipe(
      switchMapTo(this.permissions.accessGuard('<%=dasherize(name)%>'))
    );
  }
}