import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import SearchBar from './SearchBar';

['small', 'medium', 'big'].forEach((size) => {
  describe(`SearchBarComponent ${size}`, () => {
    let wrapper = null;

    it('can receive props', () => {
      wrapper = shallow(
        <SearchBar
          id="search"
          type={size}
          submitText="Submit"
          alertText="Search disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      expect(wrapper.instance().props.id).toBe('search');
    });

    it('handles different props', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          label="Label"
          type={size}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      expect(wrapper.instance().props.id).toBe('search-2');
    });

    it('can change text', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          type={size}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      wrapper.find('input').simulate('change', { target: { value: 'test' } });
      expect(wrapper.instance().state.searchText.value).toBe('test');
    });

    it('can submit the form', () => {
      const spy = sinon.spy();
      wrapper = shallow(
        <SearchBar
          id="search-2"
          type={size}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={spy}
        />,
      );
      wrapper.find('input').simulate('change', { target: { value: 'test' } });
      wrapper.find('form').simulate('submit');
      expect(spy.calledOnce).toBe(true);
    });

    it('sets state and calls props.onClear() on this.onClear()', () => {
      const spy = sinon.spy();
      wrapper = shallow(<SearchBar
        id="search-2"
        type={size}
        submitText="Submit 2"
        alertText="Search is disabled"
        onChangeText={() => {}}
        onSubmitSearch={() => {}}
        showClear
        onClear={spy}
      />);
      wrapper.instance().setState({ searchText: { value: 'abc' } });
      wrapper.find('[title="Clear keyword"]').simulate('click');
      expect(wrapper.instance().state.searchText.value).toBe('');
      sinon.assert.calledOnce(spy);
    });

    it('matches snapshot', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          label="Label"
          type={size}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('matches snapshot when showClear === true', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          label="Label"
          type={size}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
          showClear
        />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
