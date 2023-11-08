import React, { Fragment } from 'react';
import { addons, types } from '@storybook/manager-api';

import { ADDON_ID } from './constants';
import { ThemeSelector } from './components/ThemeSelector';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Theme Switcher',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => (
      <Fragment>
        <ThemeSelector />
      </Fragment>
    ),
  });
});
