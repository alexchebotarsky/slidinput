'use strict';
(function($) {
  const addUpPx = (...values) => values.reduce((acc, item) => acc + pxToNum(item), 0);
  const compareStyle = (style, elem1, elem2) =>
    $(elem1).css(style) !== $(elem2).css(style) ? $(elem1).css(style) : '';
  const pxToNum = value => Number(value.slice(0, -2));
  const label = $(document.createElement('label')).addClass('slidinput-wrapper');
  const span = $(document.createElement('span')).addClass('slidinput-placeholder');
  const defs = {
    scaling: 0.5,
    sliding: 4.5,
    placeholderPadding: 0,
    mode: false
  };
  $.fn.slidinput = function(options) {
    options = $.extend(defs, options);
    return this.each(function() {
      $(this).wrap(
        label.clone().addClass(
          Array.from(this.classList)
            .map(item => item + '-wrapper')
            .join(' ')
        )
      );
      const wrapper = $(this)
        .parent()
        .get()[0];
      const placeholder = span.clone().get()[0];
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
          top: addUpPx($(this).css('paddingTop'), $(this).css('borderTopWidth')),
          left: addUpPx($(this).css('paddingLeft'), $(this).css('borderLeftWidth'))
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
          let newPadding =
            ($(this).outerHeight() -
              addUpPx($(this).css('borderTopWidth'), $(this).css('borderBottomWidth')) -
              $(placeholder).height() * options.scaling -
              options.placeholderPadding -
              $(this).height()) /
            2;
          let oldPadding = pxToNum($(this).css('paddingTop'));
          let paddingDiff = oldPadding - newPadding;
          placeholder.style.setProperty('--sliding', paddingDiff / options.scaling + 'px');
          $(this).css({
            paddingBottom: newPadding,
            paddingTop: oldPadding + paddingDiff
          });
          break;
        case 'above':
          break;
      }
    });
  };
})(jQuery);
