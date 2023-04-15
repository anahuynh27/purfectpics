import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <div>Hello World </div>;
};

const container = document.getElementById('root');
const root = container ? createRoot(container): null
if (root) {
  root.render(<App/>);
}

