import { partial } from 'lodash';
import Board from './Board.js';
import React, { PropTypes } from 'react/addons';

const SuperBoard = React.createClass({
  propTypes: {
    complete: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired,
    focused: PropTypes.shape({
      superRowIndex: PropTypes.number.isRequired,
      superColumnIndex: PropTypes.number.isRequired,
    }),
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

  getDefaultProps() {
    return {
      complete: false,
    };
  },

  render() {
    return (
      <div className='container'>
        {this.props.superBoard.map(this.renderRow)}
      </div>
    );
  },

  renderRow(superRow, superRowIndex) {
    let focusedCoords = this.props.focused;
    return (
      <div className='super-row'>
        {superRow.map((board, superColumnIndex) => {
          let disabled = !focusedCoords ?
            false :
            (focusedCoords.superRowIndex !== superRowIndex ||
             focusedCoords.superColumnIndex !== superColumnIndex);
          return (
            <div className='board'>
              <Board
                board={board}
                complete={this.props.complete}
                disabled={disabled}
                onMove={partial(this.props.onMove, superRowIndex, superColumnIndex)}
              />
            </div>
          );
        })}
      </div>
    );
  },
});

export default SuperBoard;
