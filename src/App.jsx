import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useAuthRouter from './routes/Routing';

function App() {
  const router = useAuthRouter(); // Get the dynamic router
  return <RouterProvider router={router} />;
}

export default App;
