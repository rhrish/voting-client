import React from 'react';
import ReactDom from 'react-dom';
import Voting from './components/Voting';

const pair = ['Rambo','Sunshine'];
ReactDom.render(<Voting pair={pair}/>,document.getElementById('app'));
