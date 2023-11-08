import type { Renderer, ProjectAnnotations } from "@storybook/types";
import type { Addon_DecoratorFunction } from '@storybook/types';
import { withBrandThemesSwitcher } from './decorators/withBrandThemesSwitcher';
import { PARAM_KEY } from './constants';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withBrandThemesSwitcher] as Addon_DecoratorFunction[],
  parameters: {
    [PARAM_KEY]: {
      brands: [
        { 
          name: 'verajohn_com',
          css: 'verajohn_com.css',
          indicator: 'red',
          useIconOnIndicator: false,
          label: 'Vera & John (COM)'
        },
        {
          name: 'yuugado_com',
          css: 'yuugado_com.css',
          indicator: 'brown',
          useIconOnIndicator: false,
          label: 'Yuugado'
        },
      ],
    },
  },
  globals: {
    [PARAM_KEY]: null as any,
  },
};

export default preview;
