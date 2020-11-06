
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { <%= classify(name) %> } from '../store/models/<%=dasherize(name)%>.model';
import { Configs } from '../_shared/configs.model';

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>Service {
  constructor(private httpClient: HttpClient) {}
  private readonly baseUrl: string = `${environment.trigon.mainUrl}/<%= url %>`;

  getById(uuid): Observable<<%= classify(name) %>.Model> {
    return this.httpClient.get<<%= classify(name) %>.Model>(`${this.baseUrl}/${uuid}`);
  }

  get({ uuid, pageIndex = 0, pageSize = 10, searchKeyword = null }) {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    if (searchKeyword) {
      params = params.set('searchKeyword', searchKeyword);
    }
    return this.httpClient.get<Configs.PaginationModel<<%= classify(name) %>.Model>>(
      `${this.baseUrl}/company/${uuid}`,
      {
        params,
      }
    );
  }

  create({ uuid, ...body }) {
    return this.httpClient.post<<%= classify(name) %>.Model>(
      `${this.baseUrl}/company/${uuid}`,
      body
    );
  }

  update({ uuid, ...body }) {
    return this.httpClient.put<<%= classify(name) %>.Model>(`${this.baseUrl}/${uuid}`, body);
  }

  delete(uuid) {
    return this.httpClient.delete(`${this.baseUrl}/${uuid}`);
  }

  activate(uuid) {
    return this.httpClient.post(`${this.baseUrl}/${uuid}/activate`, null);
  }

  deactivate(uuid) {
    return this.httpClient.post(`${this.baseUrl}/${uuid}/deactivate`, null);
  }

  checkExistance({ uuid, field, value, entityUUID }): Observable<boolean> {
    let params = new HttpParams()
      .set('field', Configs.Fields[field])
      .set('value', value.toString());

    if (entityUUID) {
      params = params.set('entityUUID', entityUUID);
    }
    return this.httpClient.get<boolean>(
      `${this.baseUrl}/company/${uuid}/isunique`,
      {
        params,
      }
    );
  }
}
