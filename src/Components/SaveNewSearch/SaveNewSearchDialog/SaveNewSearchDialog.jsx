import { Component } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';
import { get, omit } from 'lodash';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import Form from '../../Form';
import FieldSet from '../../FieldSet/FieldSet';
import TextInput from '../../TextInput';
import { saveSearch, toggleViewSavedSearchDialog } from '../../../actions/savedSearch';
import { focusById } from '../../../utilities';
import { ID } from '../Trigger';

export const INPUT_ID = 'saved-search';

export class SaveNewSearchDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSearchName: '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // close after successful save
    if (this.props.isLoading && !nextProps.isLoading && !nextProps.hasErrored) {
      this.onCancel();
      this.changeNewSearchName('');
    }
  }

  onSubmit = e => {
    if (e && e.preventDefault) { e.preventDefault(); }
    const { currentSearch } = this.props;
    const hasPV = get(currentSearch, 'projectedVacancy') === 'projected';
    const hasTandem = get(currentSearch, 'tandem') === 'tandem';
    let endpoint = hasPV ? '/api/v1/fsbid/projected_vacancies/' : '/api/v1/fsbid/available_positions/';
    if (hasTandem) {
      endpoint = hasPV ? '/api/v1/fsbid/projected_vacancies/tandem/' : '/api/v1/fsbid/available_positions/tandem/';
    }
    let filters = omit(currentSearch, ['projectedVacancy']);

    // any filters we want to omit for PV. currently none.
    if (hasPV) { filters = omit(filters, []); }

    this.props.saveSearch({
      name: this.state.newSearchName,
      endpoint,
      filters,
    });
  };

  onCancel = () => {
    this.props.toggle(false);
    focusById(ID, 0);
  };

  changeNewSearchName = e => {
    this.setState({ newSearchName: e });
  };

  render() {
    const { isLoading, isOpen, hasErrored } = this.props;

    // Check the "type" prop.
    // Setting this as an if statement allows us to easily add conditions if needed
    let inputType;
    if (hasErrored) {
      inputType = 'error';
    }

    return (
      isOpen ?
        <div
          className={`usa-grid-full save-new-search-container ${isLoading ? 'results-loading' : ''}`}
          style={{ position: 'relative' }}
        >
          <button className="unstyled-button" onClick={this.onCancel} style={{ position: 'absolute', top: 5, right: 0 }}>
            <FA name="times" />
          </button>
          <Form className="usa-grid-full saved-search-form" onFormSubmit={this.onSubmit}>
            <FieldSet
              className="saved-search-fieldset usa-width-one-half"
              legend="Add a new saved search"
              legendSrOnly
            >
              <TextInput
                id={INPUT_ID}
                label="Saved Search Name"
                changeText={this.changeNewSearchName}
                type={inputType}
                value={this.state.newSearchName}
                labelMessage={hasErrored || ''}
              />
            </FieldSet>
            <div className="saved-search-form-buttons">
              <button
                type="button"
                className="saved-search-form-primary-button"
                onClick={this.onSubmit}
              >
              Save
              </button>
            </div>
          </Form>
        </div>
        :
        <div className="usa-grid-full" style={{ marginTop: '20px' }} />
    );
  }
}

SaveNewSearchDialog.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  hasErrored: PropTypes.node,
  isLoading: PropTypes.bool,
  saveSearch: PropTypes.func,
  currentSearch: PropTypes.shape({}),
};

SaveNewSearchDialog.defaultProps = {
  toggle: EMPTY_FUNCTION,
  isOpen: false,
  hasErrored: '',
  isLoading: false,
  saveSearch: EMPTY_FUNCTION,
  currentSearch: {},
};

const mapStateToProps = state => ({
  isOpen: state.viewSavedSearchDialog,
  isLoading: state.newSavedSearchIsSaving,
  hasErrored: state.newSavedSearchHasErrored,
  currentSearch: state.currentSearch,
});

export const mapDispatchToProps = dispatch => ({
  toggle: bool => dispatch(toggleViewSavedSearchDialog(bool)),
  saveSearch: object => dispatch(saveSearch(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveNewSearchDialog);
