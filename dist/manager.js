'use strict';

var React = require('react');
var managerApi = require('@storybook/manager-api');
var memoize = require('memoizerific');
var components = require('@storybook/components');
var theming = require('@storybook/theming');
require('@storybook/global');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var memoize__default = /*#__PURE__*/_interopDefault(memoize);

// src/manager.tsx

// src/constants.ts
var ADDON_ID = "storybook/theme-switcher";
var PARAM_KEY = "themes";
var Icon = theming.styled.span(
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
var createBrandSelectorItem = memoize__default.default(1e3)(
  (id, name, label, css, indicator, change, active, useIconOnIndicator) => ({
    id: id || name,
    //@INFO: set item to uppercase
    title: label,
    onClick: () => {
      change({ selected: name, name });
    },
    css,
    right: /* @__PURE__ */ React__default.default.createElement(Icon, { indicator, useIcon: useIconOnIndicator }),
    active
  })
);
var getDisplayedItems = memoize__default.default(10)(
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
var ThemeSelector = React.memo(function BackgroundSelector() {
  const brandsConfig = managerApi.useParameter(
    PARAM_KEY,
    DEFAULT_BRAND_CONFIG
  );
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);
  const [globals, updateGlobals] = managerApi.useGlobals();
  const globalsTheme = globals[PARAM_KEY]?.brand;
  const defaultBrand = getBrand(brandsConfig.brands, brandsConfig.default);
  const selectedBrand = React.useMemo(() => {
    return getBrandByName(
      globalsTheme,
      brandsConfig.brands,
      brandsConfig.default
    );
  }, [brandsConfig, globalsTheme]);
  const themeLabel = selectedBrand?.label || defaultBrand?.label;
  const onBrandChange = React.useCallback(
    (brand) => {
      updateGlobals({ [PARAM_KEY]: { brand } });
    },
    [brandsConfig, globals, updateGlobals]
  );
  if (brandsConfig.disable) {
    return null;
  }
  return /* @__PURE__ */ React__default.default.createElement(React.Fragment, null, /* @__PURE__ */ React__default.default.createElement(
    components.WithTooltip,
    {
      placement: "top",
      closeOnOutsideClick: true,
      tooltip: ({ onHide }) => {
        return /* @__PURE__ */ React__default.default.createElement(
          components.TooltipLinkList,
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
    /* @__PURE__ */ React__default.default.createElement(
      components.IconButton,
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
managerApi.addons.register(ADDON_ID, () => {
  managerApi.addons.add(ADDON_ID, {
    title: "Theme Switcher",
    type: managerApi.types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => /* @__PURE__ */ React__default.default.createElement(React.Fragment, null, /* @__PURE__ */ React__default.default.createElement(ThemeSelector, null))
  });
});
//# sourceMappingURL=out.js.map
//# sourceMappingURL=manager.js.map