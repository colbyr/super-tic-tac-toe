import { emptySuperBoard, O, X } from './constants.js';
import Firebase from 'firebase';
import { sample,merge } from 'lodash';
import React, { PropTypes } from 'react/addons';
import ReactFireMixin from 'reactfire';
import UserInfo from './UserInfo.js'

function joinGame(key, as_player, callback) {
  let game = new Firebase('https://sttt.firebaseio.com/games/' + key);
  let ref = game.update({
    [as_player]: UserInfo.get().username || '',
  }, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    callback();
  });
}

const JoinGame = React.createClass({
  contextTypes: {
    router: PropTypes.func.isRequired,
  },

  mixins: [
    ReactFireMixin,
  ],

  componentDidUpdate() {
    UserInfo.set(this.state.info);
  },

  componentWillMount() {
    this.bindAsObject(
      new Firebase(
        'https://sttt.firebaseio.com/games/' +
          this.context.router.getCurrentParams().game_id
      ),
      "game"
    );
  },

  getHasUserName() {
    return !!this.state.info.username;
  },

  getGameIsFull() {
    return !this.state.game || this.state.game.X && this.state.game.O;
  },

  getInitialState() {
    return {
      info: UserInfo.get(),
      startingGame: false,
    };
  },

  handleJoinGame() {
    if (this.getGameIsFull()) {
      return;
    }
    this.setState({startingGame: true});
    let {game_id, as_player} = this.context.router.getCurrentParams();
    let username = this.state.info.username;
    joinGame(game_id, as_player, () => {
      this.context.router.replaceWith(
        'play_game',
        {game_id}
      );
    });
  },

  handleInfoUpdate({target: {value}}) {
    this.setState({
      info: merge({}, this.state.info, {
        username: value,
      }),
    });
  },

  render() {
    if (!this.state.game) {
      return <p>loading...</p>;
    }
    return (
      <div>
        {this.renderUserName()}
        {this.renderJoin()}
      </div>
    )
  },

  renderJoin() {
    if (this.getGameIsFull()) {
      return (
        <p>This game is already full.</p>
      );
    }
    if (!this.getHasUserName()) {
      return null;
    }
    return (
      <button onClick={this.handleJoinGame}>
        Join game
      </button>
    )
  },

  renderUserName() {
    if (this.getGameIsFull()) {
      return null;
    }
    if (this.state.startingGame) {
      return <p>Joining game...</p>;
    }
    return (
      <label>
        Please enter a name for yourself:
        {' '}
        <input
          onChange={this.handleInfoUpdate}
          placeholder="nickname"
          value={this.state.info.username}
        />
      </label>
    );
  },
});

export default JoinGame;
