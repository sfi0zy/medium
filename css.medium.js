// ----------------------------------------------------------------------------
//
//  Medium
//
//  Connect CSS and JS worlds.
//
//  This tool adds CSS custom properties
//  with the current mouse position, scroll position, time, random values etc.
//
//  Author: Ivan Bogachev (@sfi0zy), 2023
//  Version: 1.0
//  License: MIT
//
// ----------------------------------------------------------------------------

export default class Medium {
    static TARGET_SELECTOR = '[data-medium-target]';
    static PRECISION = 3;

    #features;
    #targets;
    #data;

    constructor(options) {
        this.#features = {
            xy: options?.features?.xy,
            scroll: options?.features?.scroll,
            time: options?.features?.time,
            random: options?.features?.random,
        };

        this.#targets = Medium.#findTargets();

        this.#data = {
            xy: {
                window: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
            },
            time: {
                start: null,
            },
        };

        if (this.#features.random) {
            Medium.#setRandomProperties();
        }

        this.#prerunEvents();
        this.#initEventListeners();
    }

    static #findTargets() {
        return document.querySelectorAll(Medium.TARGET_SELECTOR) || [];
    }

    static #round(float) {
        return float.toFixed(Medium.PRECISION);
    }

    static #setRandomProperties() {
        for (let i = 0; i < 100; i++) {
            const value = Medium.#round(Math.random());

            document.body.style.setProperty(`--js-random-${i}`, value);
        }
    }

    #prerunEvents() {
        this.#onWindowResize();

        this.#onMouseMove({
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2,
        });

        this.#onScroll();
        this.#onNextFrame(performance.now());
    }

    #initEventListeners() {
        if (this.#features.xy) {
            window.addEventListener('resize', this.#onWindowResize.bind(this));
            document.addEventListener('mousemove', this.#onMouseMove.bind(this));
            document.addEventListener('wheel', this.#onMouseMove.bind(this));
        }

        if (this.#features.scroll) {
            document.addEventListener('scroll', this.#onScroll.bind(this));
        }
    }

    #onWindowResize() {
        if (!this.#features.xy) {
            Medium.#onWindowResizeFallback();

            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        document.body.style.setProperty('--js-window-width', `${width}px`);
        document.body.style.setProperty('--js-window-height', `${height}px`);

        this.#data.xy.window.width = width;
        this.#data.xy.window.height = height;
    }

    static #onWindowResizeFallback() {
        document.body.style.setProperty('--js-window-width', '0px');
        document.body.style.setProperty('--js-window-height', '0px');
    }

    #onMouseMove(e) {
        if (!this.#features.xy) {
            this.#onMouseMoveFallback();

            return;
        }

        const { width, height } = this.#data.xy.window;
        const x = e.clientX;
        const y = e.clientY;
        const cx = x - width / 2;
        const cy = y - height / 2;
        const cd = Math.round(Math.sqrt(cx ** 2 + cy ** 2));
        const xN = Medium.#round(x / width);
        const yN = Medium.#round(y / height);
        const cxN = Medium.#round(2 * (cx / width));
        const cyN = Medium.#round(2 * (cy / height));
        const diagonal = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
        const cdN = Medium.#round(cd / diagonal);

        document.body.style.setProperty('--js-mouse-x', `${x}px`);
        document.body.style.setProperty('--js-mouse-y', `${y}px`);
        document.body.style.setProperty('--js-mouse-cx', `${cx}px`);
        document.body.style.setProperty('--js-mouse-cy', `${cy}px`);
        document.body.style.setProperty('--js-mouse-cd', `${cd}px`);

        document.body.style.setProperty('--js-mouse-x-normalized', xN);
        document.body.style.setProperty('--js-mouse-y-normalized', yN);
        document.body.style.setProperty('--js-mouse-cx-normalized', cxN);
        document.body.style.setProperty('--js-mouse-cy-normalized', cyN);
        document.body.style.setProperty('--js-mouse-cd-normalized', cdN);

        this.#targets.forEach((target) => {
            if (!(target instanceof HTMLElement)) {
                return;
            }

            const rect = target.getBoundingClientRect();
            const tWidth = Math.round(rect.width);
            const tHeight = Math.round(rect.height);
            const xR = Math.round(e.clientX - rect.left);
            const yR = Math.round(e.clientY - rect.top);
            const cxR = Math.round(xR - rect.width / 2);
            const cyR = Math.round(yR - rect.height / 2);
            const cdR = Math.round(Math.sqrt(cxR ** 2 + cyR ** 2));
            const xRN = Medium.#round(xR / rect.width);
            const yRN = Medium.#round(yR / rect.height);
            const cxRN = Medium.#round(2 * (cxR / rect.width));
            const cyRN = Medium.#round(2 * (cyR / rect.height));
            const diagonalR = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
            const cdRN = Medium.#round(cdR / diagonalR);

            target.style.setProperty('--js-target-width', `${tWidth}px`);
            target.style.setProperty('--js-target-height', `${tHeight}px`);

            target.style.setProperty('--js-mouse-relative-x', `${xR}px`);
            target.style.setProperty('--js-mouse-relative-y', `${yR}px`);
            target.style.setProperty('--js-mouse-relative-cx', `${cxR}px`);
            target.style.setProperty('--js-mouse-relative-cy', `${cyR}px`);
            target.style.setProperty('--js-mouse-relative-cd', `${cdR}px`);

            target.style.setProperty('--js-mouse-relative-x-normalized', xRN);
            target.style.setProperty('--js-mouse-relative-y-normalized', yRN);
            target.style.setProperty('--js-mouse-relative-cx-normalized', cxRN);
            target.style.setProperty('--js-mouse-relative-cy-normalized', cyRN);
            target.style.setProperty('--js-mouse-relative-cd-normalized', cdRN);
        });
    }

    #onMouseMoveFallback() {
        document.body.style.setProperty('--js-mouse-x', '0px');
        document.body.style.setProperty('--js-mouse-y', '0px');
        document.body.style.setProperty('--js-mouse-cx', '0px');
        document.body.style.setProperty('--js-mouse-cy', '0px');
        document.body.style.setProperty('--js-mouse-cd', '0px');

        document.body.style.setProperty('--js-mouse-x-normalized', 0);
        document.body.style.setProperty('--js-mouse-y-normalized', 0);
        document.body.style.setProperty('--js-mouse-cx-normalized', 0);
        document.body.style.setProperty('--js-mouse-cy-normalized', 0);
        document.body.style.setProperty('--js-mouse-cd-normalized', 0);

        this.#targets.forEach((target) => {
            if (!(target instanceof HTMLElement)) {
                return;
            }

            target.style.setProperty('--js-target-width', '0px');
            target.style.setProperty('--js-target-height', '0px');

            target.style.setProperty('--js-mouse-relative-x', '0px');
            target.style.setProperty('--js-mouse-relative-y', '0px');
            target.style.setProperty('--js-mouse-relative-cx', '0px');
            target.style.setProperty('--js-mouse-relative-cy', '0px');
            target.style.setProperty('--js-mouse-relative-cd', '0px');

            target.style.setProperty('--js-mouse-relative-x-normalized', 0);
            target.style.setProperty('--js-mouse-relative-y-normalized', 0);
            target.style.setProperty('--js-mouse-relative-cx-normalized', 0);
            target.style.setProperty('--js-mouse-relative-cy-normalized', 0);
            target.style.setProperty('--js-mouse-relative-cd-normalized', 0);
        });
    }

    #onScroll() {
        if (!this.#features.scroll) {
            Medium.#onScrollFallback();

            return;
        }

        const { scrollY, innerHeight } = window;

        const fullHeight = Math.max(
            document.body.offsetHeight - innerHeight,
            innerHeight,
        );

        const scrollYN = Medium.#round(scrollY / fullHeight);

        document.body.style.setProperty('--js-scroll-y', `${scrollY}px`);
        document.body.style.setProperty('--js-scroll-y-normalized', scrollYN);
    }

    static #onScrollFallback() {
        document.body.style.setProperty('--js-scroll-y', '0px');
        document.body.style.setProperty('--js-scroll-y-normalized', 0);
    }

    #onNextFrame(now) {
        if (!this.#features.time) {
            Medium.#onNextFrameFallback();

            return;
        }

        if (!this.#data.time.start) {
            this.#data.time.start = now;
        }

        const timeMS = Math.round(now - this.#data.time.start);
        const timeS = Medium.#round(timeMS / 1000);

        document.body.style.setProperty('--js-time-ms', timeMS);
        document.body.style.setProperty('--js-time-s', timeS);

        requestAnimationFrame(this.#onNextFrame.bind(this));
    }

    static #onNextFrameFallback() {
        document.body.style.setProperty('--js-time-ms', 0);
        document.body.style.setProperty('--js-time-s', 0);
    }

    update() {
        this.#targets = Medium.#findTargets();
    }
}
