import './main.css';
(function($) {
  const getClassesString = (classList, postfix = '') =>
    Array.from(classList)
      .map(item => item + postfix)
      .join(' ');
  const pxToNum = (...values) =>
    values.reduce((acc, item) => acc + Number(item.slice(0, -2)), 0);
  const compareStyle = (style, target1, target2) =>
    $(target1).css(style) !== $(target2).css(style) ? $(target1).css(style) : '';
  const isFilled = input =>
    !!$(input)
      .val()
      .trim();
  $.fn.slidinput = function(options) {
    const defs = {
      scaling: 0.5,
      mode: false,
      placeholderPadding: 0
    };
    options = $.extend(defs, options);
    return this.each(function() {
      let oh = $(this).outerHeight();
      $(this).wrap(
        $(document.createElement('label')).addClass(
          getClassesString(['slidinput', ...this.classList], '-wrapper')
        )
      );
      const $wrapper = $(this).parent();
      const placeholder = $(document.createElement('span'))
        .addClass('slidinput-placeholder')
        .text($(this).attr('placeholder'))
        .get()[0];
      $wrapper.append(placeholder).css({
        marginLeft: compareStyle('marginLeft', this, $wrapper),
        marginTop: compareStyle('marginTop', this, $wrapper),
        marginRight: compareStyle('marginRight', this, $wrapper),
        marginBottom: compareStyle('marginBottom', this, $wrapper)
      });
      const addFilled = () => {
        $wrapper.addClass('filled');
        $(this).addClass('filled');
      };
      const removeFilled = () => {
        $wrapper.removeClass('filled');
        $(this).removeClass('filled');
      };
      const addFocus = () => {
        $wrapper.addClass('focused');
        $(this).addClass('focused');
      };
      const removeFocus = () => {
        $wrapper.removeClass('focused');
        $(this).removeClass('focused');
      };
      $(this)
        .removeAttr('placeholder')
        .css({
          margin: 0,
          height: oh
        })
        .on('focus', () => addFocus() && (isFilled(this) ? addFilled() : removeFilled()))
        .on('blur', () => removeFocus() && (isFilled(this) ? addFilled() : removeFilled()))
        .on('input', () => (isFilled(this) ? addFilled() : removeFilled()));
      $(window).one('load', () => (isFilled(this) ? addFilled() : removeFilled()));
      $(placeholder).css({
        color: compareStyle('color', this, placeholder),
        fontSize: compareStyle('fontSize', this, placeholder),
        fontFamily: compareStyle('fontFamily', this, placeholder),
        letterSpacing: compareStyle('letterSpacing', this, placeholder),
        fontWeight: compareStyle('fontWeight', this, placeholder),
        top: 0,
        left: 0
      });
      let ih = $(placeholder).height();
      let bt = pxToNum($(this).css('borderTopWidth'));
      let bb = pxToNum($(this).css('borderBottomWidth'));
      let placeholderTop = (oh - ih) / 2;
      let placeholderLeft = pxToNum(
        $(this).css('paddingLeft'),
        $(this).css('borderLeftWidth')
      );
      $(placeholder).css({
        top: placeholderTop,
        left: placeholderLeft
      });
      let {scaling, mode, placeholderPadding} = options;
      placeholder.style.setProperty('--scaling', scaling);
      switch (mode) {
        case 'above':
          let newSlidingY = ((placeholderTop + placeholderPadding) / scaling + ih) * -1;
          placeholder.style.setProperty('--sliding-y', newSlidingY + 'px');
          placeholder.style.setProperty('--sliding-x', -placeholderLeft / scaling + 'px');
          break;
        case 'centered':
          let newPaddingBottom = (oh - bt + bb - ih * (1 + scaling) - placeholderPadding) / 2;
          let newPaddingTop = oh - bt + bb - ih - newPaddingBottom;
          $(this).css({
            paddingTop: newPaddingTop,
            paddingBottom: newPaddingBottom
          });
          let newSliding = (newPaddingBottom + bt - placeholderTop) / scaling;
          placeholder.style.setProperty('--sliding-y', newSliding + 'px');
          break;
      }
    });
  };
})(jQuery);
