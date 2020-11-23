import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as from<%= classify(name) %> from '../reducers/<%= dasherize(name) %>.reducer';
import { LoadingState } from 'src/app/_shared/configs.model';

export const selectState = createFeatureSelector<from<%= classify(name) %>.State>(
  from<%= classify(name) %>.featureKey
);

export const selectAll = createSelector(
  selectState,
  from<%= classify(name) %>.selectAll
);

export const selectEntities = createSelector(
  selectState,
  from<%= classify(name) %>.selectEntities
);

export const selectIsLoaded = createSelector(
  selectState,
  (state) => state.callState === LoadingState.LOADED
);

export const selectIsLoading = createSelector(
  selectState,
  (state) => state.callState === LoadingState.LOADING
);

export const selectTotalElementsCount = createSelector(
  selectState,
  from<%= classify(name) %>.getTotalElementsCount
);

export const selectPageIndex = createSelector(
  selectState,
  from<%= classify(name) %>.getPageIndex
);

export const selectById = createSelector(
  selectEntities,
  (entities, { uuid }) => entities[uuid]
);
