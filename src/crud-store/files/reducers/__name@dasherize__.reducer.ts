import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { <%= classify(name) %> } from '../models/<%= dasherize(name) %>.model';
import * as <%= classify(name) %>Actions from '../actions/<%= dasherize(name) %>.actions';
import { Configs, LoadingState } from 'src/app/_shared/configs.model';

export const featureKey = '<%= camelize(name) %>s';

export interface State extends EntityState<<%= classify(name) %>.Model> {
  // additional entities state properties
  callState: Configs.CallState;
  pageIndex: number | null;
  pageSize: number | null;
  totalPages: number | null;
  totalElementsCount: number | null;
}

export const adapter: EntityAdapter<<%= classify(name) %>.Model> = createEntityAdapter<<%= classify(name) %>.Model>(
  {
    selectId: (<%= camelize(name) %>) => <%= camelize(name) %>.uuid,
  }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  callState: LoadingState.INIT,
  pageIndex: null,
  pageSize: 10,
  totalPages: null,
  totalElementsCount: null,
});

export const reducer = createReducer(
  initialState,
  on(<%= classify(name) %>Actions.setPageSize, (state, { pageSize }) => ({
    ...state,
    pageSize,
  })),
  on(<%= classify(name) %>Actions.addSuccess, (state, { payload }) => {
    if (state.ids.length < state.pageSize) {
      return adapter.addOne(payload, {
        ...state,
        totalElementsCount: state.totalElementsCount + 1,
      });
    }
    return { ...state, totalElementsCount: state.totalElementsCount + 1 };
  }),
  on(<%= classify(name) %>Actions.updateSuccess, (state, { payload }) =>
    adapter.updateOne(payload, state)
  ),
  on(<%= classify(name) %>Actions.loadByIdSuccess, (state, { payload }) =>
    adapter.upsertOne(payload, state)
  ),
  on(<%= classify(name) %>Actions.load, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    <%= classify(name) %>Actions.loadSuccess,
    (state, { payload: { data, pageIndex, totalElementsCount, totalPages } }) =>
      adapter.setAll(data, {
        ...state,
        pageIndex,
        totalPages,
        totalElementsCount,
        callState: LoadingState.LOADED,
      })
  ),
  on(<%= classify(name) %>Actions.deleteItemSuccess, (state, { uuid }) =>
    adapter.removeOne(uuid, {
      ...state,
      totalElementsCount: state.totalElementsCount - 1,
    })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getTotalElementsCount = (state: State) => state.totalElementsCount;
export const getPageIndex = (state: State) => state.pageIndex;
