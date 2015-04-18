import SuperBoard from './SuperBoard.js';
import { EMPTY_SUPER_BOARD } from './constants.js';
import React from 'react/addons';
import { RouteHandler } from 'react-router';

export default React.createClass({
  render() {
    return (
      <SuperBoard superBoard={EMPTY_SUPER_BOARD} />
    );
  },
});

