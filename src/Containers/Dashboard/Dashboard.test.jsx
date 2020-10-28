import TestUtils from 'react-dom/test-utils';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import MockTestProvider from '../../testUtilities/MockProvider';
import DashboardContainer, { mapDispatchToProps } from './Dashboard';

describe('DashboardContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<MockTestProvider>
      <DashboardContainer />
    </MockTestProvider>);
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(
    mapDispatchToProps,
    {
      submitBidPosition: [1],
      deleteBid: [1],
    });
});
