import { PartialStoryFn, Renderer, StoryContext } from '@storybook/types';

declare const withBrandThemesSwitcher: (StoryFn: PartialStoryFn<Renderer>, context: StoryContext<Renderer>) => unknown;

export { withBrandThemesSwitcher };
