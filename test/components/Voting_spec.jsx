import React from 'react';
import ReactDom from 'react-dom';
import {renderIntoDocument,
scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import Voting from '../../src/components/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(<Voting pair={['Rambo','Dracula']} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Rambo');
    expect(buttons[1].textContent).to.equal('Dracula');
  });

  it('invokes callback when a button is clicked', () => {
    let voteEntry;
    const vote = (entry) => {voteEntry = entry};
    const component = renderIntoDocument(<Voting pair={['Rambo','Dracula']} vote={vote}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);
    expect(voteEntry).to.equal('Rambo');
  });

});
