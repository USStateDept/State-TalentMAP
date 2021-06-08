// @flow
import * as React from 'react';
import { isEqual, map } from 'lodash';

const shortid = require('shortid');

type Message = {
  body: React.Node,
}

type DefaultProps = {
  type: string,
  title?: string,
  messages: Array<Message>,
  isAriaLive?: boolean,
  isDivided?: boolean,
};

type Props = {
  ...DefaultProps
}

class Alert extends React.Component<Props> {
  static defaultProps: DefaultProps = {
    type: 'info', // should be one of the USWDS alert types - https://standards.usa.gov/components/alerts/
    title: '',
    messages: [{ body: '' }],
    isAriaLive: false,
    isDivided: false,
  };

  // prevent unneeded rerenders, which can cause accessibility issues
  shouldComponentUpdate(nextProps: any): boolean {
    return !isEqual(this.props, nextProps);
  }

  render(): React.Node {
    const { type, title, messages, isAriaLive, isDivided } = this.props;
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
      <div className={`usa-alert usa-alert-${type}`} role={(type === 'error') ? 'alert' : null} {...ariaLiveProps}>
        {
          isDivided ?
            <div>
              <div className="usa-alert-body">
                {h3}
              </div>
              <div className="divider" />
              <div className="usa-alert-body">
                {body}
              </div>
            </div>
            :
            <div className="usa-alert-body">
              {h3}
              {body}
            </div>
        }
      </div>
    );
  }
}

export default Alert;
