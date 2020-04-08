$('.toggleMeBtn').on('click', function () {
  if ($('.myInputToggleMe').hasClass('slidinput-inited')) {
    $('.myInputToggleMe').slidinput('destroy');
    $(this).text('Init it!');
  } else {
    $('.myInputToggleMe').slidinput();
    $(this).text('Destroy it!');
  }
});

$('.myInputCentered').slidinput({
  mode: 'centered', // Actually, it's default mode
});

$('.myInputAbove').slidinput({
  mode: 'above',
  offsetY: -2,
});

$('.myInputRegular').slidinput({
  mode: 'regular',
});

$('.myInputSlidingRegular').slidinput({
  mode: 'regular',
  offsetX: 70,
});

$('.myInputMiddle').slidinput({
  mode: 'middle',
  scaling: 0.5,
});

$('.myInputCustomOffset').slidinput({
  mode: 'middle',
  offsetX: -25,
  offsetY: -10,
  scaling: 0.4,
});

$('.myInputNoFocusAnimation').slidinput({
  mode: 'above',
  focusAnimation: false,
});

$('.myInputTextAlignCenter').slidinput();

$('.myInputDisabled').slidinput();

$('.myInputCssSized').slidinput();

$('.myInputCssColored').slidinput();
