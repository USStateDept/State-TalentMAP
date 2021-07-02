import * as React from 'react';
import { isEqual, map } from 'lodash';

const shortid = require('shortid');

type Message = {
  body: React.ReactNode;
};

type Props = {
  type: "info" | "warning" | "error" | "success" | "dark";
  // should be one of the USWDS alert types - https://standards.usa.gov/components/alerts/
  title?: string;
  messages: Array<Message>;
  isAriaLive?: boolean;
  isDivided?: boolean;
  className?: string;
};

class Alert extends React.Component<Props> {
  static defaultProps: Props = {
    type: 'info',
    title: '',
    messages: [{
      body: '',
    }],
    isAriaLive: false,
    isDivided: false,
    className: '',
  };

  // prevent unneeded rerenders, which can cause accessibility issues
  shouldComponentUpdate(nextProps: Props): boolean {
    return !isEqual(this.props, nextProps);
  }

  render(): React.ReactNode {
    const { type, title, messages, isAriaLive, isDivided, className } = this.props;
    // 'type' is injected into the class name
    // type 'error' requires an ARIA role

    let ariaLiveProps = {};

    if (isAriaLive) {
      ariaLiveProps = {
        'aria-live': 'polite',
        'aria-atomic': 'true',
      };
    }

    const h3 = <h3 className="usa-alert-heading">{title}</h3>;
    const body = map(messages, (message: Message) =>
      (<p className="usa-alert-text" key={shortid.generate()}>
        {message.body}
      </p>),
    );

    return (
      <div className={`usa-alert usa-alert-${type} ${className}`} role={type === 'error' ? 'alert' : undefined} {...ariaLiveProps}>
        {isDivided ?
          <div>
            <div className="usa-alert-body">
              {h3}
            </div>
            <div className="divider" />
            <div className="usa-alert-body">
              {body}
            </div>
          </div> :
          <div className="usa-alert-body">
            {h3}
            {body}
          </div>}
      </div>
    );
  }
}

export default Alert;
