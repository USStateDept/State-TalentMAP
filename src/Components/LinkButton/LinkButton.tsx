import { Link } from 'react-router-dom';

export type Props = {
  children: React.ReactNode,
  className?: string,
  toLink: string,
  useDefaultClass?: boolean,
  isExternal?: boolean,
};

const LinkButton: React.FC<Props> = props => {
  const { children, className = '', toLink, useDefaultClass = true, isExternal = false } = props;
  return (
    <span className="link-button-wrapper">
      {
        isExternal ?
          <a
            className={`${useDefaultClass ? 'link-button' : ''} ${className}`}
            type="submit"
            role="button"
            href={toLink}
            rel="noopener"
            target="_blank"
          >
            {children}
          </a>
          :
          <Link
            className={`${useDefaultClass ? 'link-button' : ''} ${className}`}
            type="submit"
            role="button"
            to={toLink}
          >
            {children}
          </Link>
      }
    </span>
  );
};

export default LinkButton;
