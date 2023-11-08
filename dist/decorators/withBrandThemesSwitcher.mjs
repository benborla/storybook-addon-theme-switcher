import { useMemo, useEffect } from '@storybook/preview-api';
import { global } from '@storybook/global';

// src/decorators/withBrandThemesSwitcher.ts
var PARAM_KEY = "themes";
var { document } = global;
var getBrandByName = (currentSelectedValue, brands = [], defaultName) => {
  return getBrand(brands, currentSelectedValue ?? defaultName) || null;
};
var getBrand = (brands, key) => brands.find((brand) => brand.name === key);
var attachThemeStyle = (selector, css, storyId) => {
  const styling = document.getElementById(selector);
  if (styling) {
    styling.parentNode.removeChild(styling);
  }
  const style = document.createElement("style");
  style.setAttribute("id", selector);
  style.setAttribute("data-addon", "theme-switcher");
  style.setAttribute("data-author", "spark");
  style.setAttribute("data-storyId", storyId);
  style.innerHTML = css;
  document.head.appendChild(style);
};

// src/decorators/withBrandThemesSwitcher.ts
var renderErrorDoc = (theme, brands) => `
  <div>
    <h1 style='color: red'>Could not find theme: ${theme}</h1>
    <p>Available brands in configuration:</p>
    <ul>${brands.map((brand) => `<li>${brand?.name}</li>`).join("")}
    </ul>
  </div>
`;
var withBrandThemesSwitcher = (StoryFn, context) => {
  const { globals, parameters } = context;
  const brandsConfig = parameters[PARAM_KEY];
  const globalsThemeSelectedBrand = globals[PARAM_KEY]?.brand || brandsConfig?.default;
  const brandExists = getBrand(brandsConfig.brands, globalsThemeSelectedBrand);
  if (typeof brandExists === "undefined") {
    return renderErrorDoc(globalsThemeSelectedBrand, brandsConfig.brands);
  }
  const selectedBrandTheme = useMemo(() => getBrandByName(
    globalsThemeSelectedBrand,
    brandsConfig.brands,
    brandsConfig.default
  ), [brandsConfig, globalsThemeSelectedBrand]);
  const isActive = useMemo(
    () => selectedBrandTheme.name && typeof selectedBrandTheme.name !== "undefined",
    [selectedBrandTheme]
  );
  const selector = context.viewMode === "docs" ? `#anchor--${context.id} .docs-story` : ".sb-show-main";
  const brandThemeStyle = useMemo(() => {
    const brandCssValue = selectedBrandTheme?.css;
    return `
      /** Spark Tokens **/
      @import url("${brandCssValue}");
    `;
  }, [selectedBrandTheme, selector]);
  useEffect(() => {
    const selectorId = context.viewMode === "docs" ? `addon-theme-switcher-docs-${context.id}` : `addon-theme-switcher-color`;
    attachThemeStyle(
      selectorId,
      brandThemeStyle,
      context.viewMode === "docs" ? context.id : null
    );
  }, [isActive, brandThemeStyle, context]);
  return StoryFn();
};

export { withBrandThemesSwitcher };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=withBrandThemesSwitcher.mjs.map