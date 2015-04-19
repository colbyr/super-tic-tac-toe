import { cloneDeep, sample } from 'lodash';
import SuperBoard from './SuperBoard.js';
import { emptySuperBoard, O, X } from './constants.js';
import { winner } from './matrix_functions.js';
import React from 'react/addons';
import { RouteHandler } from 'react-router';

function getFocused(superBoard, rowIndex, columnIndex) {
  if (winner(superBoard[rowIndex][columnIndex])) {
    return null;
  }
  return {
    superRowIndex: rowIndex,
    superColumnIndex: columnIndex,
  };
}

export default React.createClass({
  getInitialState() {
    return {
      activePlayer: sample([X, O]),
      game: emptySuperBoard(),
      focused: null,
    };
  },

  handleMove(superRowIndex, superColumnIndex, rowIndex, columnIndex) {
    console.log('move!', superRowIndex, superColumnIndex, rowIndex, columnIndex);
    this.state.game[superRowIndex][superColumnIndex][rowIndex][columnIndex] = this.state.activePlayer;
    this.setState({
      activePlayer: this.state.activePlayer === X ? O : X,
      game: this.state.game,
      focused: getFocused(this.state.game, rowIndex, columnIndex),
    });
  },

  render() {
    console.log(this.state.focused)
    return (
      <div>
        <p>Active player: {this.state.activePlayer}</p>
        <SuperBoard
          focused={this.state.focused}
          onMove={this.handleMove}
          superBoard={this.state.game}
        />
      </div>
    );
  },
});

