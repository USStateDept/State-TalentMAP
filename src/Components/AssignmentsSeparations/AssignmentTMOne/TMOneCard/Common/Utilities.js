import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import { formatDate, getAssetPath } from 'utilities';

const dosSeal = getAssetPath('/assets/img/dos-seal-pdf.png');

/**
 * Generates array of assignments in proper format for
 * EOPF File Importer post request when sending Notification or Memo
 * @param {*} assignmentsRef array of assignments selected for cable/memo
 * @param {*} cable the basic cable/memo data
 * @param {*} note the additional cable/memo data
 */
export const generateEopfAssignments = (assignmentsRef, cable, note) => {
  // Reference of invalid date parameters
  const invalid = [undefined, null, '', 'null'];

  // Converts MM/YYYY string to a valid date input
  const validDate = (monthYear) => {
    const split = monthYear.split('/');
    return new Date(split[1], split[0] - 1, 1);
  };

  const assignmentsParam = [];

  if (assignmentsRef) {
    assignmentsRef.forEach(a => {
      // Append assignment to array parameter
      assignmentsParam.push({
        positionnumber: a.POS_NUM_TXT,
        location: a.POS_LOCATION_CODE,
        positiontitle: a.POS_TITLE_TXT,
        eta: invalid.includes(a.ASGD_ETA_DATE) ? null : validDate(a.ASGD_ETA_DATE),
        ted: invalid.includes(a.ASGD_ETD_TED_DATE) ? null : validDate(a.ASGD_ETD_TED_DATE),
        travelfunction: a.TF_CD,
        datesent: invalid.includes(cable?.O_LAST_SENT_DATE) ? null : cable?.O_LAST_SENT_DATE,
        status: a.ASGS_CODE,
        nmnotificationind: note?.NM_NOTIFICATION_IND,
        effectivedate: invalid.includes(cable?.O_LAST_SENT_DATE) ? null : cable?.O_LAST_SENT_DATE,
      });
    });
  }

  return assignmentsParam;
};

/**
 * Generates PDF of TM1 Note/Memo formatted accordingly to given
 * examples in EOPF directory
 * @param {*} getPreviewText retrieves the formatted note/memo preview text
 * @param {*} filename name of the note/memo according to EOPF filename standards
 */
export const generatePDF = (getPreviewText, filename, memo) => {
  const content = document.createElement('p');
  content.style.cssText = 'width:calc(595px - 72px); font-size:12px; font-family:Times; line-height:1.3em; letter-spacing:0.01em; white-space:pre-line;';
  content.innerHTML = getPreviewText(true);

  // eslint-disable-next-line new-cap
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.html(content, {
    callback: (doc) => {
      if (memo) {
        doc.addImage(dosSeal, 'PNG', 36, 10, 75, 75);
      }
      // eslint-disable-next-line no-loops/no-loops
      for (let page = 1; page <= doc.getNumberOfPages(); page += 1) {
        doc.setPage(page);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.15 }));
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(70);
        doc.text(
          'NOT FOR PRODUCTION USE',
          297, 400,
          { align: 'center', baseline: 'center', maxWidth: 500 },
        );
        doc.restoreGraphicsState();
      }
    },
    margin: [36, 36, 36, 36],
    autoPaging: 'text',
  });
  const base64string = pdf.output('datauristring');
  return base64string;
};

/**
 * Generates XML of TM1 Notification according to FSBID format
 * @param {*} cable cable ref object
 * @param {*} content formatted contents of the note cable
 * @param {*} subject subject line of note cable
 */
