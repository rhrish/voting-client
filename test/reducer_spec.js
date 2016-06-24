import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Rambo','Dracula'),
          tally: Map({'Rambo': 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Rambo','Dracula'],
        tally: {
          'Rambo': 1
        }
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Rambo','Dracula'],
          tally: {'Rambo':1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Rambo', "Dracula"],
        tally: {'Rambo': 1}
      }
    }));
  });

  it('handles SET_STATE with an undefined initial state',() => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Rambo','Dracula'],
          tally: {'Rambo':1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Rambo', "Dracula"],
        tally: {'Rambo': 1}
      }
    }));

  });

});
