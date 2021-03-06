window.onload = function () {

  window.addEventListener('resize', function(event) {
    checkIfParallaxNeeded();
  });

  $('[data-bg-src]').each(function() {
    if ($(this).data('bg-src')) {
      this.style.backgroundImage = 'url("' + $(this).data('bg-src') + '")';
    }
  });

  checkIfParallaxNeeded();

  if (document.getElementsByClassName('fadeIn')[0]) {
    document.getElementsByClassName('fadeIn')[0].classList.remove('loading');
  }

  document.getElementById('copyBtn').addEventListener('click', function(element) {
    var emailLink = document.querySelector('#email-text');
    var range = document.createRange();
    range.selectNode(emailLink);
    window.getSelection().addRange(range);
    document.execCommand('copy');

    window.getSelection().removeAllRanges();

    if (window.matchMedia("(max-width: 920px)").matches) {
      toggleSnackbar();
    } else {
      toggleTooltip();
    }
  });

  var images = document.querySelectorAll(".project-image__single, .project-image__double, .project-image__triple");

  Array.prototype.forEach.call(images, function(image) {
    image.addEventListener('click', function() {
      var modal = document.getElementById("img_modal");
      var modal_image = modal.getElementsByClassName("modal-image")[0];
      modal_image.src = image.src;

      $('#img_modal').modal('show');
    })
  });

  $('.modal-image').on('click', function() {
    $('#img_modal').modal('hide');
  });

};

var checkIfParallaxNeeded = function() {

  if (window.matchMedia("(min-width: 920px)").matches) {

    var CHECK_PADDING = 20;
    var windowHeight = window.innerHeight;
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

    function animate() {
        var animationFrame = window.requestAnimationFrame(function () {

            animations.forEach(function (animation) {
                var $elems = document.querySelectorAll(animation.selector);
                $elems = Array.prototype.filter.call($elems, elementIsOnScreen)

                $elems.forEach(function ($elem) {
                    setNewPosition($elem, animation);

                    $elem.classList.remove('hidden');
                }, this);
            });
            setTimeout(animate, 16);
        });

    }

    animate();

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
        if ($($elem).data('bg-src')) {
          $elem.style.backgroundImage = 'url("' + $($elem).data('bg-src') + '")';
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

var toggleSnackbar = function() {
  $('#snackbar').addClass('show');
  setTimeout(function() {
    $('#snackbar').removeClass('show');
  }, 3000);
}

var toggleTooltip = function() {
  var button = $("#copyBtn");
  button.attr("data-content", "Copied!");

  setTimeout(function() {
    button.attr("data-content", "Copy to clipboard");
  }, 10000);
}
