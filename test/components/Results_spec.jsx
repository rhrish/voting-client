import React from 'react';
import ReactDom from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {expect} from 'chai';

import Results from '../../src/components/Results';

describe('Results', () => {
  it('displays vote entries with number of votes or zero', () => {
    const pair = List.of('Rambo', 'Dracula');
    const tally = Map({'Rambo':6});

    const component = renderIntoDocument(<Results pair={pair} tally={tally} />);
    const [rambo, dracula] = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [ramboVotes,draculaVotes] = scryRenderedDOMComponentsWithClass(component, 'votes');

    expect(rambo.textContent).to.contain('Rambo');
    expect(ramboVotes.textContent).to.contain('6');

    expect(dracula.textContent).to.contain('Dracula');
    expect(draculaVotes.textContent).to.contain('0');
  });

  it('invokes next callback when next button is clicked', () => {
    const pair = List.of('Rambo', 'Dracula');
    const tally = Map({'Rambo':6});
    let nextClicked = false;
    const next = () => {nextClicked=true};
    const component = renderIntoDocument(<Results pair={pair} tally={tally} next={next}/>);
    Simulate.click(ReactDom.findDOMNode(component.refs.next));

    expect(nextClicked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const pair = List.of('Rambo', 'Dracula');
    const tally = Map({});

    const component = renderIntoDocument(<Results pair={pair} tally={tally} winner='Rambo'/>);
    const winner = ReactDom.findDOMNode(component.refs.winner);

    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Rambo');

  });

});
