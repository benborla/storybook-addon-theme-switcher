import React, {
  useState,
  Fragment,
  useCallback,
  useMemo,
  memo,
  type FC
} from 'react';
import memoize from 'memoizerific';

import { useParameter, useGlobals } from '@storybook/manager-api';
import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';

import { PARAM_KEY as THEMES_PARAM_KEY } from '../constants';
import { Icon } from './Indicators';
import type {
  BrandSelectorItem,
  Brand,
  BrandsParameter,
  GlobalState,
} from '../types';
import { getBrandByName, getBrand } from '../helpers';

const createBrandSelectorItem = memoize(1000)(
  (
    id: string,
    name: string,
    label: string,
    css: string,
    indicator: string | 'black',
    change: (arg: { selected: string; name: string }) => void,
    active: boolean,
    useIconOnIndicator
  ): BrandSelectorItem => ({
    id: id || name,
    //@INFO: set item to uppercase
    title: label,
    onClick: () => {
      change({ selected: name, name });
    },
    css,
    right: <Icon indicator={indicator} useIcon={useIconOnIndicator} />,
    active,
  })
);

const getDisplayedItems = memoize(10)(
  (
    brands: Brand[],
    selectedBrand: Brand,
    change: (arg: { selected: string; name: string }) => void
  ) => brands.map(({ name, label, css, indicator, useIconOnIndicator }) =>
    createBrandSelectorItem(
      `id-${name}`,
      name,
      label,
      css,
      indicator,
      change,
      name === selectedBrand?.name,
      useIconOnIndicator
    )
  )
);

const DEFAULT_BRAND_CONFIG: BrandsParameter = {
  default: null,
  disable: true,
  brands: [],
};

export const ThemeSelector: FC = memo(function BackgroundSelector() {
  const brandsConfig = useParameter<BrandsParameter>(
    THEMES_PARAM_KEY,
    DEFAULT_BRAND_CONFIG
  );

  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [globals, updateGlobals] = useGlobals();

  const globalsTheme = globals[THEMES_PARAM_KEY]?.brand;
  const defaultBrand = getBrand(brandsConfig.brands, brandsConfig.default)

  const selectedBrand = useMemo<Brand>(() => {
    return getBrandByName(
      globalsTheme,
      brandsConfig.brands,
      brandsConfig.default
    );
  }, [brandsConfig, globalsTheme]);

  const themeLabel = selectedBrand?.label || defaultBrand?.label

  const onBrandChange = useCallback(
    (brand: string) => {
      // INFO: Update Storybook URL global value
      updateGlobals({ [THEMES_PARAM_KEY]: { brand } });
    },
    [brandsConfig, globals, updateGlobals]
  );

  if (brandsConfig.disable) {
    return null;
  }

  return (
    <Fragment>
      <WithTooltip
        placement="top"
        closeOnOutsideClick
        tooltip={({ onHide }) => {
          return (
            <TooltipLinkList
              links={getDisplayedItems(
                brandsConfig.brands,
                selectedBrand,
                ({ selected }: GlobalState) => {
                  if (selectedBrand?.name !== selected) {
                    onBrandChange(selected);
                  }
                  onHide();
                }
              )}
            />
          );
        }}
        onVisibleChange={setIsTooltipVisible}
      >
        <IconButton
          key="theme"
          title="Change the theme of the preview"
          active={selectedBrand?.name !== '' || isTooltipVisible}
        >
          {`Theme: ${themeLabel}`}
        </IconButton>
      </WithTooltip>
    </Fragment>
  );
});
