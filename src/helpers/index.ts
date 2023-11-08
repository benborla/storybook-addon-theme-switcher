import { global } from '@storybook/global';
import type { Brand } from '../types';

const { document } = global;

export const getBrandByName = (
  currentSelectedValue: string,
  brands: Brand[] = [],
  defaultName?: string
): Brand | null => {
  return getBrand(brands, (currentSelectedValue ?? defaultName)) || null;
};

export const getBrand = (brands: Brand[], key: string): Brand | null => (
  brands.find((brand: Brand) => brand.name === key)
)

export const attachThemeStyle = (selector: string, css: string, storyId: string) => {
  const styling = document.getElementById(selector) as HTMLStyleElement;

  if (styling) {
    // @INFO: this makes the switching of theme reactive
    styling.parentNode.removeChild(styling);
  }

  // @INFO: re-attach the <style> element
  const style = document.createElement('style') as HTMLStyleElement;
  style.setAttribute('id', selector);
  style.setAttribute('data-addon', 'theme-switcher');
  style.setAttribute('data-author', 'spark');
  style.setAttribute('data-storyId', storyId);
  style.innerHTML = css;

  document.head.appendChild(style);
};
