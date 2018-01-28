var result;

/***** Animation of button being pressed *****/
function animButton(keyval) {
  if (keyval === "enter") {
    $("#" + keyval).animate({
      opacity: '0.56',
      backgroundColor: "#a00029"
    }, 50);
    $("#" + keyval).animate({
      opacity: '1',
      backgroundColor: "#ad566d"
    }, 80);
  } else if (keyval === "plus" || keyval === "minus") {
    $("#" + keyval).animate({
      opacity: '0.56',
      backgroundColor: "#98b978"
    }, 100);
    $("#" + keyval).animate({
      opacity: '1',
      backgroundColor: "#98878F"
    }, 50);
  } else {
    $("#" + keyval).animate({
      opacity: '0.56'
    }, 100);
    $("#" + keyval).animate({
      opacity: '1'
    }, 50);
  }
}

/***** Action when corresponding key is being presed *****/
function setNum(n) {
  current = $("#current").html();

  if (current === "")
  /* current empty */
  {
    if (isNaN(n))
    /* If typed a NaN character :
    + * - or / or =
    */
    {
      chain = $("#chain").html();
      if (chain != "")
      /* if we start to carry over (current is still empty) */
      {
        if (n === "=")
        /* '=' special case */
        {
          $("#current").text($("#chain").html())
        } else
        if (n === ".") {
          $(".container").effect("shake");
        } else {
          if ($("#chain").html().length >= 10) {
            $(".container").effect("shake");
          } else {
            /* we carry over */
            $("#chain").animate({
              opacity: '0.9'
            }, 300);
            $("#chain").text($("#chain").html());
            $("#current").text($("#chain").html() + $("#current").html() + n);
          }
        }
      } else
      /* if both chain and current are empty */
      {
        $(".container").effect("shake");
      }
    }
    /* If Number : */
    else {
      $("#current").text($("#current").html() + n);
    }
  }
  /*  current non-empty */
  else if (isNaN(current[current.length - 1]))
  /* if current - 1 is NaN we want to block the next NaN */
  {

    if (isNaN(n))
    /* If typed a NaN character :
    + * - or / or = */
    {
      $(".container").effect("shake");
    } else
      $("#current").text($("#current").html() + n);
    $("#chain").animate({
      opacity: '0.3'
    }, 300);

  }
  /* current -1 is a number */
  else {
    if (n === "=") {
      /* To avoid printing = */
    } else {
      $("#current").text($("#current").html() + n);
    }
  }

}

/***** Equal/Enter *****/
function equal() {
  if ($("#current").html() != "") {
    $("#chain").animate({
      opacity: '0.9',
      color: "#95f995"
    }, 300);
    $("#chain").animate({
      opacity: '0.3',
      color: "white"
    }, 300);

    result = eval($("#current").html());
    if (result === undefined)
      result = "";

    $("#chain").text(result);
    cleanScreen();
    result = "";
  } else if ($("#chain").html() != "") {
    $("#chain").animate({
      opacity: '0.9'
    }, 300);
  } else {
    $("#chain").text(result);
    cleanScreen();
  }
}

/***** Updates the "current" string *****/
function updateScreen(str) {
  $("#current").text(str);
}

/***** Clean the "current" string *****/
function cleanScreen() {
  $("#current").fadeOut(200, function() {$("#current").text("");});
  $("#current").fadeIn(1);
}

/***** Cleans both chains *****/
function cleanChain() {
  $("#current").fadeOut(200, function() {
    $("#current").text("");
  });
  $("#chain").fadeOut(200, function() {
    $("#chain").text("");
  });
  $("#current").fadeIn(1);
  $("#chain").fadeIn(1);
}

/***** Deletes the last character in the "current" chain *****/
function deleteLast() {
  if ($("#current").html != "") {
    $("#current").text(($("#current").html()).slice(0, -1));
  }
}

/***** Disables selection *****/
jQuery.fn.extend({ disableSelection: function() { return this.each(function() {
this.onselectstart = function() { return false; }; this.unselectable = "on";
jQuery(this).css('user-select', 'none'); jQuery(this).css('-o-user-select',
'none'); jQuery(this).css('-moz-user-select', 'none');
jQuery(this).css('-khtml-user-select', 'none');
jQuery(this).css('-webkit-user-select', 'none'); }); } });

/***** Routes the input to the corresponding functions *****/
function routeInput(keyval) {
  if (isNaN(keyval)) {
    switch (keyval) { case '=': setNum(keyval); animButton(keyval); break; case
  'minus': setNum("-"); break; case 'divide': setNum("/"); break; case
  'multiply': setNum("*"); break; case 'plus': setNum("+"); break; case 'enter':
  equal(); setNum('='); //      animButton(keyval); break; case 'suppr':
  cleanChain(); break; case 'del': deleteLast(); break; case 'dot': setNum('.');
  break; } } else { setNum(keyval); }
  animButton(keyval);
}

$('html').disableSelection();

/***** Handling the keyboard events *****/
var down = {};
var keyCodes = [{ val: 1, key: 97 }, { val: 2, key: 98 }, { val: 3, key: 99 }, {
val: 4, key: 100 }, { val: 5, key: 101 }, { val: 6, key: 102 }, { val: 7, key:
103 }, { val: 8, key: 104 }, { val: 9, key: 105 }, { val: 0, key: 96 }, { val:
"plus", key: 107 }, { val: "minus", key: 109 }, { val: "dot", key: 110 }, { val:
"multiply", key: 106 }, { val: "divide", key: 111 }, { val: "=", key: 61 }, {
val: "del", key: 8 }, { val: "enter", key: 13 }, { val: "suppr", key: 46 } ];

$(document).keydown(function(event) {
  var keyPressed = (event.keyCode ? event.keyCode : event.which);
  var resultK = $.grep(keyCodes, function(e) {
    return e.key == keyPressed;
  });
  if (resultK.length === 0) {

  } else {
    event.preventDefault();
    routeInput(resultK[0].val);
    down = true;
  }
});
