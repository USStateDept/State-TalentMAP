import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import HomePagePositionsList from './HomePagePositionsList';

describe('HomePagePositionsList', () => {
    it('is defined', () => {
        const wrapper = ReactTestUtils.renderIntoDocument(<HomePagePositionsList />);
        expect(wrapper).toBeDefined();
    });
});
