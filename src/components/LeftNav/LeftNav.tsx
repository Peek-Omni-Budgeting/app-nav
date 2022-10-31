import React from 'react';

const LeftNav = (props: any) => {
  return (
    <div className='left-nav'>
      {props.children}
    </div>
  );
};

export { LeftNav };