import React from 'react';
import ReactDom from 'react-dom';
import {renderIntoDocument,
scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import {Voting} from '../../src/components/Voting';
import {List} from 'immutable';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(<Voting pair={['Rambo','Dracula']} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.contain('Rambo');
    expect(buttons[1].textContent).to.contain('Dracula');
  });

  it('invokes callback when a button is clicked', () => {
    let voteEntry;
    const vote = (entry) => {voteEntry = entry};
    const component = renderIntoDocument(<Voting pair={['Rambo','Dracula']} vote={vote}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);
    expect(voteEntry).to.equal('Rambo');
  });

  it('disables buttons when user has voted',() => {
    const component = renderIntoDocument(<Voting pair={['Rambo','Dracula']} hasVoted='Rambo' />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(<Voting pair={['Rambo','Dracula']} hasVoted='Rambo'/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('just renders winner when there is one', () => {
    const component = renderIntoDocument(<Voting winner='Rambo'/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);

    const winner = ReactDom.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Rambo')
  });

  it('renders as a pure component', () => {
    const pair = ['Rambo', 'Dracula'];
    const container = document.createElement('div');
    let component = ReactDom.render(<Voting pair={pair} />, container);

    let buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Rambo');

    pair[0] = 'Sunshine'
    component = ReactDom.render(<Voting pair={pair} />, container);
    buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Rambo');
  });

  it('does update the DOM when prop changes', () => {
    const pair = List.of('Rambo','Dracula');
    const container = document.createElement('div');
    let component = ReactDom.render(<Voting pair={pair} />, container);

    let buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Rambo');

    const newPair = pair.set(0, 'Sunshine')
    component = ReactDom.render(<Voting pair={newPair} />, container);
    buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Sunshine');


  });

});
