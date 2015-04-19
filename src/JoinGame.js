import { emptySuperBoard, O, X } from './constants.js';
import Firebase from 'firebase';
import { sample } from 'lodash';
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
    let {game_id, as_player} = this.context.router.getCurrentParams();
    joinGame(game_id, as_player, () => {
      this.context.router.replaceWith(
        'play_game',
        {game_id}
      );
    });
  },

  render() {
    let {game_id, as_player} = this.context.router.getCurrentParams();
    let username = UserInfo.get().username;
    return (
      <div>
        {username ? renderGameJoin() : renderNewPlayer()}
      </div>
    )
  },

  renderGameJoin(game_id, as_player) {
    return (
      <div>
        Joining game #{game_id} as {as_player}...
      </div>
    );
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
        {this.renderContinue}
      </div>
    );
  },

  renderContinue() {
    if (!this.state.info.username) {
      return null;
    }
    return (
      <button onClick={this.continue}>
        Continue
      </button>
    )
  }
    
});

export default JoinGame;
