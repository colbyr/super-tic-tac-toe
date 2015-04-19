import Firebase from 'firebase';
import { cloneDeep, sample } from 'lodash';
import SuperBoard from './SuperBoard.js';
import { emptySuperBoard, O, X } from './constants.js';
import { superWinner, winner } from './matrix_functions.js';
import React, { PropTypes } from 'react/addons';
import ReactFireMixin from 'reactfire';
import UserInfo from './UserInfo.js';

function getFocused(superBoard, lastMove) {
  if (
    !lastMove ||
    winner(superBoard[lastMove.rowIndex][lastMove.columnIndex])
  ) {
    return null;
  }
  return {
    superRowIndex: lastMove.rowIndex,
    superColumnIndex: lastMove.columnIndex,
  };
}

export default React.createClass({
  contextTypes: {
    router: PropTypes.func.isRequired,
  },

  mixins: [ReactFireMixin],

  componentWillMount() {
    this.bindAsObject(
      new Firebase(
        'https://sttt.firebaseio.com/games/' +
          this.context.router.getCurrentParams().game_id
      ),
      "game"
    );
  },

  getInitialState() {
    return {};
  },

  getIsTurn() {
    let info = UserInfo.get();
    let {activePlayer} = this.state.game;
    return activePlayer === info[this.firebaseRefs.game.key()];
  },

  handleMove(superRowIndex, superColumnIndex, rowIndex, columnIndex) {
    let {activePlayer, lastMove, game} = this.state.game;
    if (!this.getIsTurn()) {
      window.alert(
        'Woah. It\'s not your turn, ' +
        UserInfo.get().username +
        ' Pump the brakes.'
      );
      return;
    }
    this.firebaseRefs.game.set({
      activePlayer: activePlayer === X ? O : X,
      game: React.addons.update(
        game,
        {[superRowIndex]: {[superColumnIndex]: {[rowIndex]: {[columnIndex]: {$set: activePlayer}}}}}
      ),
      lastMove: {superRowIndex, superColumnIndex, rowIndex, columnIndex},
    });
  },

  render() {
    if (!this.state.game) {
      return <p>loading</p>;
    }
    let {activePlayer, lastMove, game} = this.state.game;
    if (superWinner(game)) {
      return (
        <h1>
          OMG
          {' '}
          <strong>{activePlayer === X ? O : X}</strong>
          {' '}
          WINS!
        </h1>
      );
    }
    return (
      <div>
        {this.renderActivePlayer()}
        <SuperBoard
          focused={getFocused(game, lastMove)}
          onMove={this.handleMove}
          superBoard={game}
        />
      </div>
    );
  },

  renderActivePlayer() {
    if (this.getIsTurn()) {
      return (
        <p>It's your turn, <strong>{UserInfo.get().username}</strong>!</p>
      );
    }
    return <p>It's {this.state.game.activePlayer}'s turn.</p>
  },
});