export const generateXML = (cable, content, subject) => {
  const uuid = uuidv4();
  const date = new Date();
  const apprOriginator = cable?.QRY_APPR_ORIGINATOR;
  const routingDistro = cable?.QRY_ROUTING_DISTRO;

  let xmlStr = '<?xml version="1.0">';
  xmlStr = xmlStr.concat('<SmartPortalMessage xmlns="http://SmartPortalMessage.State.Gov/v1" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">');

  // ================== IDENTIFIERS ==================

  xmlStr = xmlStr.concat('<Identifiers>');
  xmlStr = xmlStr.concat(`<MessageID>${uuid}</MessageID>`);
  xmlStr = xmlStr.concat(`<MessageIDOriginal>${uuid}</MessageIDOriginal>`);
  xmlStr = xmlStr.concat('</Identifiers>');

  // ================== DTG ==================

  xmlStr = xmlStr.concat('<Dtg/>');

  // ================== PRECEDENCE ==================

  xmlStr = xmlStr.concat('<Precedence>Routine</Precedence>');

  // ================== CLASSIFICATION ==================

  xmlStr = xmlStr.concat('<Classification>');
  xmlStr = xmlStr.concat('<ClassificationLevel>Unclassified</ClassificationLevel>');
  xmlStr = xmlStr.concat(`<ClassificationDate>${formatDate(date, 'YYYY-MM-DD')}</ClassificationDate>`);
  xmlStr = xmlStr.concat('<Agency>State</Agency>');
  xmlStr = xmlStr.concat('<Office/>');
  xmlStr = xmlStr.concat('<EONumber>13526</EONumber>');
  xmlStr = xmlStr.concat('<Derived/>');
  xmlStr = xmlStr.concat('</Classification>');

  // ================== ADDRESSEES ==================

  xmlStr = xmlStr.concat('<Addressees>');
  routingDistro.forEach(a => {
    if (a.DT_CODE === 'A' || a.DT_CODE === 'I') {
      xmlStr = xmlStr.concat('<Addressee>');
      xmlStr = xmlStr.concat(`<Address>${a.DisplayName}</Address>`);
      xmlStr = xmlStr.concat(`<AddressDisplayName>${a.DisplayName}</AddressDisplayName>`);
      xmlStr = xmlStr.concat(`<AddressType>${a.AddressType}</AddressType>`);
      xmlStr = xmlStr.concat(`<ActionType>${a.ActionType}</ActionType>`);
      xmlStr = xmlStr.concat(`<Precedence>${a.Precedence}</Precedence>`);
      xmlStr = xmlStr.concat('<IsZen>false</IsZen>');
      xmlStr = xmlStr.concat('</Addressee>');
    }
  });
  xmlStr = xmlStr.concat('</Addressees>');

  // ================== APPROVAL CHAIN ==================

  xmlStr = xmlStr.concat('<ApprovalChain>');
  xmlStr = xmlStr.concat('<Drafter>');
  apprOriginator.forEach(a => {
    xmlStr = xmlStr.concat(`<Name>${a.Name}</Name>`);
    xmlStr = xmlStr.concat(`<EMailAddress>${a.EmailAddress}</EMailAddress>`);
    xmlStr = xmlStr.concat(`<OrgName>${a.OrgName}</OrgName>`);
    xmlStr = xmlStr.concat(`<UserID>${a.UserId}</UserID>`);
  });
  xmlStr = xmlStr.concat('</Drafter>');
  xmlStr = xmlStr.concat('<Approver>');
  apprOriginator.forEach(a => {
    xmlStr = xmlStr.concat(`<Name>${a.Name}</Name>`);
    xmlStr = xmlStr.concat(`<EMailAddress>${a.EmailAddress}</EMailAddress>`);
    xmlStr = xmlStr.concat(`<OrgName>${a.OrgName}</OrgName>`);
    xmlStr = xmlStr.concat(`<UserID>${a.UserId}</UserID>`);
  });
  xmlStr = xmlStr.concat('</Approver>');
  xmlStr = xmlStr.concat('<Releaser>');
  apprOriginator.forEach(a => {
    xmlStr = xmlStr.concat(`<Name>${a.Name}</Name>`);
    xmlStr = xmlStr.concat(`<EMailAddress>${a.EmailAddress}</EMailAddress>`);
    xmlStr = xmlStr.concat(`<OrgName>${a.OrgName}</OrgName>`);
    xmlStr = xmlStr.concat(`<UserID>${a.UserId}</UserID>`);
  });
  xmlStr = xmlStr.concat('</Releaser>');
  xmlStr = xmlStr.concat('<Originator>');
  apprOriginator.forEach(a => {
    xmlStr = xmlStr.concat(`<OriginatorName>${a.OriginatorName}</OriginatorName>`);
    xmlStr = xmlStr.concat('<OriginatorRoutingIndicator/>');
    xmlStr = xmlStr.concat(`<OriginatorLocalName>${a.ORIGINATORLOCALNAME}</OriginatorLocalName>`);
  });
  xmlStr = xmlStr.concat('</Originator>');
  xmlStr = xmlStr.concat('</ApprovalChain>');

  // ================== CONTENT ==================

  xmlStr = xmlStr.concat('<Content>');
  xmlStr = xmlStr.concat(`<BodyPlainText><![CDATA[${content}]]></BodyPlainText>`);
  xmlStr = xmlStr.concat(`<Subject>${subject}</Subject>`);
  xmlStr = xmlStr.concat('</Content>');

  // ================== PROPERTIES ==================

  xmlStr = xmlStr.concat('<Properties>');
  xmlStr = xmlStr.concat(`<ReleaseDateTime>${date.toISOString()}</ReleaseDateTime>`);
  xmlStr = xmlStr.concat('<MessageType>OrgAuthority</MessageType>');
  xmlStr = xmlStr.concat('<TransmitComputerName/>');
  xmlStr = xmlStr.concat('<TransmitSystem/>');
  xmlStr = xmlStr.concat('<CorrectionReason/>');
  xmlStr = xmlStr.concat('<AdHocProperties>');
  xmlStr = xmlStr.concat('<Key>SystemSource</Key>');
  xmlStr = xmlStr.concat('<Value>FSBID</Value>');
  xmlStr = xmlStr.concat('</AdHocProperties>');
  xmlStr = xmlStr.concat('<AdHocProperties>');
  xmlStr = xmlStr.concat('<Key>SchemaSource</Key>');
  xmlStr = xmlStr.concat('<Value>SmartPortalMessage</Value>');
  xmlStr = xmlStr.concat('</AdHocProperties>');
  xmlStr = xmlStr.concat('</Properties>');

  // ========== CLASSIFICATION MODIFICATION DRIVER ==========

  xmlStr = xmlStr.concat('<ClassificationModificationDriver xsi:nil="true"/>');

  // ================== SENSITIVITY CODE ==================

  xmlStr = xmlStr.concat('<SensitivityCode>Privacy/PII</SensitivityCode>');

  // ================== REL TO MARKINGS ==================

  xmlStr = xmlStr.concat('<RelToMarkings/>');

  // ================== REFERENCES ==================

  xmlStr = xmlStr.concat('<References/>');

  // ================== CAPTIONS ==================

  xmlStr = xmlStr.concat('<Captions>');
  xmlStr = xmlStr.concat('<Caption>');
  xmlStr = xmlStr.concat('<Value>TM CHANNEL</Value>');
  xmlStr = xmlStr.concat('</Caption>');
  xmlStr = xmlStr.concat('</Captions>');

  // ================== TAGS ==================

  xmlStr = xmlStr.concat('<Tags>');
  xmlStr = xmlStr.concat('<Tag>');
  xmlStr = xmlStr.concat('<Value>APER</Value>');
  xmlStr = xmlStr.concat('<TagType>S</TagType>');
  xmlStr = xmlStr.concat('</Tag>');
  xmlStr = xmlStr.concat('<Tag>');
  xmlStr = xmlStr.concat('<Value>AFIN</Value>');
  xmlStr = xmlStr.concat('<TagType>S</TagType>');
  xmlStr = xmlStr.concat('</Tag>');
  xmlStr = xmlStr.concat('</Tags>');

  // ================== PASSLINES ==================

  xmlStr = xmlStr.concat('<PassLines>');
  routingDistro.forEach(a => {
    xmlStr = xmlStr.concat(`<PassLine>${a.PASSLINE}<PassLine>`);
  });
  xmlStr = xmlStr.concat('</PassLines>');


  xmlStr = xmlStr.concat('</SmartPortalMessage>');

  // ================== PARSE XML ==================
  // const parser = new window.DOMParser();
  // const xml = parser.parseFromString(xmlStr, 'text/xml');
  // console.log(xml);

  // ================== SERIALIZE XML ==================
  // const serializer = new window.XMLSerializer();
  // const xmlDoc = serializer.serializeToString(xml);
  // console.log(xmlDoc);

  return xmlStr;
};

