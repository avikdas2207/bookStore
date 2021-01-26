import react from 'react';
import shallow from 'enzyme';
import testUnit from './test';

let wrapper;
beforeEach (() => {
    wrapper = shallow(<testUnit />);
});

describe('testUnit test', () => {
    test('input check'), () => {
        expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    }
})