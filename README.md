# Storybook Addon Brand Switcher

Switch to a brand specific UI

## Installation

```sh
npm i -D storybook-addon-spark-theme-switcher
```

-- or --
Since currently this is in local, you may run the following command:

In *components* directory

```sh
npm install -D --save ../addon/theme-switcher
```

## Configuration

Then, add following content to [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
export default {
  addons: ['storybook-addon-spark-theme-switcher'],
};
```
