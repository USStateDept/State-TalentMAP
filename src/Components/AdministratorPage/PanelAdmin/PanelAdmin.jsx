import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { get, orderBy, uniqBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import InteractiveElement from 'Components/InteractiveElement';
import Spinner from 'Components/Spinner';
import NavTabs from 'Components/NavTabs';
import Alert from 'Components/Alert';
import { panelMeetingsFetchData } from 'actions/panelMeetings';
import { fetchRemarkCategories, fetchRemarks } from 'actions/remark';
import { checkFlag } from 'flags';
import EditRemark from '../EditRemark';
import PanelMeetingAdmin from './PanelMeetingAdmin';
import PostPanelProcessing from './PostPanelProcessing';
import ProfileSectionTitle from '../../ProfileSectionTitle';

export const RG = 'RG';
export const PM = 'PM';
export const PPP = 'PPP';

const PanelAdmin = (props) => {
  const usePanelAdminRemarks = () => checkFlag('flags.panel_admin_remarks');
  const usePanelAdminPanelMeeting = () => checkFlag('flags.panel_admin_panel_meeting');
  const usePaneAdminPostPanel = () => checkFlag('flags.panel_admin_post_panel');

  const editEnabled = false;

  const dispatch = useDispatch();

  const pmSeqNum = props.match?.params?.pmSeqNum ?? false;
  const panelMeetingsResults = useSelector(state => state.panelMeetings);
  const panelMeetingsResults$ = panelMeetingsResults?.results?.[0] ?? {};
  const panelMeetingsIsLoading = useSelector(state => state.panelMeetingsFetchDataLoading);
  const enablePostPanelProcessing = pmSeqNum && panelMeetingsResults$.panelMeetingDates?.find(x => x.mdt_code === 'OFFA');

  useEffect(() => {
    dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
    dispatch(fetchRemarks());
    dispatch(fetchRemarkCategories());
  }, []);

  const saveAdminRemarkHasErrored = useSelector(state => state.saveAdminRemarkHasErrored);
  const saveAdminRemarkIsLoading = useSelector(state => state.saveAdminRemarkIsLoading);
  const saveAdminRemarkSuccess = useSelector(state => state.saveAdminRemarkSuccess);

  const navTabRef = useRef();

  const tabs = [];

  if (usePanelAdminPanelMeeting()) {
    tabs.push({ text: 'Panel Meetings', value: PM });
  }
  if (usePaneAdminPostPanel()) {
    tabs.push({ text: 'Post Panel Processing', value: PPP, disabled: !enablePostPanelProcessing });
  }
  if (usePanelAdminRemarks()) {
    tabs.push({ text: 'Maintain Remarks', value: RG });
  }

  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');

  useEffect(() => {
    if (saveAdminRemarkSuccess) {
      dispatch(fetchRemarks());
      dispatch(fetchRemarkCategories());
    }
  }, [saveAdminRemarkSuccess]);

  const rmrkDataError = useSelector(state => state.fetchRemarksHasErrored);
  const rmrkDataLoading = useSelector(state => state.fetchRemarksIsLoading);
  const remarks = useSelector(state => state.fetchRemarksSuccess);

  const rmrkCatError = useSelector(state => state.fetchRemarkCategoriesHasErrored);
  const rmrkCatLoading = useSelector(state => state.fetchRemarkCategoriesIsLoading);
  const rmrkCategories = useSelector(state => state.fetchRemarkCategoriesSuccess);


  const remarks$ = remarks?.results || [];
  const rmrkCategories$ = rmrkCategories?.results || [];

  let rmrkCategoriesOrdered = uniqBy(rmrkCategories$, 'code').map(({ code, desc_text }) => ({ code, desc_text }));
  rmrkCategoriesOrdered = orderBy(rmrkCategoriesOrdered, 'desc_text');

  const groupLoading = rmrkDataLoading || rmrkCatLoading;

  const loadingSpinner = (<Spinner type="panel-admin-remarks" size="small" />);
  const errorAlert = (<Alert type="error" title="Error loading data" messages={[{ body: 'This data may not be available.' }]} />);


  const showRemarkModal = (edit, category, remark) => {
    swal({
      title: edit ? 'Edit Remark' : 'Create New Remark',
      button: false,
      closeOnEsc: true,
      content: (
        <EditRemark
          rmrkCategories={rmrkCategoriesOrdered}
          dispatch={dispatch}
          saveAdminRemarkHasErrored={saveAdminRemarkHasErrored}
          saveAdminRemarkIsLoading={saveAdminRemarkIsLoading}
          saveAdminRemarkSuccess={saveAdminRemarkSuccess}
          category={category}
          remark={remark}
          isEdit={edit}
        />
      ),
    });
  };

  const remarksTable = (
    <div>
      <table>
        <thead>
          <tr>
            <th>Remark Category</th>
            <th>Description</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="create-remark-button" colSpan="3">
              <button onClick={() => showRemarkModal(false)}>Create New Remark</button>
            </td>
          </tr>
          {rmrkCategoriesOrdered.map(category => {
            const remarksInCategory = orderBy(remarks$.filter(f => f.rc_code === category.code), 'order_num');
            return (
              remarksInCategory.map(r => (
                <tr key={r.seq_num}>
                  <td>{category.desc_text}</td>
                  <td>
                    {
                      editEnabled &&
                      <InteractiveElement title="Edit this Remark" type="span" onClick={() => showRemarkModal(true, category, r)}>
                        <FA name="pencil" />
                      </InteractiveElement>
                    }
                    {r.text}
                  </td>
                  <td className="active-column">{r.active_ind}</td>
                </tr>
              ))
            );
          })}
        </tbody>
      </table>
    </div>
  );

  function getNavData(navType) {
    switch (navType) {
      case RG:
        if (rmrkDataError || rmrkCatError) {
          return errorAlert;
        }
        return remarksTable;

      case PM:
        return (
          <PanelMeetingAdmin
            pmSeqNum={pmSeqNum}
            panelMeetingsResults={panelMeetingsResults}
            panelMeetingsIsLoading={panelMeetingsIsLoading}
          />
        );

      case PPP:
        return (
          <PostPanelProcessing
            pmSeqNum={pmSeqNum}
            panelMeetingsResults={panelMeetingsResults}
            panelMeetingsIsLoading={panelMeetingsIsLoading}
          />
        );

      default:
        return errorAlert;
    }
  }

  return (
    <div className="panel-admin-tabs-container">
      <ProfileSectionTitle title="Panel Administration" icon="calendar" />
      <NavTabs
        passNavValue={setSelectedNav}
        tabs={tabs}
        value={selectedNav}
        ref={navTabRef}
      />
      <div className="panel-admin-content">
        {groupLoading ? loadingSpinner : getNavData(selectedNav)}
      </div>
    </div>
  );
};

PanelAdmin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pmSeqNum: PropTypes.string,
    }),
  }),
};

PanelAdmin.defaultProps = {
  match: {},
};

export default withRouter(PanelAdmin);
