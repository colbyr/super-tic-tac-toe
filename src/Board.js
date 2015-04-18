import React, { PropTypes } from 'react/addons';

var styles = {
  conatiner: {
    display: 'flex',
    width: 300,
  },
  cell: {
    alignItems: 'center',
    border: '1px solid #EEE',
    display: 'flex',
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  field: {
    alignSelf: 'center',
    display: 'flex',
    textAlign: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
    height: 100,
    width: 300,
  },
};

const Board = React.createClass({

  propTypes: {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired
    ).isRequired
  },

  render() {
    return (
      <div style={styles.container}>
        {this.props.board.map(this.renderRow)}
      </div>
    );
  },

  renderCell(cell, i) {
    return (
      <div
        key={`cell-${i}`}
        style={styles.cell}>
        {cell}
      </div>
    );
  },

  renderRow(row, i) {
    return (
      <div
        key={`row-${i}`}
        style={styles.row}>
        {row.map(this.renderCell)}
      </div>
    );
  },

});

export default Board;
