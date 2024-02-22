import {
  UPDATE_PROJECTED_VACANCY_ERROR,
  UPDATE_PROJECTED_VACANCY_ERROR_TITLE,
  UPDATE_PROJECTED_VACANCY_SUCCESS,
  UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { get } from 'lodash';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { convertQueryToString } from '../utilities';

let cancelPVList;
let cancelPVLangOffsetOptions;
let cancelPVFilters;
let cancelPVLangOffsets;
let cancelPVMetadata;

// ================ GET LIST ================

export function projectedVacancyFetchDataErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyFetchDataLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyFetchDataSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_SUCCESS',
    results,
  };
}
export function projectedVacancyFetchData(query = {}) {
  return (dispatch) => {
    if (cancelPVList) { cancelPVList('cancel'); }
    batch(() => {
      dispatch(projectedVacancyFetchDataLoading(true));
      dispatch(projectedVacancyFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/admin/projected_vacancies/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelPVList = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyFetchDataSuccess(data));
          dispatch(projectedVacancyFetchDataErrored(false));
          dispatch(projectedVacancyFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyFetchDataErrored(false));
            dispatch(projectedVacancyFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(projectedVacancyFetchDataErrored(true));
            dispatch(projectedVacancyFetchDataLoading(false));
          });
        }
      });
  };
}

// ================ EDIT FILTER SELECTIONS ================

export function projectedVacancySelectionsSaveSuccess(result) {
  return {
    type: 'PROJECTED_VACANCY_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function saveProjectedVacancySelections(queryObject) {
  return (dispatch) => dispatch(projectedVacancySelectionsSaveSuccess(queryObject));
}

// ================ GET FILTER DATA ================

export function projectedVacancyFiltersErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyFiltersLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyFiltersSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_SUCCESS',
    results,
  };
}
export function projectedVacancyFilters() {
  return (dispatch) => {
    if (cancelPVFilters) { cancelPVFilters('cancel'); }
    batch(() => {
      dispatch(projectedVacancyFiltersLoading(true));
      dispatch(projectedVacancyFiltersErrored(false));
    });
    api().get('/fsbid/admin/projected_vacancies/filters/', {
      cancelToken: new CancelToken((c) => { cancelPVFilters = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyFiltersSuccess(data));
          dispatch(projectedVacancyFiltersErrored(false));
          dispatch(projectedVacancyFiltersLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(projectedVacancyFiltersSuccess({}));
            dispatch(projectedVacancyFiltersErrored(true));
            dispatch(projectedVacancyFiltersLoading(false));
          });
        }
      });
  };
}

// ================ GET LANGUAGE OFFSET OPTIONS ================

export function projectedVacancyLangOffsetOptionsErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_LANG_OFFSET_OPTIONS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyLangOffsetOptionsLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_LANG_OFFSET_OPTIONS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyLangOffsetOptionsSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_LANG_OFFSET_OPTIONS_SUCCESS',
    results,
  };
}
export function projectedVacancyLangOffsetOptions() {
  return (dispatch) => {
    if (cancelPVLangOffsetOptions) { cancelPVLangOffsetOptions('cancel'); }
    batch(() => {
      dispatch(projectedVacancyLangOffsetOptionsLoading(true));
      dispatch(projectedVacancyLangOffsetOptionsErrored(false));
    });
    api().get('/fsbid/admin/projected_vacancies/language_offset_options/', {
      cancelToken: new CancelToken((c) => { cancelPVLangOffsetOptions = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyLangOffsetOptionsSuccess(data));
          dispatch(projectedVacancyLangOffsetOptionsErrored(false));
          dispatch(projectedVacancyLangOffsetOptionsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(projectedVacancyLangOffsetOptionsSuccess({}));
            dispatch(projectedVacancyLangOffsetOptionsErrored(true));
            dispatch(projectedVacancyLangOffsetOptionsLoading(false));
          });
        }
      });
  };
}

// ================ EDIT ================

export function projectedVacancyEditErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyEditLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyEditSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_SUCCESS',
    results,
  };
}
export function projectedVacancyEdit(query) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyEditLoading(true));
      dispatch(projectedVacancyEditErrored(false));
    });

    api().put('/fsbid/admin/projected_vacancies/edit/', query)
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyEditErrored(false));
          dispatch(projectedVacancyEditSuccess(data));
          dispatch(toastSuccess(
            UPDATE_PROJECTED_VACANCY_SUCCESS,
            UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE,
          ));
          dispatch(projectedVacancyEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyEditLoading(true));
            dispatch(projectedVacancyEditErrored(false));
          });
        } else {
          batch(() => {
            dispatch(projectedVacancyEditErrored(true));
            dispatch(toastError(
              UPDATE_PROJECTED_VACANCY_ERROR,
              UPDATE_PROJECTED_VACANCY_ERROR_TITLE,
            ));
            dispatch(projectedVacancyEditLoading(false));
          });
        }
      });
  };
}

// ================ EDIT LANGUAGE OFFSETS ================

export function projectedVacancyEditLangOffsetsErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_LANG_OFFSETS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyEditLangOffsetsLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_LANG_OFFSETS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyEditLangOffsetsSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_LANG_OFFSETS_SUCCESS',
    results,
  };
}
export function projectedVacancyEditLangOffsets(query) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyEditLangOffsetsLoading(true));
      dispatch(projectedVacancyEditLangOffsetsErrored(false));
    });

    api().put('/fsbid/admin/projected_vacancies/edit_language_offsets/', query)
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyEditLangOffsetsErrored(false));
          dispatch(projectedVacancyEditLangOffsetsSuccess(data));
          dispatch(toastSuccess(
            UPDATE_PROJECTED_VACANCY_SUCCESS,
            UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE,
          ));
          dispatch(projectedVacancyEditLangOffsetsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyEditLangOffsetsLoading(true));
            dispatch(projectedVacancyEditLangOffsetsErrored(false));
          });
        } else {
          batch(() => {
            dispatch(projectedVacancyEditLangOffsetsErrored(true));
            dispatch(toastError(
              UPDATE_PROJECTED_VACANCY_ERROR,
              UPDATE_PROJECTED_VACANCY_ERROR_TITLE,
            ));
            dispatch(projectedVacancyEditLangOffsetsLoading(false));
          });
        }
      });
  };
}

// ================ EDIT CAPSULE DESCRIPTION ================

export function projectedVacancyEditCapsuleDescErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_CAPSULE_DESC_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyEditCapsuleDescLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_CAPSULE_DESC_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyEditCapsuleDescSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_CAPSULE_DESC_SUCCESS',
    results,
  };
}
export function projectedVacancyEditCapsuleDesc(query) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyEditCapsuleDescLoading(true));
      dispatch(projectedVacancyEditCapsuleDescErrored(false));
    });

    api().put('/fsbid/admin/projected_vacancies/edit_capsule_description/', query)
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyEditCapsuleDescErrored(false));
          dispatch(projectedVacancyEditCapsuleDescSuccess(data));
          dispatch(toastSuccess(
            UPDATE_PROJECTED_VACANCY_SUCCESS,
            UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE,
          ));
          dispatch(projectedVacancyEditCapsuleDescLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyEditCapsuleDescLoading(true));
            dispatch(projectedVacancyEditCapsuleDescErrored(false));
          });
        } else {
          batch(() => {
            dispatch(projectedVacancyEditCapsuleDescErrored(true));
            dispatch(toastError(
              UPDATE_PROJECTED_VACANCY_ERROR,
              UPDATE_PROJECTED_VACANCY_ERROR_TITLE,
            ));
            dispatch(projectedVacancyEditCapsuleDescLoading(false));
          });
        }
      });
  };
}

// ================ GET METADATA ================

export function projectedVacancyMetadataErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_METADATA_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyMetadataLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_METADATA_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyMetadataSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_METADATA_SUCCESS',
    results,
  };
}
export function projectedVacancyMetadata() {
  return (dispatch) => {
    if (cancelPVMetadata) { cancelPVMetadata('cancel'); }
    batch(() => {
      dispatch(projectedVacancyMetadataLoading(true));
      dispatch(projectedVacancyMetadataErrored(false));
    });
    api().get('/fsbid/admin/projected_vacancies/metadata/', {
      cancelToken: new CancelToken((c) => { cancelPVMetadata = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyMetadataSuccess(data));
          dispatch(projectedVacancyMetadataErrored(false));
          dispatch(projectedVacancyMetadataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(projectedVacancyMetadataSuccess({}));
            dispatch(projectedVacancyMetadataErrored(true));
            dispatch(projectedVacancyMetadataLoading(false));
          });
        }
      });
  };
}

// ================ GET LANGUAGE OFFSET DATA ================

export function projectedVacancyLangOffsetsErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_LANG_OFFSETS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyLangOffsetsLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_LANG_OFFSETS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyLangOffsetsSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_LANG_OFFSETS_SUCCESS',
    results,
  };
}
export function projectedVacancyLangOffsets() {
  return (dispatch) => {
    if (cancelPVLangOffsets) { cancelPVLangOffsets('cancel'); }
    batch(() => {
      dispatch(projectedVacancyLangOffsetsLoading(true));
      dispatch(projectedVacancyLangOffsetsErrored(false));
    });
    api().get('/fsbid/admin/projected_vacancies/language_offsets/', {
      cancelToken: new CancelToken((c) => { cancelPVLangOffsets = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyLangOffsetsSuccess(data));
          dispatch(projectedVacancyLangOffsetsErrored(false));
          dispatch(projectedVacancyLangOffsetsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message !== 'cancel') {
          batch(() => {
            dispatch(projectedVacancyLangOffsetsSuccess({}));
            dispatch(projectedVacancyLangOffsetsErrored(true));
            dispatch(projectedVacancyLangOffsetsLoading(false));
          });
        }
      });
  };
}
