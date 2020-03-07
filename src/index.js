import './main.scss';
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
  $(window).one('load', () => {
    $('*[data-slidinput]').slidinput();
  });
  $.fn.slidinput = function(options) {
    const defs = {
      scaling: 0.7,
      mode: 'centered',
      offsetY: 0,
      offsetX: 0,
      focusAnimation: true
    };
    return this.each(function() {
      if (options === 'destroy') {
        if ($(this).hasClass('slidinput-inited')) {
          let $placeholder = $(this)
            .parent()
            .children('.slidinput-placeholder');
          $(this)
            .removeClass('slidinput-inited')
            .removeAttr('style')
            .unwrap()
            .attr('placeholder', $placeholder.text());
          $placeholder.remove();
        }
        return;
      } else if ($(this).hasClass('slidinput-inited')) return;
      let dataOptions = {};
      for (let key in defs) {
        if ($(this).attr('data-' + key)) dataOptions[key] = $(this).attr('data-' + key);
        if (!isNaN(dataOptions[key])) dataOptions[key] = Number(dataOptions[key]);
        switch (dataOptions[key]) {
          case 'true':
            dataOptions[key] = true;
            break;
          case 'false':
            dataOptions[key] = false;
            break;
        }
      }
      options = $.extend(defs, dataOptions, options);
      let oh = $(this).outerHeight();
      let ow = $(this).outerWidth();
      $(this).wrap(
        $(document.createElement('label')).addClass(
          getClassesString(['slidinput', ...this.classList], '-wrapper')
        )
      );
      const wrapper = $(this)
        .parent()
        .get()[0];
      const placeholder = $(document.createElement('span'))
        .addClass('slidinput-placeholder')
        .text($(this).attr('placeholder'))
        .get()[0];
      $(wrapper)
        .append(placeholder)
        .css({
          marginLeft: compareStyle('marginLeft', this, wrapper),
          marginTop: compareStyle('marginTop', this, wrapper),
          marginRight: compareStyle('marginRight', this, wrapper),
          marginBottom: compareStyle('marginBottom', this, wrapper)
        });
      isFilled(this) ? $(wrapper).addClass('filled') : $(wrapper).removeClass('filled');
      $(this)
        .addClass('slidinput-inited')
        .removeAttr('placeholder')
        .css({
          margin: 0,
          height: oh,
          width: ow
        })
        .on('focus', () => {
          $(wrapper).addClass('focused');
          isFilled(this) ? $(wrapper).addClass('filled') : $(wrapper).removeClass('filled');
        })
        .on('blur', () => {
          $(wrapper).removeClass('focused');
          isFilled(this) ? $(wrapper).addClass('filled') : $(wrapper).removeClass('filled');
        })
        .on('input', () => {
          isFilled(this) ? $(wrapper).addClass('filled') : $(wrapper).removeClass('filled');
        });
      $(window).one('load', () => {
        isFilled(this) ? $(wrapper).addClass('filled') : $(wrapper).removeClass('filled');
      });
      $(placeholder).css({
        color: compareStyle('color', this, placeholder),
        fontSize: compareStyle('fontSize', this, placeholder),
        fontFamily: compareStyle('fontFamily', this, placeholder),
        letterSpacing: compareStyle('letterSpacing', this, placeholder),
        fontWeight: compareStyle('fontWeight', this, placeholder),
        top: 0,
        left: 0
      });
      let ph = $(placeholder).height();
      let placeholderTop = (oh - ph) / 2;
      let placeholderLeft = pxToNum(
        $(this).css('paddingLeft'),
        $(this).css('borderLeftWidth')
      );
      $(placeholder).css({
        top: placeholderTop,
        left: placeholderLeft
      });
      let {scaling, mode, offsetY, offsetX, focusAnimation} = options;
      placeholder.style.setProperty('--scaling', scaling);
      if ($(this).css('text-align') === 'center') {
        $(wrapper).addClass('text-align-center');
        let pw = $(placeholder).width();
        $(placeholder).css('left', placeholderLeft + ($(this).width() - pw) / 2 + 'px');
        placeholder.style.setProperty(
          '--sliding-x',
          (pw - pw * scaling) / (scaling * 2) + offsetX + 'px'
        );
      }
      if (focusAnimation) $(wrapper).addClass('focus-animation');
      switch (mode) {
        case 'centered':
          $(wrapper).addClass('mode-centered');
          let bt = pxToNum($(this).css('borderTopWidth'));
          let bb = pxToNum($(this).css('borderBottomWidth'));
          let newPaddingBottom = (oh - bt + bb - ph * (1 + scaling) + offsetY) / 2;
          let newPaddingTop = oh - bt + bb - ph - newPaddingBottom;
          $(this).css({
            paddingTop: newPaddingTop,
            paddingBottom: newPaddingBottom
          });
          let newSliding = (newPaddingBottom + bt - placeholderTop) / scaling;
          placeholder.style.setProperty('--sliding-y', newSliding + 'px');
          if ($(this).css('text-align') !== 'center') {
            placeholder.style.setProperty('--sliding-x', offsetX + 'px');
          }
          break;
        case 'above':
          $(wrapper).addClass('mode-above');
          let newSlidingY = ((placeholderTop - offsetY) / scaling + ph) * -1;
          placeholder.style.setProperty('--sliding-y', newSlidingY + 'px');
          if ($(this).css('text-align') !== 'center') {
            placeholder.style.setProperty(
              '--sliding-x',
              -placeholderLeft / scaling + offsetX + 'px'
            );
          }
          break;
        case 'regular':
          $(wrapper)
            .addClass('mode-regular')
            .removeClass('focus-animation');
          placeholder.style.setProperty('--scaling', 1);
          placeholder.style.setProperty('--opacity', 0);
          placeholder.style.setProperty('--sliding-y', offsetY + 'px');
          placeholder.style.setProperty('--sliding-x', offsetX + 'px');
          break;
        case 'middle':
          $(wrapper).addClass('mode-middle');
          placeholder.style.setProperty('--sliding-y', -oh * 0.9 * scaling + offsetY + 'px');
          if ($(this).css('text-align') !== 'center') {
            placeholder.style.setProperty('--sliding-x', offsetX + 'px');
          }
          break;
      }
    });
  };
})(jQuery);
