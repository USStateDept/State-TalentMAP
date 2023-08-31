export function positionClassificationsHasErrored(state = false, action) {
    switch (action.type) {
        case 'POSITION_CLASSIFICATIONS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function positionClassificationsIsLoading(state = false, action) {
    switch (action.type) {
        case 'POSITION_CLASSIFICATIONS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function positionClassifications(state = [], action) {
    switch (action.type) {
        case 'POSITION_CLASSIFICATIONS_FETCH_DATA_SUCCESS':
            return action.classifications;
        default:
            return state;
    }
}
