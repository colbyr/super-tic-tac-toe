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
    return (
      <div>
        Joining game #{game_id} as {as_player}...
      </div>
    );
  },
});

export default JoinGame;
