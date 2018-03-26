// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

// react 16 depends on requestAnimationFrame
import 'raf/polyfill';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({
  map: (json) => {
    return json;
  }
}));
configure({ adapter: new Adapter() });