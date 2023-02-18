![](./logo.png)

# Medium

Connect CSS and JS worlds.

This tool adds CSS custom properties with the current mouse position, scroll position, time, random values etc.


## NPM

```sh
npm install css.medium.js
```


## CDN

```javascript
import Medium from 'https://unpkg.com/css.medium.js@1.0.0/css.medium.js';
```


## Usage

### JS

```javascript
import Medium from 'css.medium.js';

const medium = new Medium({
    // All features are disabled by default
    features: {
        xy: true,
        scroll: true,
        time: true,
        random: true,
    },
});
```


### CSS

```css
#scroll-indicator {
    transform: scaleX(var(--js-scroll-y-normalized));
}

#cursor {
    transform:
        translateX(var(--js-mouse-x))
        translateY(var(--js-mouse-y));
}

#target {
    transform:
        perspective(10rem)
        rotateY(calc(1deg * var(--js-mouse-relative-cx-normalized)))
        rotateX(calc(-1deg * var(--js-mouse-relative-cy-normalized)));
}
```


## Live example

See live example of how it works:

https://sfi0zy.github.io/medium/

More examples on CodePen:

https://codepen.io/collection/wamGwK


## Global CSS custom properties

These custom properties will be added to `document.body` and will be updated if needed:

### Feature: xy

| Name                     | Expected values                                     |
| ------------------------ | --------------------------------------------------- |
| --js-window-width        | from 0px to a few thousand px                       |
| --js-window-height       | from 0px to a few thousand px                       |
| --js-mouse-x             | from 0px to window width                            |
| --js-mouse-y             | from 0px to window height                           |
| --js-mouse-cx            | from -(window width / 2) to (window width / 2)      |
| --js-mouse-cy            | from -(window height / 2) to (window height / 2)    |
| --js-mouse-cd            | from 0px to (window diagonal / 2)                   |
| --js-mouse-x-normalized  | from 0 to 1                                         |
| --js-mouse-y-normalized  | from 0 to 1                                         |
| --js-mouse-cx-normalized | from -1 at the left border to 1 at the right border |
| --js-mouse-cy-normalized | from -1 at the top border to 1 at the bottom border |
| --js-mouse-cd-normalized | from 0 in the center to 1 at the window corner      |


### Feature: scroll

| Name                     | Expected values                                     |
| ------------------------ | --------------------------------------------------- |
| --js-scroll-y            | from 0px to a few thousand px                       |
| --js-scroll-y-normalized | from 0 to 1 at the end of the scroll                |


### Feature: time

| Name                     | Expected values                                     |
| ------------------------ | --------------------------------------------------- |
| --js-time-s              | from 0 to Infinity                                  |
| --js-time-ms             | from 0 to Infinity                                  |


### Feature: random

| Name                     | Expected values                                     |
| ------------------------ | --------------------------------------------------- |
| --js-random-0            | from 0 to 1                                         |
| --js-random-1            | same as random-0, all the way to random-99          |


## Targets (optional)

By default, all coordinates will be calculated from the top left corner of the window and its center. We can mark a few elements with `data-medium-target` attribute to add relative coordinates to them as well:

```xml
<div data-medium-target>...</div>
```

Targets will get additional local properties for `xy` feature:

| Name                              |
| --------------------------------- |
| --js-target-width                 |
| --js-target-height                |
| --js-mouse-relative-x             |
| --js-mouse-relative-y             |
| --js-mouse-relative-cx            |
| --js-mouse-relative-cy            |
| --js-mouse-relative-cd            |
| --js-mouse-relative-x-normalized  |
| --js-mouse-relative-y-normalized  |
| --js-mouse-relative-cx-normalized |
| --js-mouse-relative-cy-normalized |
| --js-mouse-relative-cd-normalized |


They have almost the same logic as the global CSS custom properties, but we use the target element instead of the window in our calculations.

*Note: since target elements can be smaller than the viewport, the coordinates of the mouse can be outside of them sometimes. Because of that, normalized values for target elements aren't limited to the range from 0 to 1 or from -1 to 1. They are fitted to have values of 0 or 1 on the targets borders with the same logic as the global ones and the window borders. We can clamp() these values in CSS if it's required.*

To activate more target elements later we can use the `update` method:

```javascript
medium.update();
```


## Development

```sh
git clone git@github.com:sfi0zy/medium.git
cd medium
make install # install local npm packages
make watch # work with browser-sync (you'll need inotifywatch)
make check # run eslint in console
make clean # delete installed packages if you don't need them anymore
```


## License

MIT License

Copyright (c) 2023 Ivan Bogachev
