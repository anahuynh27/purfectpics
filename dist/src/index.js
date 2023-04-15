import React from 'react';
import { createRoot } from 'react-dom/client';
const App = () => {
    return React.createElement("div", null, "Hello World ");
};
const container = document.getElementById('root');
const root = container ? createRoot(container) : null;
if (root) {
    root.render(React.createElement(App, null));
}
