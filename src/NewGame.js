import { emptySuperBoard, O, X } from './constants.js';
import Firebase from 'firebase';
import { merge, sample } from 'lodash';
import React, { PropTypes } from 'react/addons';
import ReactFireMixin from 'reactfire';
import UserInfo from './UserInfo.js'

function createNewGame(callback) {
  let games = new Firebase('https://sttt.firebaseio.com/games');
  let activePlayer = sample([X, O]);
  let ref = games.push({
    activePlayer: activePlayer,
    game: emptySuperBoard(),
    lastMove: null,
    [activePlayer]: UserInfo.get().username,
  }, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(ref.key(), activePlayer);
  });
}

const NewGame = React.createClass({
  contextTypes: {
    router: PropTypes.func.isRequired,
  },

  componentDidUpdate() {
    UserInfo.set(this.state.info);
  },

  getInitialState() {
    return {
      info: UserInfo.get(),
      pending: false,
    };
  },

  handleUserUpdate({target: {value}}) {
    this.setState({
      info: merge({}, this.state.info, {
        username: value,
      }),
    });
  },

  handleNewGame() {
    this.setState({pending: true});
    createNewGame((key, activePlayer) => {
      UserInfo.set({
        [key]: activePlayer,
      });
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
              value={this.state.info.username}
            />
          </label>
        </div>
        <br />
        {this.renderNewGameButton()}
      </div>
    );
  },

  renderNewGameButton() {
    if (!this.state.info.username || this.state.pending) {
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
