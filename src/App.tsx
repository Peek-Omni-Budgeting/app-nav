import React from 'react';

import './App.scss';
// @ts-ignore
import { Navbar } from '@Components';

// Temp placeholder till implement auth
const user: any = {};

const App = (props: any) => {
  return (
    <div className='app-nav-123456'>
      <Navbar />
    </div>
  );
};

export default App;