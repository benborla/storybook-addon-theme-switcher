import React, { memo, useState, useMemo, useCallback, Fragment } from 'react';
import { useParameter, useGlobals, addons, types } from '@storybook/manager-api';
import memoize from 'memoizerific';
import { WithTooltip, TooltipLinkList, IconButton } from '@storybook/components';
import { styled } from '@storybook/theming';
import '@storybook/global';

// src/manager.tsx

// src/constants.ts
var ADDON_ID = "storybook/theme-switcher";
var PARAM_KEY = "themes";
var Icon = styled.span(
  ({ indicator, useIcon }) => ({
    borderRadius: "100%",
    display: "block",
    height: "36px",
    width: "36px",
    background: useIcon ? "none" : indicator,
    backgroundImage: useIcon ? `url(${indicator})` : "none",
    backgroundSize: "100%"
  })
);
var getBrandByName = (currentSelectedValue, brands = [], defaultName) => {
  return getBrand(brands, currentSelectedValue ?? defaultName) || null;
};
var getBrand = (brands, key) => brands.find((brand) => brand.name === key);

// src/components/ThemeSelector.tsx
var createBrandSelectorItem = memoize(1e3)(
  (id, name, label, css, indicator, change, active, useIconOnIndicator) => ({
    id: id || name,
    //@INFO: set item to uppercase
    title: label,
    onClick: () => {
      change({ selected: name, name });
    },
    css,
    right: /* @__PURE__ */ React.createElement(Icon, { indicator, useIcon: useIconOnIndicator }),
    active
  })
);
var getDisplayedItems = memoize(10)(
  (brands, selectedBrand, change) => brands.map(
    ({ name, label, css, indicator, useIconOnIndicator }) => createBrandSelectorItem(
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
var DEFAULT_BRAND_CONFIG = {
  default: null,
  disable: true,
  brands: []
};
var ThemeSelector = memo(function BackgroundSelector() {
  const brandsConfig = useParameter(
    PARAM_KEY,
    DEFAULT_BRAND_CONFIG
  );
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [globals, updateGlobals] = useGlobals();
  const globalsTheme = globals[PARAM_KEY]?.brand;
  const defaultBrand = getBrand(brandsConfig.brands, brandsConfig.default);
  const selectedBrand = useMemo(() => {
    return getBrandByName(
      globalsTheme,
      brandsConfig.brands,
      brandsConfig.default
    );
  }, [brandsConfig, globalsTheme]);
  const themeLabel = selectedBrand?.label || defaultBrand?.label;
  const onBrandChange = useCallback(
    (brand) => {
      updateGlobals({ [PARAM_KEY]: { brand } });
    },
    [brandsConfig, globals, updateGlobals]
  );
  if (brandsConfig.disable) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(
    WithTooltip,
    {
      placement: "top",
      closeOnOutsideClick: true,
      tooltip: ({ onHide }) => {
        return /* @__PURE__ */ React.createElement(
          TooltipLinkList,
          {
            links: getDisplayedItems(
              brandsConfig.brands,
              selectedBrand,
              ({ selected }) => {
                if (selectedBrand?.name !== selected) {
                  onBrandChange(selected);
                }
                onHide();
              }
            )
          }
        );
      },
      onVisibleChange: setIsTooltipVisible
    },
    /* @__PURE__ */ React.createElement(
      IconButton,
      {
        key: "theme",
        title: "Change the theme of the preview",
        active: selectedBrand?.name !== "" || isTooltipVisible
      },
      `Theme: ${themeLabel}`
    )
  ));
});

// src/manager.tsx
addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: "Theme Switcher",
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(ThemeSelector, null))
  });
});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=manager.mjs.map