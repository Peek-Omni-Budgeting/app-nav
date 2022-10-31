import React from 'react';
// @ts-ignore
import { LeftNav, RightNav } from '@Components';
import { Logo } from '../Logo';

import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <LeftNav>
        <Logo />
      </LeftNav>

      <RightNav>
        Placeholder
      </RightNav>
    </nav>
  );
};

export { Navbar };