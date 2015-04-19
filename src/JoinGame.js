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

  componentWillMount() {
    UserInfo.get().username ? this.continueToGame() : null;
  },

  continueToGame() {
    let {game_id, as_player} = this.context.router.getCurrentParams();
    let username = this.state.info.username;
    debugger;
    UserInfo.set({
      [as_player]: username,
    });
    joinGame(game_id, as_player, () => {
      this.context.router.replaceWith(
        'play_game',
        {game_id}
      );
    });
  },

  getInitialState() {
    return {
      info: UserInfo.get(),
    };
  },

  handleUserUpdate({target: {value}}) {
    this.setState({
      info: merge({}, this.state.info, {
        username: value,
      }),
    });
  },

  render() {
    let {game_id, as_player} = this.context.router.getCurrentParams();
    let username = UserInfo.get().username;
    return (
      <div>
        {this.renderNewPlayer()}
      </div>
    )
  },

  renderNewPlayer() {
    return (
      <div>
        <label>
          Welcome New Player! Please enter a name for yourself:
          <input
           onChange={this.handleUserUpdate}
           placeholder="nickname"
           value={this.state.info.username}
          />
        </label>
        {this.renderContinue()}
      </div>
    );
  },

  renderContinue() {
    if (!this.state.info.username) {
      return null;
    }
    return (
      <button onClick={this.continueToGame}>
        Continue
      </button>
    )
  }
    
});

export default JoinGame;
