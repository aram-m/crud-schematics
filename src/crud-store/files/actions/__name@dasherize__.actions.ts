import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { <%= classify(name) %> } from '../models/<%= dasherize(name) %>.model';
import { Configs } from 'src/app/_shared/configs.model';

export const setPageSize = createAction(
  '[<%= classify(name) %>/API] Set Page Size',
  props<{ pageSize: number }>()
);

export const closeDialog = createAction('[<%= classify(name) %>/API] Close <%= classify(name) %> Dialog');

export const cancelDialog = createAction('[<%= classify(name) %>/API] Cancel <%= classify(name) %> Dialog');

export const deleteDialog = createAction(
  '[<%= classify(name) %>/API] Delete <%= classify(name) %> Dialog',
  props<{ uuid: string }>()
);

export const addDialog = createAction(
  '[<%= classify(name) %>/API] Add <%= classify(name) %> Dialog',
  props<{ initData?: any }>()
);

export const editDialog = createAction(
  '[<%= classify(name) %>/API] Edit <%= classify(name) %> Dialog',
  props<{ uuid: string }>()
);

export const loadById = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %> By Id',
  props<{ uuid: string }>()
);

export const loadByIdSuccess = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %> By Id Success',
  props<{ payload: <%= classify(name) %>.Model }>()
);

export const loadByIdFailure = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %> By Id Failure',
  props<{ errorMsg: any }>()
);

export const loadByIdForDialog = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %> By Id For Dialog',
  props<{ uuid: string }>()
);

export const loadByIdForDialogSuccess = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %> By Id For Dialog Success',
  props<{ payload: <%= classify(name) %>.Model }>()
);

export const loadByIdForDialogFailure = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %> By Id For Dialog Failure',
  props<{ errorMsg: any }>()
);

export const load = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %>s',
  props<Configs.GetQueryParams>()
);

export const loadSuccess = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %>s Success',
  props<{ payload: Configs.PaginationModel<<%= classify(name) %>.Model> }>()
);

export const loadFailure = createAction(
  '[<%= classify(name) %>/API] Load <%= classify(name) %>s Failure',
  props<{ error: any }>()
);

export const add = createAction(
  '[<%= classify(name) %>/API] Add <%= classify(name) %>',
  props<{ payload: <%= classify(name) %>.Model }>()
);

export const addSuccess = createAction(
  '[<%= classify(name) %>/API] Add <%= classify(name) %> Success',
  props<{ payload: <%= classify(name) %>.Model }>()
);

export const addFailure = createAction(
  '[<%= classify(name) %>/API] Add <%= classify(name) %> Failure',
  props<{ error: any }>()
);

export const update = createAction(
  '[<%= classify(name) %>/API] Update <%= classify(name) %>s',
  props<{ payload: <%= classify(name) %>.Model }>()
);

export const updateSuccess = createAction(
  '[<%= classify(name) %>/API] Update <%= classify(name) %> Success',
  props<{ payload: Update<<%= classify(name) %>.Model> }>()
);

export const updateFailure = createAction(
  '[<%= classify(name) %>/API] Update <%= classify(name) %> Failure',
  props<{ error: any }>()
);

export const deleteItem = createAction(
  '[<%= classify(name) %>/API] Delete <%= classify(name) %>',
  props<{ uuid: string }>()
);

export const deleteItemSuccess = createAction(
  '[<%= classify(name) %>/API] Delete <%= classify(name) %> Success',
  props<{ uuid: string }>()
);

export const deleteItemFailure = createAction(
  '[<%= classify(name) %>/API] Delete <%= classify(name) %> Failure',
  props<{ error: any }>()
);

