import { partial } from 'lodash';
import Board from './Board.js';
import React, { PropTypes } from 'react/addons';

var styles = {
  conatiner: {
    display: 'flex',
    width: 840,
  },
  board: {
    border: '1px solid #AAA',
    height: 240,
    padding: 20,
    width: 240,
  },
  row: {
    display: 'flex',
    height: 280,
    width: 840,
  },
};

const SuperBoard = React.createClass({
  propTypes: {
    onMove: PropTypes.func.isRequired,
    superBoard: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.arrayOf(
            PropTypes.string.isRequired
          ).isRequired
        ).isRequired
      ).isRequired
    ).isRequired,
  },

  render() {
    return (
      <div style={styles.container}>
        {this.props.superBoard.map(this.renderRow)}
      </div>
    );
  },

  renderBoard(superRow, board, superBoard) {
  },

  renderRow(superRow, superRowIndex) {
    return (
      <div style={styles.row}>
        {superRow.map((board, superBoardIndex) => {
          return (
            <div style={styles.board}>
              <Board
                board={board}
                onMove={partial(this.props.onMove, superRowIndex, superBoardIndex)}
              />
            </div>
          );
        })}
      </div>
    );
  },
});

export default SuperBoard;
