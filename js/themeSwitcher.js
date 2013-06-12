function Dark(){
  $("body").css('background-color', '#202020');
  $("p, li").css('color', '#eee')
  $(".formAddNew").addClass('formAddNewDark')
  $("i").css('color', 'rgb(230,230,230)');
  $(".topBarDivider").addClass('topBarDividerDark');
  $(".accordion-group").addClass('accordion-groupDark')
  $(".sepLine").addClass('sepLineDark')
  $(".accordion-hover").addClass('accordion-hoverDark')
}
function Light(){
  $("body").css('background-color', 'rgb(245, 245, 245)');
  $("p, li").css('color', '#111')
  $(".formAddNew").removeClass('formAddNewDark')
  $("i").css('color', 'rgb(0, 136, 204)');
  $(".topBarDivider").removeClass('topBarDividerDark');
  $(".accordion-group").removeClass('accordion-groupDark')
  $(".sepLine").removeClass('sepLineDark')
  $(".accordion-hover").removeClass('accordion-hoverDark')
}