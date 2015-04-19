import { E,X,O } from './constants.js';
import { winner } from './matrix_functions.js';
import { merge, partial } from 'lodash';
import React, { PropTypes } from 'react/addons';
import classNames from 'classnames';

const Board = React.createClass({

  propTypes: {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired
    ).isRequired,
    disabled: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      disabled: false,
    };
  },

  getIsActive() {
    return !this.props.disabled && !winner(this.props.board);
  },

  render() {
    debugger;
    let won = winner(this.props.board);
    let classes = classNames({inactive: !this.getIsActive()},
                             {wonx: won === X},
                             {wono: won === O});
    return (
      <div className={classes} >
        {this.props.board.map(this.renderRow)}
      </div>
    );
  },

  renderRow(row, rowIndex) {
    return (
      <div
        key={`row-${rowIndex}`}
        className='row'>
        {row.map((value, columnIndex) => {
          let isEmpty = value === E;
          let isClickable = isEmpty && this.getIsActive();
          return (
            <div
              key={`cell-${columnIndex}`}
              onClick={isClickable ? partial(this.props.onMove, rowIndex, columnIndex) : null}
              className='cell'
              style={{
                cursor: isClickable ? 'pointer' : 'default'
              }}>
              {isEmpty ? '' : value}
            </div>
          );
        })}
      </div>
    );
  },

});

export default Board;
