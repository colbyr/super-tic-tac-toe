import { cloneDeep, sample } from 'lodash';
import SuperBoard from './SuperBoard.js';
import { emptySuperBoard, O, X } from './constants.js';
import React from 'react/addons';
import { RouteHandler } from 'react-router';

export default React.createClass({
  getInitialState() {
    return {
      activePlayer: sample([X, O]),
      game: emptySuperBoard(),
    };
  },

  handleMove(superRowIndex, superColumnIndex, rowIndex, columnIndex) {
    console.log('move!', superRowIndex, superColumnIndex, rowIndex, columnIndex);
    this.state.game[superRowIndex][superColumnIndex][rowIndex][columnIndex] = this.state.activePlayer;
    this.setState({
      activePlayer: this.state.activePlayer === X ? O : X,
      game: this.state.game,
    });
  },

  render() {
    return (
      <div>
        <p>Active player: {this.state.activePlayer}</p>
        <SuperBoard
          onMove={this.handleMove}
          superBoard={this.state.game}
        />
      </div>
    );
  },
});

