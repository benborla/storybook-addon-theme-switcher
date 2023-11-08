import { useMemo, useEffect } from '@storybook/preview-api';
import type { Renderer, PartialStoryFn as StoryFunction, StoryContext } from '@storybook/types';
import { PARAM_KEY as THEMES_PARAM_KEY } from '../constants';
import {
  attachThemeStyle,
  getBrandByName,
  getBrand,
} from '../helpers';
import type { Brand } from '../types';

const renderErrorDoc = (theme: string, brands: Brand[]) => (`
  <div>
    <h1 style='color: red'>Could not find theme: ${theme}</h1>
    <p>Available brands in configuration:</p>
    <ul>${brands.map((brand: Brand) => `<li>${brand?.name}</li>`).join('')}
    </ul>
  </div>
`);

export const withBrandThemesSwitcher = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const { globals, parameters } = context;
  // @INFO: capture global theme.brand value
  const brandsConfig = parameters[THEMES_PARAM_KEY];
  const globalsThemeSelectedBrand = globals[THEMES_PARAM_KEY]?.brand || brandsConfig?.default;
  const brandExists = getBrand(brandsConfig.brands, globalsThemeSelectedBrand);

  if (typeof brandExists === 'undefined') {
    return renderErrorDoc(globalsThemeSelectedBrand, brandsConfig.brands);
  }

  const selectedBrandTheme = useMemo<Brand>(() => (
    getBrandByName(
      globalsThemeSelectedBrand,
      brandsConfig.brands,
      brandsConfig.default
    )
  ), [brandsConfig, globalsThemeSelectedBrand]);

  const isActive = useMemo<boolean>(
    () => selectedBrandTheme.name && (typeof selectedBrandTheme.name !== 'undefined'),
    [selectedBrandTheme]
  );

  const selector =
    context.viewMode === 'docs' ? `#anchor--${context.id} .docs-story` : '.sb-show-main';

  const brandThemeStyle = useMemo<string>(() => {
    // INFO: apply css file as style 
    const brandCssValue = selectedBrandTheme?.css

    return `
      /** Spark Tokens **/
      @import url("${brandCssValue}");
    `;
  }, [selectedBrandTheme, selector]);

  useEffect(() => {
    const selectorId =
      context.viewMode === 'docs'
        ? `addon-theme-switcher-docs-${context.id}`
        : `addon-theme-switcher-color`;

    attachThemeStyle(
      selectorId,
      brandThemeStyle,
      context.viewMode === 'docs' ? context.id : null
    );
  }, [isActive, brandThemeStyle, context]);

  return StoryFn();
};
