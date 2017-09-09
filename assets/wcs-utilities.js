// var dateOverride = '2017-09-06 EDT';
var dateOverride = '';
var nextClassDate;
$.get("/navbar.html", function (data) {
  $("#navbar").replaceWith(data);
});
$("#alert").hide();

function addMarvinButton(type) {
  if (type == "e") {
    $("#navbar-placeholder").replaceWith("<button class = 'btn btn-outline-success my-2 my-sm-0' type = 'submit' onClick = 'location.href=\'https://github.com/woodstockcs/marvin/issues/new\'' > Ask Marvin < /button>");
  } else {
    $("#navbar-placeholder").replaceWith("<button class = 'btn btn-outline-success my-2 my-sm-0 disabled' type = 'submit' onClick = 'location.href=\'#\'' > Ask Marvin < /button>");
  }
}

function getTodaysDate() {
  var theDate;
  if (dateOverride.length > 0) {
    theDate = new Date(dateOverride);
    $("body").css("background-color", "Red");
  } else {
    theDate = new Date();
  }
  return theDate.setHours(0, 0, 0, 0);
}

function truncateSortableDate(the_date) {
  return parseDate(the_date.substring(0, 10)).setHours(0, 0, 0, 0);
}

function getFileNameForClassIdAndType(classId, type) {
  var classFile = "/data/1718-";
  switch (classId) {
  case "c":
    classFile += "csp";
    break;
  case "e":
    classFile += "csa";
    break;
  }
  classFile += "-";
  classFile += type;
  classFile += ".json";
  return classFile;
}

function getRelativeDateString(theSortableDate, theDisplayDate) {
  var relativeString;
  var the_date = truncateSortableDate(theSortableDate);
  if (getTodaysDate() == the_date) {
    relativeString = theDisplayDate + " (today)";
  } else if (nextClassDate == the_date) {
    relativeString = theDisplayDate + " (next class)";
  } else {
    relativeString = theDisplayDate;
  }
  return relativeString;
}

function populateOtherData() {
  $.getJSON("/assets/data/test.json", function (data) {
    var items = [];
    console.log("reading");
    $.each(data, function (key, val) {
      items.push("<li id='" + key + "'>" + val + "</li>");
      console.log(val);
    });
    console.log("goodbye");
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("body");
  });
}
// from https://stackoverflow.com/a/2587398/789446
// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
}

function populateAgendaData(classId) {
  console.log("populating current agenda for " + classId);
  $.getJSON(getFileNameForClassIdAndType(classId, "agenda"), function (data) {
    // sort the classes by date *descending*
    var classes = data.classes;
    classes.sort(function (a, b) {
      return b.sortableDate.localeCompare(a.sortableDate)
    })
    // find the earliest date not before today
    var displayClass;
    $.each(classes, function (num, the_class) {
      var classDate = truncateSortableDate(the_class.sortableDate);
      if (getTodaysDate() < classDate) {
        displayClass = the_class;
        nextClassDate = classDate;
      } else if (getTodaysDate() == classDate) {
        displayClass = the_class;
      } else {
        return;
      }
    });
    // convert the agenda info into html
    var items = [];
    if (displayClass) {
      items.push("<h6 class='card-subtitle mb-2 text-muted'>" + getRelativeDateString(displayClass.sortableDate, displayClass.displayDate) + "</h6>");
      items.push("<ul>");
      $.each(displayClass.agenda, function (num, the_item) {
        items.push("<li class='card-text'>" + the_item + "</li>")
      });
      items.push("</ul>")
    } else {
      items.push("<em>no future agenda available</em>")
    }
    $("#the-class").append(items.join(""));
  });
}

function populateHomeworkData(classId) {
  console.log("populating homework for " + classId);
  $.getJSON(getFileNameForClassIdAndType(classId, "homeworks"), function (data) {
    // sort the homeworks by due date ascending
    var homeworks = data.homeworks;
    homeworks.sort(function (a, b) {
      return a.sortableEndDate.localeCompare(b.sortableEndDate)
    })
    // find the active homeworks
    var items = [];
    $.each(homeworks, function (num, the_homework) {
      var theStartDate = truncateSortableDate(the_homework.sortableStartDate);
      var theEndDate = truncateSortableDate(the_homework.sortableEndDate);
      if (getTodaysDate() >= theStartDate && getTodaysDate() <= theEndDate) {
        if (getTodaysDate() == theEndDate) {
          items.push("<div style='background-color: #ffcccc'><h6 class='card-subtitle mb-2 text-danger'>due today</h6>");
          items.push("<ul>")
          $.each(the_homework.lines, function (num, the_line) {
            items.push("<li class='card-text'>" + the_line + "</li>")
          });
          items.push("</ul></div>")
        } else {
          items.push("<h6 class='card-subtitle mb-2 text-muted'>due " + getRelativeDateString(the_homework.sortableEndDate, the_homework.displayEndDate) + "</h6>");
          items.push("<ul>")
          $.each(the_homework.lines, function (num, the_line) {
            items.push("<li class='card-text'>" + the_line + "</li>")
          });
          items.push("</ul>")
        }
      } else {}
    });
    if (items.length < 1) {
      items.push("<em>no current homework</em>")
      // items.push("<em>no current homework</em>&nbsp;&nbsp;<img src='/assets/emoji-dab.gif' width='30' style='margin-bottom: 0px !important'>")
    }
    $("#the-homeworks").append(items.join(""));
  });
}

