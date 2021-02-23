function run_pitchdiff_exp(timeline,taskCounter,taskID){   
    
// PD Gap 0.5

    var rove = 1;               // 1==rove the 1st tone, 0==fixed tone
    var gap_dur = 0.5;          // duration between tones
    var ntrials = 100;          // Number of trials total
    var trials_type = jsPsych.randomization.repeat([0,1],ntrials/2);
    // trial condition (0==higher,1==lower)

    //Other global variables    
    var cur_trial = 0;          // Track current trial
    var nExample = 0;           // counter to keep track of num examples played
    var demoNoteDiff = [3,9];   // diff's for the examples
    var cur_type = NaN;         // Track current stim type (easier than constantly indexing trials_type)
    var last_correct = false;   // Track correctness of latest response
    var total_correct = 0;      // Track total number of correct responses
    var trial_obj;              // Track the parameters of the latest stimulus
    var corr_ans;

    var diff = 7; // current trial diff
    var diff1 = 1; // starting diff for staircase 1
    var diff2 = 7; // starting diff for staircase 2
    var maxDiff = 12; // 1 octave

    // PD tasks -- staircase tracking
    var staircase = []; // for all else
    for (var i=0;i<=49;i++) {
        staircase.push(0);
        staircase.push(1);
    } // create an array of repeating 0's and 1's
    var staircase_track0 = 0;
    var staircase_track1 = 0;


    //////////////////////////////////////////////////////////////////////////////////////

    // Instructions and examples

    //////////////////////////////////////////////////////////////////////////////////////

    // Start Screen (instructions)
    var start_screen = {
        type: 'html-button-response',
        stimulus: '',
        post_trial_gap: 600,
        on_start: function(start_screen){
            start_screen.stimulus = ('<div class="instruc"><p>Task ').concat(taskCounter).concat(' of 7</p><p>Welcome to the Pitch Difference Task.</p><p>In this task, you will listen to tones and judge if they are <b>HIGHER or LOWER</b> in pitch from each other.</p><p>Please put on your headphones and click <b>NEXT</b> to listen to some examples of these stimuli.</p></div>');
        },
        choices: ['img/next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>'
    }

    var example1 = {
        type: 'html-button-response',
        stimulus: '<p>Here is an example of a <b>HIGHER</b> pitched second tone.</p>',
        choices: ['img/next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>',
        post_trial_gap: 300,
        prompt: "<p>Click <b>NEXT</b> to continue.</p>",
        on_start: function(example1){
            //play_tones(rove, diff, high_low_same, gap_dur)
            play_tones(rove,demoNoteDiff[nExample],0,gap_dur);
        }
    }

    var example2 = {
        type: 'html-button-response',
        stimulus: '<p>Here is an example of a <b>LOWER</b> pitched second tone.</p>',
        choices: ['img/next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>',
        post_trial_gap: 300,
        prompt: "<p>Click <b>NEXT</b> to continue.</p>",
        on_start: function(example2){
            play_tones(rove,demoNoteDiff[nExample],1,gap_dur);
            nExample++;
        }
    }

    // sets up the looping of the examples
    var example_loop = {
        timeline: [example1,example2],
        loop_function: function() {
            return nExample<2; // as long as this returns TRUE, keep repeating
        }
    }

    // Final screen before beginning the experiment; reminds instructions
    var example_wrap = {
        type: 'html-button-response',
        stimulus: '<div class="instruc"><p><b>READY?</b></p><p>To recap, you will listen to 100 pairs of tones. You will be asked if the 2 tones are <b>HIGHER or LOWER</b> in pitch.</p><p>You will receive feedback for each response. You will have an opportunity to take a break halfway through.</p><p>Please put your headphones on now before beginning and try your best!</p><p>Click <b>NEXT</b> to begin.</p></div>',
        post_trial_gap: 600,
        choices: ['img/next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>' 
    }

    //////////////////////////////////////////////////////////////////////////////////////

    // Trial components

    //////////////////////////////////////////////////////////////////////////////////////


    //Playback screen
    var playback = {
        type: "html-keyboard-response",
        stimulus: "",
        choices: ['q'],
        on_start: function(playback) {
            cur_type = trials_type[cur_trial];
            //higher (0), lower (1), or same (2)

            playback.trial_duration = 2*500+gap_dur*1000;

            // Set diff based on which staircase we are on
            diff = staircase[cur_trial] == 0? diff1:diff2;

            //Play the specified stim and hold onto its specs
            //play_tones(rove, diff, high_low_same, gap_dur)
            trial_obj = play_tones(rove,diff,cur_type,gap_dur);

        },
        on_finish: function(data){
            if (inits=='debug' && jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)=='q'){ // option to skip for testing purposes
                //NaN because no answer provided on this trial
                trial_resp = NaN;

                //Skip the current timeline (i.e., go to next level)
                jsPsych.endCurrentTimeline();
            }
        }
    }

    //Trial screen
    var trial = {
        type: "html-button-response",
        stimulus: "",
        choices: ['Higher','Lower'],
        on_start: function(trial) {
            //Set up text for this trial
            trial.stimulus = ("<p><b>Trial ").concat([cur_trial+1].toString()).concat(" of ").concat(ntrials.toString()).concat("</b></p><p>Was the 2nd pitch HIGHER or LOWER than the 1st pitch?</p>");                  
        },
        on_finish: function(data) {
            //Check correctness to provide feedback
            corr_ans = cur_type;

            let trial_resp = data.button_pressed;

            //Update globals so feedback screen is accurate; update staircase
            if(trial_resp == corr_ans) { // if correct
                last_correct = true;
                total_correct++;

                // tally a correct response for the staircase if applicable    
                        if(staircase[cur_trial] == 0){ // staircase 0
                            staircase_track0++;
                            if(cur_trial>3 && staircase_track0 > 2){
                            // If there have been 3 trials with staircase 0, then cur_trial must be >=4.
                            // Adjust diff if 3 correct in a row for this staircase
                                diff1 = 0.9*diff;
                            } else{
                                diff1 = diff/0.9; // if <3 trials or last 3 not correct
                                if(diff1>maxDiff)
                                    diff1 = maxDiff;
                            }
                        } else { // staircase 1
                            staircase_track1++;
                            if(cur_trial>4 && staircase_track1 > 2){
                            // If there have been 3 trials with staircase 1, then cur_trial must be >=5.
                            // Adjust diff if 3 correct in a row for this staircase
                                diff2 = 0.7*diff;
                            } else{
                                diff2 = diff/0.7; // if <3 trials or last 3 not correct
                                if(diff2>maxDiff)
                                    diff2 = maxDiff;
                            }
                        } 

            } else { // if incorrect
                last_correct = false;

                // reset the staircase if incorrect response, if applicable
                if(staircase[cur_trial] == 0){
                    staircase_track0 = 0;
                    diff1 = diff/0.9;
                    if(diff1>maxDiff)
                        diff1 = maxDiff;
                } else {
                    staircase_track1 = 0;
                    diff2 = diff/0.7;
                    if(diff2>maxDiff)
                        diff2 = maxDiff;
                }               
            }

            //Append the trial parameters and results to the data array
            trialData = trialData.concat({
                subj_inits: inits,
                subj_email: email,
                lang: lang,
                lang_other: lang_other,
                years_train: years_train,
                device_samp_hz: fs,
                headphoneCheck: calibrateScore,
                taskCounter: taskCounter,
                taskID: taskID,
                trialNum: cur_trial+1,
                trial_type: cur_type,//higher, lower, or same
                response: trial_resp,
                stimSet0: trial_obj.freq1,
                stimSet1: trial_obj.freq2,
                stimSet2: NaN,
                stimSet3: NaN,
                stimSet4: NaN
            });
        }
    }

    //Feedback screen
    var feedback = {
        type: "html-button-response",
        stimulus: "Error! This text should not appear!",
        choices: [],
        trial_duration: 700,
        post_trial_gap: 150,
        on_start: function(feedback){
            //Stop stim if it's still going (should be redundant due to playback trial duration)
            stop_stim();
            if (last_correct){
                feedback.stimulus = "<p style='color:green'><b>CORRECT</b></p>"
            }else{
                feedback.stimulus = "<p style='color:red'><b>INCORRECT</b></p>"
            }
        },
        on_finish: function(feedback){
            cur_trial++;
        }
    }

    //Block timeline
    var block_timeline = {
        timeline: [playback, trial, feedback],
        repetitions: ntrials/2
    }

    //////////////////////////////////////////////////////////////////////////////////

    // Break screen (pause within a task)

    //////////////////////////////////////////////////////////////////////////////////////

    var break_screen = {
        type: "html-button-response",
        stimulus: "<p>You are halfway through this task!</p><p>You can take a break, but do NOT refresh the page or use your browser's forward/back buttons, or you will lose your progress.</p><p>Click <b>NEXT</b> to resume the experiment.</p><p>To recap:<br>In this task, you are judging if tones are <b>HIGHER or LOWER</b> in pitch.</p>",
        choices: ['img/next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>'
    }    

    //////////////////////////////////////////////////////////////////////////////////////

    // End screen for a task

    //////////////////////////////////////////////////////////////////////////////////////

    //Thank you page
    var end_screen = {
        type: "html-button-response",
        stimulus: '',
        choices: ['img/next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>',
        on_start: function(end_screen) {
            let p_corr = total_correct / cur_trial;
            
            end_screen.stimulus = ('<p>You have finished this task. Yay!</p><p>Percent correct = ').concat(Math.round(p_corr *100).toString()).concat('%</p><p>You have<b> ').concat(7-taskCounter).concat(' </b>tasks remaining.</p><p>Click <b>NEXT</b> to continue.</p>');
            
            saveMyData(trialData);
        }
    }
    timeline.push(start_screen,example_loop,example_wrap,block_timeline,break_screen,block_timeline,end_screen);
    
    return [[],[]]
           
}