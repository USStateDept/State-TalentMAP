import { get } from 'lodash';
// @ts-ignore
import { isOnProxy } from 'utilities';
import LinkButton from '../LinkButton';

type URL = {
  internal: string;
  external: string;
};

export type Props = {
  url: URL;
  type: 'post' | 'post-data' | 'country';
  label: React.ReactNode;
  isButton: boolean;
  altStyle: boolean;
};

const OBCUrl: React.FC<Props> = props => {
  const { type = 'post', label = null, isButton = false, altStyle = false, url = {} } = props;
  let text; // link text value
  let url$ = get(url, 'internal');

  // define the URL according to the type
  switch (type) {
    case 'country':
      text = 'Country';
      break;

    case 'post-data':
      text = 'Post';
      break;

    default:
    case 'post':
      text = 'Post';
  }

  text = label || `${text} details`;

  if (isOnProxy()) {
    url$ = get(url, 'external');
  }

  const el = isButton ?
    <LinkButton isExternal className={`post-data-button ${altStyle ? 'usa-button-secondary' : ''}`} toLink={url$} >{text}</LinkButton>
    :
    // This always directs to an internal resource, so there is no security risk.
    // eslint-disable-next-line react/jsx-no-target-blank
    <a href={url$} rel="noopener" target="_blank">{text}</a>;

  return (
    url$ ? el : null
  );
};

export default OBCUrl;
