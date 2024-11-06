import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import InteractiveElement from 'Components/InteractiveElement';
// @ts-ignore
import { downloadFromResponse } from 'utilities';
// @ts-ignore
import api from '../../../api';

const GlossaryExport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    if (!isLoading) {
      setIsLoading(true);
      api().get('/glossary/export/')
        .then((res) => downloadFromResponse(res, 'TalentMAP-Glossary.csv'))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="glossary-export">
      <InteractiveElement type="span" onClick={onClick} title="Download Glossary as CSV">
        <FontAwesomeIcon
          icon={faFileExcel}
        />
        Download
      </InteractiveElement>
    </div>
  );
};

export default GlossaryExport;
