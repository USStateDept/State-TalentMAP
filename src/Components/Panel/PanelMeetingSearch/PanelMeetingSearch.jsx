import PropTypes from 'prop-types';
import SelectForm from 'Components/SelectForm';
import { PANEL_MEETINGS_PAGE_SIZES, PANEL_MEETINGS_SORT } from 'Constants/Sort';
import ExportButton from 'Components/ExportButton';
import { useState } from 'react';
import { panelMeetingsExport } from 'actions/availableBidders'; // Replace with correct Action file later

const PanelMeetingSearch = ({ isCDO }) => {
  const text = isCDO ? 'yes CDO' : 'no AO';
  // const exportDisabled = true;
  const [exportIsLoading, setExportIsLoading] = useState(false);
  const [limit, setLimit] = useState(PANEL_MEETINGS_PAGE_SIZES.defaultSize);
  const [ordering, setOrdering] = useState(PANEL_MEETINGS_SORT.defaultSort);

  const pageSizes = PANEL_MEETINGS_PAGE_SIZES;
  const sorts = PANEL_MEETINGS_SORT;

  const getQuery = () => ({
    limit,
    ordering,
  });

  const exportPanelMeetings = () => {
    if (!exportIsLoading) {
      setExportIsLoading(true);
      panelMeetingsExport(getQuery())
        .then(() => {
          setExportIsLoading(false);
        })
        .catch(() => {
          setExportIsLoading(false);
        });
    }
  };

  return (
    <div>
      Panel Meeting Search Page
      <div>
        Headers/Filters TBD
        isCDO: {text}
      </div>
      <div className="panel-results-controls-right">
        <div className="panel-results-controls">
          <SelectForm
            className="panel-results-select"
            id="panel-search-results-sort"
            options={sorts.options}
            label="Sort by:"
            defaultSort={ordering}
            onSelectOption={value => setOrdering(value.target.value)}
            // disabled={isLoading}
          />
          <SelectForm
            className="panel-results-select"
            id="panel-search-num-results"
            options={pageSizes.options}
            label="Results:"
            defaultSort={limit}
            onSelectOption={value => setLimit(value.target.value)}
            // disabled={isLoading}
          />
          <div className="export-button-container">
            <ExportButton
              onClick={exportPanelMeetings}
              isLoading={exportIsLoading}
              // disabled={exportDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PanelMeetingSearch.propTypes = {
  isCDO: PropTypes.bool,
};

PanelMeetingSearch.defaultProps = {
  isCDO: false,
};

export default PanelMeetingSearch;
