import _ from 'lodash'
import {E} from './constants'

export function add(board, piece, row, col) {
  if(board[row][col] === E) {
    board[row][col] = piece;
  } else {
    console.warn('attempting to add a piece to a non empty space');
  }
}

export function winner(board) {
  var [[topLeft, topCenter, topRight],
       [midLeft, midCenter, midRight],
       [botLeft, botCenter, botRight]] = board;
  var diagRightToLeft = [topRight, midCenter, botLeft];
  var diagLeftToRight = [topLeft, midCenter, botRight];
  var topRow = [topRight, topCenter, topLeft];
  var midRow = [midRight, midCenter, midLeft];
  var botRow = [botRight, botCenter, botLeft];
  var leftCol = [topRight, midRight, botRight];
  var midCol = [topCenter, midCenter, botCenter];
  var rightCol = [topLeft, midLeft, botLeft];
  return  _.chain([diagRightToLeft, diagLeftToRight, topRow, midRow,
                    botRow, leftCol, midCol, rightCol])
           .map(_.uniq)
           .filter(array => array.length === 1 && array[0] !== E)
           .first().first()
           .value();
}
