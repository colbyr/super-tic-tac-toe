import React from 'react/addons';
import ReactRouter from 'react-router';
import Routes from './Routes';

var rootNode = document.getElementById('root');

ReactRouter.run(Routes, Handler => {
  React.render(<Handler />, rootNode);
});

module.exports = {
  rootNode: rootNode
};

