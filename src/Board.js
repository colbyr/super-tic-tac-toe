import { partial } from 'lodash';
import React, { PropTypes } from 'react/addons';

var styles = {
  conatiner: {
    display: 'flex',
    width: 240,
  },
  cell: {
    alignItems: 'center',
    border: '1px solid #EEE',
    display: 'flex',
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  field: {
    alignSelf: 'center',
    display: 'flex',
    textAlign: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
    height: 80,
    width: 240,
  },
};

const Board = React.createClass({

  propTypes: {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired
    ).isRequired,
    onMove: PropTypes.func.isRequired,
  },

  render() {
    return (
      <div style={styles.container}>
        {this.props.board.map(this.renderRow)}
      </div>
    );
  },

  renderRow(row, rowIndex) {
    return (
      <div
        key={`row-${rowIndex}`}
        style={styles.row}>
        {row.map((value, columnIndex) => {
          return (
            <div
              key={`cell-${columnIndex}`}
              onClick={partial(this.props.onMove, rowIndex, columnIndex)}
              style={styles.cell}>
              {value}
            </div>
          );
        })}
      </div>
    );
  },

});

export default Board;
