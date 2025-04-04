import React from 'react';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className=''>
      
      <Outlet className=''/>       
    </div>
  );
}

export default Home;
