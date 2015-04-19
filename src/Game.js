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

  getGameKey() {
    return this.firebaseRefs.game.key();
  },

  getInitialState() {
    return {};
  },

  getInviteURL() {
    let currentPiece = UserInfo.get()[this.getGameKey()];
    let {username} = UserInfo.get();
    let path = `/${this.getGameKey()}/${currentPiece === X ? O : X}`;
    return location.toString().replace('/' + this.getGameKey(), '') + '/join' + path;
  },

  getIsTurn() {
    let {activePlayer, isLocal} = this.state.game;
    return isLocal || this.state.game[activePlayer] === UserInfo.get().username;
  },

  getReadyToPlay() {
    return this.state.game.isLocal || (this.state.game.O && this.state.game.X);
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
    this.firebaseRefs.game.update({
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
        {this.renderInvite()}
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
    if (!this.getReadyToPlay()) {
      return null;
    }
    let {isLocal, activePlayer} = this.state.game;
    if (this.getIsTurn()) {
      return (
        <p>
          It's your turn,
          {' '}
          <strong>{isLocal ? activePlayer : UserInfo.get().username}</strong>!
        </p>
      );
    }
    return <p>It's {this.state.game.activePlayer}'s turn.</p>
  },

  renderInvite() {
    if (this.getReadyToPlay()) {
      return null;
    }
    return (
      <label>
        Invite URL:
        {' '}
        <input
          style={{width: 300}}
          value={this.getInviteURL()}
        />
      </label>
    );
  }
});