function populateAheadData(classId) {
  console.log("populating looking ahead for " + classId);
  $.getJSON(getFileNameForClassIdAndType(classId, "aheads"), function (data) {
    // sort the items by date ascending
    var aheads = data.aheads;
    aheads.sort(function (a, b) {
      return a.sortableDate.localeCompare(b.sortableDate)
    })
    // display all items after today
    var items = [];
    $.each(aheads, function (num, the_ahead) {
      var todaysDate = getTodaysDate();
      var theDate = truncateSortableDate(the_ahead.sortableDate);
      if (getTodaysDate() <= theDate) {
        items.push("<tr><td class='col-ahead-date'>" + the_ahead.displayDate + ", " + the_ahead.lines[0] + "</td>");
        items.push("<td><em>" + the_ahead.lines[1] + "</em></td>")
        items.push("</tr>")
      }
    });
    if (items.length == 0) {
      $("#ahead-card").hide();
    } else {
      $("#ahead-table").append(items.join(""));
    }
  });
}

function populateArchiveAgendaData(classId) {
  console.log("populating archive agenda");
  $.getJSON(getFileNameForClassIdAndType(classId, "agenda"), function (data) {
    // sort the classes by date *descending*
    var classes = data.classes;
    classes.sort(function (a, b) {
      return b.sortableDate.localeCompare(a.sortableDate)
    })
    // collect all the classes before today
    var items = [];
    $.each(classes, function (num, the_class) {
      var theDate = truncateSortableDate(the_class.sortableDate);
      if (getTodaysDate() > theDate) {
        console.log("found an old one. adding it");
        items.push("<h6 class='card-subtitle mb-2 text-muted'>" + the_class.displayDate + "</h6>");
        items.push("<ul>")
        $.each(the_class.agenda, function (num, the_item) {
          items.push("<li>" + the_item + "</li>")
        });
        items.push("</ul>")
      }
    });
    if (items.length == 0) {
      items.push("<em>no previous agendas</em>");
    }
    $("#archive-agenda").append(items.join(""));
  });
}

function populateArchiveHomeworkData(classId) {
  console.log("populating archive homework");
  $.getJSON(getFileNameForClassIdAndType(classId, "homeworks"), function (data) {
    // sort the homeworks by due date ascending
    var homeworks = data.homeworks;
    homeworks.sort(function (a, b) {
      return b.sortableEndDate.localeCompare(a.sortableEndDate)
    })
    // find the active homeworks
    var items = [];
    $.each(homeworks, function (num, the_homework) {
      var theEndDate = truncateSortableDate(the_homework.sortableEndDate);
      if (getTodaysDate() > theEndDate) {
        items.push("<h6 class='card-subtitle mb-2 text-muted'>due " + the_homework.displayEndDate + "</h6>");
        items.push("<ul>");
        $.each(the_homework.lines, function (num, the_line) {
          items.push("<li class='card-text'>" + the_line + "</li>")
        });
        items.push("</ul>");
      }
    });
    if (items.length < 1) {
      items.push("<em>no previous homework</em>")
    }
    $("#archive-homework").append(items.join(""));
  });
}
$('#slidesModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var displayUrl = "https://docs.google.com/a/wcsu.net/presentation/d/" + button.data('slides-id') + "/embed?start=false&loop=true&delayms=10000"; // Extract info from data-* attributes
  var editUrl = "location.href='https://docs.google.com/presentation/d/" + button.data('slides-id') + "/edit'"; // Extract info from data-* attributes
  $('#slidesIframe').attr('src', displayUrl);
  $('#slidesEditButton').attr('onClick', editUrl);
});
$('#imgModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var url = button.data('img-id'); // Extract info from data-* attributes
  var modal = $(this)
  $('#imgPlaceholder').attr('src', url);
});
// autonumber blockquotes
function autoNumberQuestions() {
  console.log("autonumbering questions");
  var questionNumber = 1;
  $(".question").each(function () {
    console.log($(this).html());
    $(this).html(questionNumber + ". " + $(this).html());
    questionNumber++;
  });
}
(function (document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);
  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 60,
    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function () {
      this.scrollToCurrent();
      $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
      $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
    },
    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function () {
      return this.OFFSET_HEIGHT_PX;
    },
    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function (href, pushToHistory) {
      var match, anchorOffset;
      if (!this.ANCHOR_REGEX.test(href)) {
        return false;
      }
      match = document.getElementById(href.slice(1));
      if (match) {
        anchorOffset = $(match).offset().top - this.getFixedOffset();
        $('html, body').animate({
          scrollTop: anchorOffset
        });
        // Add the state to history as-per normal anchor links
        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }
      return !!match;
    },
    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function (e) {
      if (this.scrollIfAnchor(window.location.hash) && e) {
        e.preventDefault();
      }
    },
    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function (e) {
      var elem = e.target;
      if (this.scrollIfAnchor(elem.getAttribute('href'), true)) {
        e.preventDefault();
      }
    }
  };
  $(document).ready($.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);
