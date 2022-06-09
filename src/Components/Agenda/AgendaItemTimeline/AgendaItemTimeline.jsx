import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemTimeline = ({ unitedLoading, setParentState }) => {
  const FAKE_LEGS = [
    {
      id: 11158,
      pos_title: 'SPECIAL AGENT',
      pos_num: '57159000',
      org: 'FSI',
      eta: '2029-12-05T00:00:00.000Z',
      ted: '2023-05-01T00:00:00',
      tod: '2 YRS/HLRT/2 YRS',
      grade: 'OM',
    },
    {
      id: 41387,
      pos_title: 'REGIONAL SECURITY OFFICER',
      pos_num: '57019000',
      org: 'A',
      eta: '2019-05-05T00:00:00.000Z',
      ted: '2020-07-05T00:00:00.000Z',
      tod: '1 YEAR',
      grade: '00',
      action: 'Extend',
      travel: null,
    },
    {
      id: 41387,
      pos_title: 'OMS (DCM)',
      pos_num: '00180000',
      org: 'INR',
      eta: '2020-08-05T00:00:00.000Z',
      ted: '2024-04-05T00:00:00.000Z',
      tod: '2 YRS (2 R & R)',
      grade: 'MC',
      action: 'Reappoint',
      travel: null,
    },
    {
      id: 41387,
      pos_title: 'SPECIAL AGENT',
      pos_num: 'S8828901',
      org: 'S/CPR',
      eta: '2024-05-05T00:00:00.000Z',
      ted: '2026-03-05T00:00:00.000Z',
      tod: 'OTHER',
      grade: '07',
      action: 'Curtail',
      travel: null,
    },
    {
      id: 41387,
      pos_title: 'SPECIAL AGENT',
      pos_num: '57159000',
      org: 'FSI',
      eta: '2026-04-05T00:00:00.000Z',
      ted: '2029-11-05T00:00:00.000Z',
      tod: '18 MOS',
      grade: 'OM',
      action: 'Correction',
      travel: null,
    },
    {
      id: 41387,
      pos_title: 'SPECIAL AGENT',
      pos_num: '57159000',
      org: 'FSI',
      eta: '2029-12-05T00:00:00.000Z',
      ted: '2030-11-05T00:00:00.000Z',
      tod: '2 YRS/HLRT/2 YRS',
      grade: 'OM',
      action: 'Reassign',
      travel: null,
    },
    {
      id: 41388,
      pos_title: 'ECONOMIC OFFICER',
      pos_num: '57159001',
      org: 'WHA',
      eta: '2030-12-05T00:00:00.000Z',
      ted: '2031-11-05T00:00:00.000Z',
      tod: '2 YRS/HLRT/2 YRS',
      grade: 'O5',
      action: 'Reassign',
      travel: null,
    },
    {
      id: 41387,
      pos_title: 'RESIGNATION',
      pos_num: 'N/A',
      org: 'INR',
      eta: '2031-12-05T00:00:00.000Z',
      ted: '2034-11-05T00:00:00.000Z',
      tod: '3 YRS/TRANSFER',
      grade: 'MC',
      action: 'Resign',
      travel: null,
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLocalLoading(false);
      setParentState(false);
    }, '9000');
  }, []);

  return (
    <div className="agenda-item-history-container ai-timeline-pane">
      {
        !unitedLoading &&
          <>
            <div className="ai-history-rows-container">
              <div className="ai-history-row">
                <AgendaItemLegs hideRemarks legs={FAKE_LEGS} showCloseButton />
              </div>
            </div>
          </>
      }
    </div>);
};

AgendaItemTimeline.propTypes = {
  unitedLoading: PropTypes.bool,
  setParentState: PropTypes.func,
};

AgendaItemTimeline.defaultProps = {
  unitedLoading: true,
  setParentState: EMPTY_FUNCTION,
};

export default AgendaItemTimeline;
