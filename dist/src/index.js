"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App = () => {
    return react_1.default.createElement("div", null, "Hello World ");
};
const container = document.getElementById('root');
const root = container ? (0, client_1.createRoot)(container) : null;
if (root) {
    root.render(react_1.default.createElement(App, null));
}
