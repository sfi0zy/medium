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


## Global CSS custom properties

These custom properties will be added to `document.body` and will be updated if needed:

| Name                     | Expected values                              |
| ------------------------ | -------------------------------------------- |
| --js-window-width        | XXXpx                                        |
| --js-window-height       | XXXpx                                        |
| --js-mouse-x             | 0px ~ window width                           |
| --js-mouse-y             | 0px ~ window height                          |
| --js-mouse-cx            | -(window width / 2) ~ (window width / 2)     |
| --js-mouse-cy            | -(window height / 2) ~ (window height / 2)   |
| --js-mouse-cd            | 0 ~ (window diagonal / 2)                    |
| --js-mouse-x-normalized  | 0 ~ 1                                        |
| --js-mouse-y-normalized  | 0 ~ 1                                        |
| --js-mouse-cx-normalized | -1 at the left border, 1 at the right border |
| --js-mouse-cy-normalized | -1 at the top border, 1 at the bottom border |
| --js-mouse-cd-normalized | 0 in the center, 1 at the window corner      |
| --js-scroll-y            | XXXpx                                        |
| --js-scroll-y-normalized | 0 ~ 1, 1 at the end of the scroll            |
| --js-time-s              | 0+                                           |
| --js-time-ms             | 0+                                           |
| --js-random-0            | 0 ~ 1                                        |
| --js-random-1            | same as random-0, all the way to random-99   |


## Targets (optional)

By default, all coordinates will be calculated from the top left corner of the window and its center. We can mark a few elements with `data-medium-target` attribute to add relative coordinates to them as well:

```xml
<div data-medium-target>...</div>
```

Targets will get additional local properties:

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

They have the same logic as the global ones, but we use the target element instead of the window in our calculations.

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
