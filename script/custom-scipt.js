
$(function() {

  var notesArray = [];
  var note_dir; // Directon Of Note (LTR or RTL)
  var last_rand; // random color - to make sure selects a different color
  var this_color; // BG color
  var this_font_color; // Font Color
  var add_or_edit; // Add Note  OR  Edit Note
  var selected_note;

  var random_color = ["#D03D63", "#F5B920", "#DD4438",
    "#BE6F62", "#7DA57B", "#45B2E4",
    "#9989EB", "#364768", "#EC2340"
  ];

  var random_text_color = ["#FCE4EC", "#FFF8E1", "#FBE9E7",
    "#ECEFF1", "#E8F5E9", "#004D40",
    "#0D47A1", "#D1C4E9", "#FFEBEE"
  ];


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // ---------- On Page Load ---------------
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  $(document).ready(function() {
    loadNotes();

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //         Edit notes
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $(".single-note").on("click", function() {
      selected_note = $(this);
      $(".header_title").text("Edit Your Note");
      $("#btn_add").text("Edit Note");
      $("#input-content").val(selected_note.text());

      $(".modal-content").css("background-color", selected_note.css("background-color"));
      $(".modal-content").css("color", selected_note.css("color"));

      this_color = $(this).css("background-color");
      this_font_color = $(this).css("color");

      // Setting the Direction Based On Language
      if (isUnicode($("#input-content").val())) {
        $("#input-content").css("direction", "rtl");
        note_dir = "rtl";
      } else {
        $("#input-content").css("direction", "ltr");
        note_dir = "ltr";
      }
      add_or_edit = "edit";
      $(".modal").css("display", "block");

    }); // (Edit Notes)

    $('.btn_delete').click(function(event) {
      event.stopPropagation();
    });

    $('.btn_color').click(function(event) {
      event.stopPropagation();
    });


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //        Note Modal Color Selection Loading
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $(".modal-content").css("background-color", random_color[0]);
    for (var i = 0; i < 9; i++) {
      color_now = ".color" + i;
      $(color_now).css("background-color", random_color[i]);
      $(color_now).css("color", random_text_color[i]);
    } // (Note Modal Color Selection Load)


    // >>>>>>>>>>>>>>>>>>>>>>>>>>
    //    Button Delete Note X
    // >>>>>>>>>>>>>>>>>>>>>>>>>>
    $(".btn_delete").on("click", function() {
      notesArray.splice($(this).parent().parent().parent().attr('id'), 1);
      $(this).parent().parent().parent().remove();
      saveNotes();
    }); // (Button Delete Note X)


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //   Button change color Randomly
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    $(".btn_color").on("click", function() {

      var selection = $(this).parent().parent().parent().attr('id');
      var rand = (Math.floor(Math.random() * 10)); // Random number between 0 to 8

      for (rand; rand != last_rand; i++) {
        $(this).parent().parent().parent().css("background-color", random_color[rand]);
        $(this).parent().parent().parent().css("color", random_text_color[rand]);

        notesArray[selection].bg_color = random_color[rand];
        notesArray[selection].color = random_text_color[rand];

        saveNotes();
        break;
      }
      last_rand = rand;
    }); // (Button Change Color Randomly)

    // >>>>>>>>>>>>>>>>>>>>>>>>>
    //  Click Handle Of Search Input
    // >>>>>>>>>>>>>>>>>>>>>>>>>>
    $("#search_input").click(function() {
      $("body").css("background-color", "#37AEC6");


      $(".search_icon").css('background', 'url("./img/arrowLeft.png") no-repeat');
      $(".search_icon").css("cursor", "pointer");
      $(".search_icon").on("click", function() {
        $("body").css("background-color", "#2E3A32");
        $(".single-note").css("display", "");
        $("#search_input").val("");
        $(".search_icon").css('background', 'url("./img/magnify.png") no-repeat');
        $(".search_icon").css("cursor", "auto");
        $(".search_icon").off("click");
      });
    }); // (Search input click handle)

  }); // (On Page Load)


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //      Change BG Color By Modal selection
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  $(".colors div").on("click", function() {
    this_color = $(this).css("background-color");
    this_font_color = $(this).css("color");
    $(".modal-content").css("background-color", this_color);
    $(".modal-content").css("color", this_font_color);
  }); // (Change BG Color By Modal Selection)


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //    New Note Modal Open / Close Handling
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  $("#open_modal").on("click", function() {
    $(".header_title").text("Add New Note");
    $("#btn_add").text("Add Note");
    add_or_edit = "add";
    $(".modal").css("display", "block");
  });

  $("#btn_close").on("click", function() {
    $(".modal").css("display", "none");
  });

  // Closing Modal On Clicking the Window
  $(".modal").on("click", function() {
    $(".modal").css("display", "none");
  });

  // Prevents the Modal From Closing when Clicking on it
  $('.modal-content').click(function(event) {
    event.stopPropagation();
  }); // (New Note Modal Open / Close Handling)


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //       Language Detector
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function isUnicode(str) {
    var letters = [];
    for (var i = 0; i <= str.length; i++) {
      letters[i] = str.substring((i - 1), i);
      if (letters[i].charCodeAt() > 255) {
        return true;
      }
    }
    return false;
  } // (Language Detector)


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //      Setting Note Direction Based On New Note Modal
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  $("#input-content").keyup(function() {
    if (isUnicode($("#input-content").val())) {
      $("#input-content").css("direction", "rtl");
      note_dir = "rtl";
    } else {
      $("#input-content").css("direction", "ltr");
      note_dir = "ltr";
    }
  }); // (Note Direction)


  // >>>>>>>>>>>>>>>>>>>>
  //    Button Add Note
  // >>>>>>>>>>>>>>>>>>>
  $("#btn_add").on("click", function() {
    if (add_or_edit == "add") {
      // ADD Note
      var note = new Object();
      note.content = $("#input-content").val();
      note.bg_color = this_color;
      note.color = this_font_color;
      note.dir = note_dir;
      notesArray.push(note);
      $("#input-content").val("");
      saveNotes();
      $(".modal").css("display", "none");
      location.reload();

    } else if (add_or_edit == "edit") {
      // EDIT Note
      selected_note.text($("#input-content").val());
      notesArray[selected_note.attr('id')].content = $("#input-content").val();

      selected_note.css("background-color", this_color);
      selected_note.css("color", this_font_color);
      notesArray[selected_note.attr('id')].bg_color = this_color;
      notesArray[selected_note.attr('id')].color = this_font_color;
      $("#input-content").val("");

      saveNotes();
      $(".modal").hide();
      location.reload();
    }

  }); // (Button Add Note)


  // >>>>>>>>>>>>>>>>>>>>>>>>
  //      Save Notes
  // >>>>>>>>>>>>>>>>>>>>>>>>
  var saveNotes = function() {
    localStorage.notesArray = JSON.stringify(notesArray);
  } // (Save Notes)


  // >>>>>>>>>>>>>>>>>>>>>>>>>
  //       Load Notes
  // >>>>>>>>>>>>>>>>>>>>>>>>>>
  var loadNotes = function() {

    // Loading Local Storage
    if (localStorage.notesArray != undefined) {
      notesArray = JSON.parse(localStorage.notesArray);
    }

    $("#note-container").html("");
    for (i = 0; i < notesArray.length; i++) {

      var addNote = $("<div></div>").text(notesArray[i].content)
        .addClass("single-note")
        .css({
          "background-color": notesArray[i].bg_color,
          "color": notesArray[i].color,
          "direction": notesArray[i].dir
        })
        .attr("id", i);

      var menu_burger = $("<i></i>").addClass("menu_icon");
      var contextM = $("<div></div>").addClass("context_menu");
      var btnColor = $("<i></i>").addClass("btn_color");
      var btnDelete = $("<i></i>").addClass("btn_delete");

      contextM.append(btnColor);
      contextM.append(btnDelete);
      menu_burger.append(contextM);
      addNote.append(menu_burger);

      $("#note-container").append(addNote);

    }
  } // (Load Notes);


  // >>>>>>>>>>>>>>>>>>>>>>>>>
  //       Search Function
  // >>>>>>>>>>>>>>>>>>>>>>>>>>
  $("#search_input").keyup(function() {

    if (isUnicode($("#search_input").val())) {
      $("#search_input").css("direction", "rtl");
      note_dir = "rtl";
    } else {
      $("#search_input").css("direction", "ltr");
      note_dir = "ltr";
    }

    var filter = $("#search_input").val().toUpperCase();
    var notes = $(".single-note").toArray();
    var currentNote;

    $.each(notes, function(i) {
      currentNote = notes[i];
      if (currentNote.innerHTML.toUpperCase().indexOf(filter) > -1) {
        currentNote.style.display = "";
      } else {
        currentNote.style.display = "none";
      }
    });
  }); // (Search Function)


}); // End of jquery
