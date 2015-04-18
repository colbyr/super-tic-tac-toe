import _ from 'lodash'
import {EMPTY_SPACE} from './constants'

export function add(board, piece, row, col) {
  board[row][col] = piece;
}

export function winner(board) {
  var [[topRight, topCenter, topLeft],
       [midRight, midCenter, midLeft],
       [botRight, botCenter, botLeft]] = board;
  var diagRightToLeft = [topRight, midCenter, botLeft];
  var diagLeftToRight = [topRight, midCenter, botLeft];
  var topRow = [topRight, topCenter, topLeft];
  var midRow = [midRight, midCenter, midLeft];
  var botRow = [botRight, botCenter, botLeft];
  var leftCol = [topRight, midRight, botRight];
  var midCol = [topCenter, midCenter, botCenter];
  var rightCol = [topLeft, midLeft, botLeft];
  return  _.chain([diagRightToLeft, diagLeftToRight, topRow, midRow,
                    botRow, leftCol, midCol, rightCol])
           .map(_.uniq)
           .filter(array => array.length === 1 && array[0] !== EMPTY_SPACE)
           .first().first()
           .value();
}
