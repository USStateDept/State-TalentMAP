import { useRef, useState } from 'react';
import { get, includes, orderBy, uniqBy } from 'lodash';
import { useDataLoader } from 'hooks';
import Spinner from 'Components/Spinner';
import NavTabs from 'Components/NavTabs';
import Alert from 'Components/Alert';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import api from '../../../api';

export const RG = 'RG';
export const TST1 = 'TST1';
export const TST2 = 'TST2';

const PanelAdmin = () => {
  const navTabRef = useRef();
  const tabs = [
    { text: 'Remarks Glossary', value: RG },
    { text: 'Test Tab 1', value: TST1 },
    { text: 'Test Tab 2', value: TST2 },
  ];

  const [selectedNav, setSelectedNav] = useState(get(tabs, '[0].value') || '');

  const { data: remarks, error: rmrkDataError, loading: rmrkDataLoading } = useDataLoader(api().get, '/fsbid/agenda/remarks/');
  const { data: rmrkCategories, error: rmrkCatError, loading: rmrkCatLoading } = useDataLoader(api().get, '/fsbid/agenda/remark-categories/');

  const remarks$ = remarks?.data?.results ?? [];
  const rmrkCategories$ = rmrkCategories?.data?.results ?? [];

  let rmrkCategoriesOrdered = uniqBy(rmrkCategories$, 'code').map(({ code, desc_text }) => ({ code, desc_text }));
  rmrkCategoriesOrdered = orderBy(rmrkCategoriesOrdered, 'desc_text');

  const groupLoading = includes([rmrkDataLoading, rmrkCatLoading], true);

  const loadingSpinner = (<Spinner type="homepage-position-results" size="small" />);
  const errorAlert = (<Alert type="error" title="Error loading data" messages={[{ body: 'This data may not be available.' }]} />);

  function getNavData(navType) {
    switch (navType) {
      case RG:
        if (rmrkDataError || rmrkCatError) {
          return errorAlert;
        }
        return (
          <table>
            <tr>
              <th>Remark Category</th>
              <th>Description</th>
              <th>Active</th>
            </tr>
            {rmrkCategoriesOrdered.map(category => {
              const remarksInCategory = orderBy(remarks$.filter(f => f.rc_code === category.code), 'order_num');
              return (
                remarksInCategory.map(r => (
                  <tr>
                    <td>{category.desc_text}</td>
                    <td>{r.text}</td>
                    <td>{r.active_ind}</td>
                  </tr>
                ))
              );
            })}
          </table>
        );

      case TST1:
        return (
          <div>TST1</div>
        );

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
        {
          groupLoading &&
            loadingSpinner
        }
        {
          !groupLoading &&
          getNavData(selectedNav)}
      </div>
    </div>
  );
};

export default PanelAdmin;
