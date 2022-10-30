import * as ReactDOM from 'react-dom/client';
import React from 'react';
import singleSpaReact from 'single-spa-react';

import App from "./App";

const lifecycles = singleSpaReact({
  React,
  // @ts-ignore
  ReactDOM,
  rootComponent: App,
  errorBoundary(err) {
    const { message } = err;

    return React.createElement(
      'div', {}, message,
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
