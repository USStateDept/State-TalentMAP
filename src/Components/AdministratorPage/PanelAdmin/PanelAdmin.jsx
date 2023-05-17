import { useRef, useState } from 'react';
import { get, orderBy, uniqBy } from 'lodash';
import { useDataLoader } from 'hooks';
import swal from '@sweetalert/with-react';
import Spinner from 'Components/Spinner';
import NavTabs from 'Components/NavTabs';
import Alert from 'Components/Alert';
import EditRemark from '../EditRemark';
import PanelMeetingAdmin from './PanelMeetingAdmin';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import api from '../../../api';

export const RG = 'RG';
export const PM = 'PM';
export const TST2 = 'TST2';

const PanelAdmin = () => {
  const navTabRef = useRef();
  const tabs = [
    { text: 'Panel Meetings', value: PM },
    { text: 'Remarks Glossary', value: RG },
    { text: 'Test Tab 2', value: TST2 },
  ];

  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');

  const { data: remarks, error: rmrkDataError, loading: rmrkDataLoading } = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const { data: rmrkCategories, error: rmrkCatError, loading: rmrkCatLoading } = useDataLoader(api().get, '/fsbid/agenda/remark-categories/');

  const remarks$ = remarks?.data?.results || [];
  const rmrkCategories$ = rmrkCategories?.data?.results || [];

  let rmrkCategoriesOrdered = uniqBy(rmrkCategories$, 'code').map(({ code, desc_text }) => ({ code, desc_text }));
  rmrkCategoriesOrdered = orderBy(rmrkCategoriesOrdered, 'desc_text');

  const groupLoading = rmrkDataLoading || rmrkCatLoading;

  const loadingSpinner = (<Spinner type="panel-admin-remarks" size="small" />);
  const errorAlert = (<Alert type="error" title="Error loading data" messages={[{ body: 'This data may not be available.' }]} />);


  const createRemarkModal = () => {
    swal({
      title: 'Create New Remark',
      button: false,
      closeOnEsc: true,
      content: (
        <EditRemark
          rmrkCategories={rmrkCategoriesOrdered}
        />
      ),
    });
  };

  const remarksTable = (
    <div>
      <table>
        <tr>
          <th>Remark Category</th>
          <th>Description</th>
          <th>Active</th>
        </tr>
        <tr>
          <td className="create-remark-button" colSpan="3">
            <button onClick={createRemarkModal}>Create New Remark</button>
          </td>
        </tr>
        {rmrkCategoriesOrdered.map(category => {
          const remarksInCategory = orderBy(remarks$.filter(f => f.rc_code === category.code), 'order_num');
          return (
            remarksInCategory.map(r => (
              <tr>
                <td>{category.desc_text}</td>
                <td>{r.text}</td>
                <td className="active-column">{r.active_ind}</td>
              </tr>
            ))
          );
        })}
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
        return <PanelMeetingAdmin />;

      case TST2:
        return (
          <div>TST2</div>
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

export default PanelAdmin;
