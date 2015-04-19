import { emptySuperBoard, O, X } from './constants.js';
import Firebase from 'firebase';
import { sample } from 'lodash';
import React, { PropTypes } from 'react/addons';
import ReactFireMixin from 'reactfire';

const NewGame = React.createClass({
  contextTypes: {
    router: PropTypes.func.isRequired,
  },

  componentWillMount() {
    let games = new Firebase('https://sttt.firebaseio.com/games');
    var ref = games.push({
      activePlayer: sample([X, O]),
      game: emptySuperBoard(),
      lastMove: null,
    }, (error) => {
      if (error) {
        console.error(error);
        return;
      }
      this.context.router.replaceWith(
        'play_game',
        {game_id: ref.key()}
      );
    })
  },

  render() {
    return <div>creating new game...</div>;
  }

});

export default NewGame;
