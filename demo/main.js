$('.myInputCentered').slidinput({
  mode: 'centered' // Actually, it's default mode
});

$('.myInputAbove').slidinput({
  mode: 'above',
  offsetY: -2
});

$('.myInputNone').slidinput({
  mode: 'middle',
  scaling: 0.5
});

$('.myInputRegular').slidinput({
  mode: 'regular'
});

$('.myInputCustomOffset').slidinput({
  mode: 'middle',
  offsetX: -25,
  offsetY: -10,
  scaling: 0.4
});

$('.myInputToggleMe').slidinput();
$('.toggleMeBtn').on('click', function() {
  inited = $('.myInputToggleMe').hasClass('slidinput-inited');
  if (inited) {
    $('.myInputToggleMe').slidinput('destroy');
    $(this).text('Init it!');
  } else {
    $('.myInputToggleMe').slidinput();
    $(this).text('Destroy it!');
  }
});

$('.myInputTextAlignCenter').slidinput();

$('.myInputCssSized').slidinput();

$('.myInputCssColored').slidinput();

$('.myInputDisabled').slidinput();
