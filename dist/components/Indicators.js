'use strict';

var theming = require('@storybook/theming');

// src/components/Indicators.tsx
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

exports.Icon = Icon;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=Indicators.js.map