import { Dispatcher } from 'flux';
import { DispatcherInstance } from 'general-store';
import React from 'react/addons';
import ReactRouter from 'react-router';
import Routes from './Routes';

var dispatcher = new Dispatcher();
var rootNode = document.getElementById('root');

DispatcherInstance.set(dispatcher);

ReactRouter.run(Routes, Handler => {
  React.render(<Handler />, rootNode);
});

module.exports = {
  dispatcher: dispatcher,
  rootNode: rootNode
};

