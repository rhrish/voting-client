import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Rambo','Dracula');
const tally = Map({
  'Rambo': 5,
  'Dracula': 3
});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {pair: pair, tally: tally})
  }
});
