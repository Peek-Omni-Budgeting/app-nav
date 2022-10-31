import React from 'react';

import './RightNav.scss';

const RightNav = (props: any) => {
  return (
    <div className='right-nav'>
      {props.children}
    </div>
  );
};

export { RightNav };