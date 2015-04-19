import { E } from './constants.js';
import { winner } from './matrix_functions.js';
import { merge, partial } from 'lodash';
import React, { PropTypes } from 'react/addons';
import classNames from 'classnames';

var styles = {
};

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
    let classes = classNames({inactive: !this.getIsActive()});
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
          return (
            <div
              key={`cell-${columnIndex}`}
              onClick={(isEmpty && this.getIsActive()) ? partial(this.props.onMove, rowIndex, columnIndex) : null}
              className='cell'>
              {isEmpty ? '' : value}
            </div>
          );
        })}
      </div>
    );
  },

});

export default Board;
