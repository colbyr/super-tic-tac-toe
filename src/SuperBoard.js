import { partial } from 'lodash';
import Board from './Board.js';
import React, { PropTypes } from 'react/addons';

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
      <div className='container'>
        {this.props.superBoard.map(this.renderRow)}
      </div>
    );
  },

  renderBoard(superRow, board, superBoard) {
  },

  renderRow(superRow, superRowIndex) {
    return (
      <div className='super-row'>
        {superRow.map((board, superBoardIndex) => {
          return (
            <div className='board'>
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