/**
 * Generates SOAP XML of TM1 Notification according to OPS Log Standards
 * @param {*} log ref data returned from PRC_LIST_OPS_TM1_DATA procedure
 */
export const generateSoapXML = (log) => {
  let xmlStr = '<?xml version="1.0"?>';

  xmlStr = xmlStr.concat('<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">');
  xmlStr = xmlStr.concat('<SOAP-ENV:Body>');

  xmlStr = xmlStr.concat('<Create__CompIntfc__OP_TM_STG_WEB_SRV3>');

  xmlStr = xmlStr.concat('<OP_TRV_MSG_TYPE>TMONE</OP_TRV_MSG_TYPE>');
  xmlStr = xmlStr.concat(`<EMPLID>${log.EMPLID ?? ''}</EMPLID>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASGN_ID>${log.OP_TM_ASGN_SEQ ?? ''}</OP_TM_ASGN_ID>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASG_REV>${log.OP_TM_ASG_REV ?? ''}</OP_TM_ASG_REV>`);
  xmlStr = xmlStr.concat('<OP_TM_TA_ID></OP_TM_TA_ID>');
  xmlStr = xmlStr.concat('<OP_TM_TR_ID></OP_TM_TR_ID>');
  xmlStr = xmlStr.concat('<OP_TM_TR_ID_REV></OP_TM_TR_ID_REV>');
  xmlStr = xmlStr.concat(`<OP_TM_EMP_SEQ_NBR>${log.OP_TM_EMPLID_SEQ ?? ''}</OP_TM_EMP_SEQ_NBR>`);
  xmlStr = xmlStr.concat(`<OP_TM_NM_SEQ>${log.OP_TM_NM_SEQ ?? ''}</OP_TM_NM_SEQ>`);
  xmlStr = xmlStr.concat(`<POSITION_NBR>${log.POSITION_NBR ?? ''}</POSITION_NBR>`);
  xmlStr = xmlStr.concat(`<OP_TM_POS_SEQ>${log.OP_TM_POS_SEQ ?? ''}</OP_TM_POS_SEQ>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASG_STATUS>${log.OP_TM_ASG_STATUS ?? ''}</OP_TM_ASG_STATUS>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASG_TF_CD>${log.OP_TM_ASG_TF_CD ?? ''}</OP_TM_ASG_TF_CD>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASG_TOD_CD>${log.OP_TM_ASG_TOD_CD ?? ''}</OP_TM_ASG_TOD_CD>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASG_TOD_MNTH>${log.OP_TM_ASG_TOD_MNTH ?? ''}</OP_TM_ASG_TOD_MNTH>`);
  xmlStr = xmlStr.concat(`<DEPTID>${log.DEPTID ?? ''}</DEPTID>`);
  xmlStr = xmlStr.concat(`<DEPTID2>${log.DEPTID2 ?? ''}</DEPTID2>`);
  xmlStr = xmlStr.concat(`<OP_TM_ASG_ETA_DATE>${log.OP_TM_ASG_ETA_DATE ?? ''}</OP_TM_ASG_ETA_DATE>`);
  xmlStr = xmlStr.concat('<OP_TM_TRANS_ELG_DT></OP_TM_TRANS_ELG_DT>');
  xmlStr = xmlStr.concat('<BEGIN_DT></BEGIN_DT>');
  xmlStr = xmlStr.concat(`<OP_LAT_CODE>${log.OP_LAT_CODE ?? ''}</OP_LAT_CODE>`);
  xmlStr = xmlStr.concat(`<OP_TM_SUBJECT_TXT><![CDATA[${log.OP_TM_SUBJECT_TXT ?? ''}]]></OP_TM_SUBJECT_TXT>`);
  xmlStr = xmlStr.concat('<OP_TM_TA_DT></OP_TM_TA_DT>');
  xmlStr = xmlStr.concat(`<OP_TM_ASG_ETD_DT>${log.OP_TM_ASG_ET_ED_DT ?? ''}</OP_TM_ASG_ETD_DT>`);
  xmlStr = xmlStr.concat('<OP_TM_TS_CD></OP_TM_TS_CD>');
  xmlStr = xmlStr.concat('<OP_DIP_TTL_CD></OP_DIP_TTL_CD>');
  xmlStr = xmlStr.concat('<OP_TM_PROCESSED>N</OP_TM_PROCESSED>');
  xmlStr = xmlStr.concat('<OP_TM_STG_ERRORCD>N</OP_TM_STG_ERRORCD>');
  xmlStr = xmlStr.concat('<LASTUPDTBY>TalentMAP</LASTUPDTBY>');
  xmlStr = xmlStr.concat('<LASTUPDDTTM></LASTUPDDTTM>');
  xmlStr = xmlStr.concat(`<OP_TRV_MSG><![CDATA[${log.OP_TRV_MSG ?? ''}]]></OP_TRV_MSG>`);
  xmlStr = xmlStr.concat('<OP_TM_DEPENDENT></OP_TM_DEPENDENT>');

  xmlStr = xmlStr.concat('</Create__CompIntfc__OP_TM_STG_WEB_SRV3>');

  xmlStr = xmlStr.concat('</SOAP-ENV:Body>');
  xmlStr = xmlStr.concat('</SOAP-ENV:Envelope>');

  return xmlStr;
};

