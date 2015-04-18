import { cloneDeep } from 'lodash';
import SuperBoard from './SuperBoard.js';
import { EMPTY_SUPER_BOARD } from './constants.js';
import React from 'react/addons';
import { RouteHandler } from 'react-router';

export default React.createClass({
  getInitialState() {
    return {
      game: cloneDeep(EMPTY_SUPER_BOARD),
    };
  },

  handleMove(superRowIndex, superColumnIndex, rowIndex, columnIndex) {
    console.log('move!', superRowIndex, superColumnIndex, rowIndex, columnIndex);
  },

  render() {
    return (
      <SuperBoard
        onMove={this.handleMove}
        superBoard={this.state.game}
      />
    );
  },
});

