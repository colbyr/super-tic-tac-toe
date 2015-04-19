import { emptySuperBoard, O, X } from './constants.js';
import Firebase from 'firebase';
import { sample } from 'lodash';
import React, { PropTypes } from 'react/addons';
import ReactFireMixin from 'reactfire';
import UserInfo from './UserInfo.js'

function createNewGame(callback) {
  let games = new Firebase('https://sttt.firebaseio.com/games');
  let ref = games.push({
    activePlayer: sample([X, O]),
    game: emptySuperBoard(),
    lastMove: null,
  }, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(ref.key());
  });
}

const NewGame = React.createClass({
  contextTypes: {
    router: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      pending: false,
    };
  },

  handleUserUpdate({target: {value}}) {
    UserInfo.set({
      username: value,
    });
  },

  handleNewGame() {
    this.setState({pending: true});
    createNewGame(key => {
      this.context.router.replaceWith(
        'play_game',
        {game_id: key}
      );
    });
  },

  render() {
    return (
      <div>
        <div>
          <label>
            What's your name?
            {' '}
            <input
              onChange={this.handleUserUpdate}
              placeholder="enter user name"
              value={UserInfo.get().username}
            />
          </label>
        </div>
        <br />
        {this.renderNewGameButton()}
      </div>
    );
  },

  renderNewGameButton() {
    if (!UserInfo.get().username || this.state.pending) {
      return null;
    }
    return (
      <button onClick={this.handleNewGame}>
        Start New Game
      </button>
    );
  },

});

export default NewGame;
