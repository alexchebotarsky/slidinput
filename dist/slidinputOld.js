'use strict';
(function($) {
  const getClassString = (classList, ...otherClasses) =>
    otherClasses.join(' ') +
    Array.from(classList)
      .map(item => item + '-wrapper')
      .join(' ');
  const pxToNum = value => Number(value.slice(0, -2));
  const addUpPx = (...values) => values.reduce((acc, item) => acc + pxToNum(item), 0);
  const compareStyle = (style, elem1, elem2) =>
    $(elem1).css(style) !== $(elem2).css(style) ? $(elem1).css(style) : '';
  const label = document.createElement('label');
  const getLabel = classesString =>
    $(label)
      .clone()
      .addClass(classes);
  const span = document.createElement('span');
  const defs = {
    scaling: 0.5,
    placeholderPadding: 0,
    resetSlidingOffsetLeft: true,
    mode: false
  };
  $.fn.slidinput = function(options) {
    options = $.extend(defs, options);
    return this.each(function() {
      $(this).wrap(getLabel(getClassString(this.classList, 'slidinput-wrapper')));
      const wrapper = $(this)
        .parent()
        .get()[0];
      const placeholder = span.cloneNode;
      $(wrapper).append(placeholder);
      $(wrapper).css({
        marginLeft: compareStyle('marginLeft', this, wrapper),
        marginTop: compareStyle('marginTop', this, wrapper),
        marginRight: compareStyle('marginRight', this, wrapper),
        marginBottom: compareStyle('marginBottom', this, wrapper)
      });
      $(placeholder)
        .text($(this).attr('placeholder'))
        .css({
          color: compareStyle('color', this, placeholder),
          fontSize: compareStyle('fontSize', this, placeholder),
          fontFamily: compareStyle('fontFamily', this, placeholder),
          letterSpacing: compareStyle('letterSpacing', this, placeholder),
          fontWeight: compareStyle('fontWeight', this, placeholder),
          top: 0,
          left: 0
        });
      let offsetTop = ($(this).outerHeight() - $(placeholder).height()) / 2;
      let offsetLeft = addUpPx($(this).css('borderLeftWidth'), $(this).css('paddingLeft'));
      $(placeholder).css({
        top: offsetTop,
        left: offsetLeft
      });
      $(this)
        .removeAttr('placeholder')
        .css({
          margin: 0
        })
        .on('focus', () => {
          $(wrapper).addClass('focused');
        })
        .on('blur', () => {
          $(wrapper).removeClass('focused');
        })
        .on('input', () => {
          if (
            $(this)
              .val()
              .trim()
          ) {
            $(wrapper).addClass('filled');
          } else {
            $(wrapper).removeClass('filled');
          }
        });
      options.scaling && placeholder.style.setProperty('--scaling', options.scaling);
      switch (options.mode) {
        case 'centered':
          let newPaddingTop =
            ($(this).outerHeight() -
              addUpPx($(this).css('borderTopWidth'), $(this).css('borderBottomWidth')) -
              options.placeholderPadding -
              $(placeholder).height() * (1 + options.scaling)) /
            2;
          let offsetDiff = offsetTop - newPaddingTop;
          placeholder.style.setProperty('--sliding', offsetDiff / options.scaling + 'px');
          $(this).css({
            paddingBottom: newPaddingTop,
            paddingTop: offsetTop + offsetDiff
          });
          break;
        case 'placeholderAway':
          let newSliding =
            offsetTop / options.scaling + $(placeholder).height() + options.placeholderPadding;
          placeholder.style.setProperty('--sliding', newSliding + 'px');
          break;
      }
    });
  };
})(jQuery);
