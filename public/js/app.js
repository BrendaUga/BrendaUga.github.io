window.onload = function () {

  window.addEventListener('resize', function(event) {
    checkIfParallaxNeeded();
  });

  checkIfParallaxNeeded();
};

var checkIfParallaxNeeded = function() {

  if (window.matchMedia("(min-width: 920px)").matches) {

    var CHECK_PADDING = 20;
    var windowHeight = window.innerHeight;
    var windowY = window.scrollY;
    var animations = [
        {
            selector: '.project-letter',
            range: [400, -100],  // [min, max]  [bot, top]
            property: 'translateY',
        },
        {
            selector: '.parallax-slower',
            range: [200, 0],
            property: 'translateY',
        },
    ];

    var animationInterval = setInterval(function () {
        var animationFrame = window.requestAnimationFrame(function () {
            windowY = window.scrollY;

            animations.forEach(function (animation) {
                var $elems = document.querySelectorAll(animation.selector);
                $elems = Array.prototype.filter.call($elems, elementIsOnScreen)

                $elems.forEach(function ($elem) {
                    setNewPosition($elem, animation);
                }, this);
            });
        });
    }, 10);

    /**
     * Calculates and sets the style value for the given element.
     * Takes this from the config object given: {
     *     max - the maximum value,
     *     property - property to change,
     * }.
     *
     * Properties can be: [ 'translateY', 'opacity' ].
     * More properties can be added using an if statement.
     *
     * @param {Element}
     * @param {{max: Number, property: String}} config
     */
    var setNewPosition = function ($elem, config) {
        var scale = getVerticalScrollScaleForElement($elem);

        // This is the value that is active when the element
        // is at the bottom of the page.
        var min = config.range[0];
        var max = config.range[1];
        var value = (max - min) * scale + min;

        if (config.property === 'translateY') {
            $elem.style.transform = 'translate3d(0, ' + value + 'px, 0)';
        }

        if (config.property === 'opacity') {
            $elem.style.opacity = value;
        }
    };


    /*
        HELPERS
        ------------------------------*/

    /**
     * Check if the given element is on the screen.
     * Also has a padding.
     *
     * @param {Element}
     * @return {Boolean}
     */
    var elementIsOnScreen = function ($elem) {
        var elemY = $elem.getBoundingClientRect().y;

        // Check if lower
        if (elemY > (windowHeight + CHECK_PADDING)) {
            return false;
        }

        // Check if higher
        if (elemY < -($elem.offsetHeight + CHECK_PADDING)) {
            return false;
        }

        // Is on the screen
        return true;
    };

    /**
     * Get the scroll scale for the given element. Looks at how
     * high the element is scrolled. So if the element is 10%
     * from top, this will return 0.1.
     *
     * @param {Element}
     * @return {Number}
     */
    var getVerticalScrollScaleForElement = function ($elem) {
        var elemY = $elem.getBoundingClientRect().y;
        var elemHeight = $elem.offsetHeight;
        var offset = elemHeight + CHECK_PADDING;

        var maxYValue = windowHeight + offset;
        var yValue = elemY + offset;
        var scale = (yValue / maxYValue).toFixed(2);

        return 1 - scale;
    };

  }
}