/**
 * Generates HTML of TM1 Memo according to FSBID format
 * @param {*} getCableValue helper function to retrieve memo fields
 * @param {*} lastSentDate last sent date
 * @param {*} body contents of the memo
 */
export const generateHTML = (getCableValue, lastSentDate, body) => (
  <html lang="en">
    <head>
      <title>{getCableValue('SUBJECT')}</title>
    </head>
    <body>
      <div id="AsgMemoHeader" style={{ width: 650, backgroundColor: 'white' }}>
        <div id="divReport">
          <div style={{ position: 'absolute', right: 0 }}>
            <img src={dosSeal} width="90" height="90" alt="DoS Seal" border="0" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'navy' }}>
            <span>MEMORANDUM</span>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div>
            <span style={{ width: 80 }}>TO:&nbsp;</span>
            <span>{getCableValue('TO_ADDRESS')}</span>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div>
            <span style={{ width: 80 }}>FROM:&nbsp;</span>
            <span>{getCableValue('FROM_ADDRESS')}</span>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div>
            <span style={{ width: 80 }}>SUBJECT:&nbsp;</span>
            <span>{getCableValue('SUBJECT')}</span>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div style={{ borderBottom: '2px solid black' }}>
            <span style={{ width: 80 }}>LAST SENT:&nbsp;</span>
            <span>{lastSentDate}</span>
          </div>
          <div>
            <span style={{ width: 550, whiteSpace: 'pre-line' }}>{body}</span>
          </div>
        </div>
      </div>
    </body>
  </html>
);

/**
 * Extracts values from OPS SOAP WSDL response
 * to use in OPS log inserts and updates
 * @param {*} res SOAP XML response
 */
export const extractSoapResponse = (res) => {
  // Decode string escape sequences in the XML response
  const response = res.replace(/\\u(\w{4})/gi, (match, hex) => String.fromCharCode(parseInt(hex, 16)));

  // Parse string into XML for simplified extraction
  const parser = new window.DOMParser();
  const xml = parser.parseFromString(response, 'text/xml');

  // Extract necessary tag values to determine successfulness
  const notification = xml.getElementsByTagName('notification')[0].textContent;
  const statusCode = xml.getElementsByTagName('StatusCode')[0].textContent;

  if (notification) {
    const successMsg = `SUCCESSFUL CALL OPS Web Service: ${response}`;
    return {
      code: 1,
      message: successMsg,
    };
  } else if (statusCode) {
    const errorMsg = `ERROR when calling OPS: ${response}`;
    return {
      code: -1,
      message: errorMsg,
    };
  }
  const errorMsg = `ERROR: ${response}`;
  return {
    code: -1,
    message: errorMsg,
  };
};
