//////////////////////////////////////////////////////////////////////////////////////
            
            // Welcome screen, survey, etc goes here
//////////////////////////////////////////////////////////////////////////////////////

function intro(timeline,taskCounter,taskID){
    /*        
    var email;                // Save subject email
    var inits;                // Save subject initials
    var lang;                 // Save subject's primary language
    var lang_other = "NA";    // Save subject's language (if not listed in first question)
    var years_train;          // Save subject's years of formal musical training
    var fname;                // Specifies filename for the participant's data
    */
    
    // Function to check participant consent
    var check_consent = function(elem) {
      if (document.getElementById("consent_checkbox").checked & document.getElementById("headphones_checkbox").checked & document.getElementById("googlechrome").checked) {
        return true;
      } else {
        alert("If you wish to participate, you must check all boxes on this page.");
        return false;
      }
      return false;
    };

    var fs_warn = {
      type: "html-keyboard-response",
      stimulus: "",
      choices: [],
      on_start: function(fs_warn) {
        fs_warn.stimulus = ("<p><b>Your computer seems to be using an unusual sampling rate for sound (").concat(fs.toString()).concat(" Hz).</b></p>");
        fs_warn.stimulus = fs_warn.stimulus.concat("<p>Try refreshing the page, or running this website on a different computer. If you continue to receive this error, please contact the research staff for this study.</p>");
      }
    }

    // If conditional_function returns true, then the fs_warn screen above is presented
    var if_node_fs_warn = {
      timeline: [fs_warn],
      conditional_function: function() {
        return (fs < 44100 || fs > 48000);
      }
    }
    timeline.push(if_node_fs_warn);

    // Screen: welcome
    var welcome = {
      type: "external-html",
      url: "page_welcome.html",
      cont_btn: "start",
      check_fn: check_consent
    };
    timeline.push(welcome);

    // Screen: warning
    var warning = {
      type: "external-html",
      url: "page_warning.html",
      cont_btn: "proceed",
    };
    timeline.push(warning);

    // Screen: collect ID
    var collect_id = {
      type: "survey-text",
      preamble: "Please enter your email and initials below. Our research staff will use this information to assign SONA credit. Please verify that this information matches what is entered on SONA.",
      questions: [{
        name: "email",
        prompt: "Email",
        placeholder: "example@uci.edu",
        required: true
      }, {
        name: "inits",
        prompt: "Initals",
        placeholder: "ABC",
        required: true
      }],
      on_finish: function(data) {
        // Generate filename for participant's data based on initials and current time
        email = JSON.parse(data.responses)["email"];
        inits = JSON.parse(data.responses)["inits"];
        fname = inits.concat("_").concat(Date.now());
      }
    }
    timeline.push(collect_id);

    // Screen: collect language
    var lang_options = ["Arabic", "Chinese (Cantonese)", "Chinese (Mandarin)", "English", "Korean", "Spanish", "Telugu", "Turkish", "Vietnamese", "Other (not listed)"];
    var collect_lang1 = {
      type: "survey-multi-choice",
      questions: [{
        prompt: "What is your native language?",
        name: 'lang',
        options: lang_options,
        required: true
      }],
      on_finish: function(data) {
        lang = JSON.parse(data.responses)["lang"];
      }
    }
    timeline.push(collect_lang1);

    // Screen: collect language (other)
    var collect_lang2 = {
      type: "survey-text",
      preamble: "Since your native language was not listed on the previous page, please enter it here.",
      questions: [{
        name: "lang_other",
        prompt: "Native language",
        placeholder: "e.g., Farsi",
        required: true
      }],
      on_finish: function(data) {
        lang_other = JSON.parse(data.responses)["lang_other"];
      }
    }

    // If conditional_function returns true, then the collect_lang2 screen above is presented
    var if_node_collect_lang2 = {
      timeline: [collect_lang2],
      conditional_function: function() {
        return (lang == "Other (not listed)");
      }
    }
    timeline.push(if_node_collect_lang2);

    // Screen: collect years of formal musical training
    var collect_years = {
      type: "survey-text",
      preamble: "How many years have you received formal musical training? Round to the nearest year. Enter a numeric value.",
      questions: [{
        name: "years_train",
        prompt: "Years of training",
        required: true
      }],
      post_trial_gap: 600,
      on_finish: function(data) {
        years_train = JSON.parse(data.responses)["years_train"];
      }
    }
    timeline.push(collect_years);

}