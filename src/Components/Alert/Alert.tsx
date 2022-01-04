import { Component } from 'react';
import { isEqual, map } from 'lodash';
import shortid from 'shortid';

type Message = {
  body: React.ReactNode;
};

type DefaultProps = {
  type: 'info' | 'warning' | 'error' | 'success' | 'dark';
  // should be one of the USWDS alert types - https://standards.usa.gov/components/alerts/
  title?: string;
  messages: Array<Message>;
  isAriaLive?: boolean;
  isDivided?: boolean;
  customClassName?: string;
};

type Props = DefaultProps;

class Alert extends Component<Props> {
  static defaultProps: DefaultProps = {
    type: 'info',
    title: '',
    messages: [{
      body: '',
    }],
    isAriaLive: false,
    isDivided: false,
    customClassName: '',
  };

  // prevent unneeded rerenders, which can cause accessibility issues
  shouldComponentUpdate(nextProps: Props): boolean {
    return !isEqual(this.props, nextProps);
  }

  render(): React.ReactNode {
    const { type, title, messages, isAriaLive, isDivided, customClassName } = this.props;
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
      <div className={`usa-alert usa-alert-${type} ${customClassName}`} role={type === 'error' ? 'alert' : undefined} {...ariaLiveProps}>
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
