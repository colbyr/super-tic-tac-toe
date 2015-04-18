jest.dontMock('../matrix_functions');
jest.dontMock('lodash');
import * as Matrix from '../matrix_functions';
import {X,O,E} from '../constants';

describe('Matrix',() => {
  it('exports add and winner', () => {
    expect(typeof Matrix.add).toEqual('function');
    expect(typeof Matrix.winner).toEqual('function');
  });
});

describe('add',() => {
  var testBoard;
  beforeEach(() => {
    testBoard = [[X,E,X],
                 [E,O,O],
                 [X,O,E]];
  });

  it('adds the correct piece in the right place to the board', () => {
    Matrix.add(testBoard,X,1,0);
    expect(testBoard).toEqual( [[X,E,X],
                                [X,O,O],
                                [X,O,E]]);
  });

  it('adds the correct piece in the right place to the board a second time', () => {
    Matrix.add(testBoard,O,0,1);
    expect(testBoard).toEqual( [[X,O,X],
                                [E,O,O],
                                [X,O,E]]);
  });

  it('wont add to a non empty space', () => {
    Matrix.add(testBoard,O,1,2);
    expect(testBoard).toEqual( [[X,E,X],
                                [E,O,O],
                                [X,O,E]]);
  });
});

describe('winner', () => {
  it('detects a top row victory', () => {
    var board = [[X,X,X],
                 [E,O,O],
                 [X,O,E]];
    expect(Matrix.winner(board)).toEqual(X);
  });

  it('detects a mid row victory', () => {
    var board = [[E,X,X],
                 [O,O,O],
                 [X,O,E]];
    expect(Matrix.winner(board)).toEqual(O);
  });

  it('detects a bot row victory', () => {
    var board = [[E,X,X],
                 [O,O,E],
                 [O,O,O]];
    expect(Matrix.winner(board)).toEqual(O);
  });

  it('detects a left col victory', () => {
    var board = [[O,X,X],
                 [O,O,E],
                 [O,E,O]];
    expect(Matrix.winner(board)).toEqual(O);
  });

  it('detects a mid col victory', () => {
    var board = [[O,X,X],
                 [E,X,E],
                 [O,X,O]];
    expect(Matrix.winner(board)).toEqual(X);
  });

  it('detects a right col victory', () => {
    var board = [[O,X,X],
                 [E,E,X],
                 [O,X,X]];
    expect(Matrix.winner(board)).toEqual(X);
  });

  it('detects a left to right diagonal victory', () => {
    var board = [[O,X,X],
                 [E,O,X],
                 [O,X,O]];
    expect(Matrix.winner(board)).toEqual(O);
  });

  it('detects a right to left diagonal victory', () => {
    var board = [[O,O,X],
                 [E,X,X],
                 [X,X,O]];
    expect(Matrix.winner(board)).toEqual(X);
  });

  it('doesnt detect E wins', () => {
    var board = [[O,O,X],
                 [E,E,E],
                 [X,X,O]];
    expect(Matrix.winner(board)).toEqual(undefined);
  });
});
