import App from './landing.github.js';

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { render, screen } from '@testing-library/react';

test('renders the landing page', () => {
  render(< App />)
});