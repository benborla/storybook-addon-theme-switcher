import { global } from '@storybook/global';

// src/helpers/index.ts
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

export { attachThemeStyle, getBrand, getBrandByName };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map