import React from 'react';
import { render } from '@testing-library/react';

import MockComponent from '.';

it('renders without crashing', () => {
  render(<MockComponent />);
});