function run_tonescramble_exp(timeline,taskCounter){
    
    //Number of trials
    var ntrials = 150; //total
    var nblocks = 3;

    //Random ordering of major/minor across trials, across blocks 
    var trials_type = jsPsych.randomization.repeat([1,2],ntrials/2);

    //Track current trial
    var cur_trial = 0;

    //Tracks whether the participant is ready to proceed past the examples
    var loop_again;

    //Other global variables
    var cur_type = NaN;         //Track current scramble type (easier than constantly indexing trials_type)
    var last_correct = false;   //Track correctness of latest response
    var total_correct = 0;      //Track total number of correct responses
    var trial_obj;              //Track the parameters of the latest stimulus

    //Set of emoji responses
    var emoji_1 = 'img/sad.png';
    var emoji_2 = 'img/happy.png';

    // Start Screen (instructions)
    var start_screen = {
        type: 'html-button-response',
        stimulus: '<div class="instruc"><p><b>Welcome to the TONE-SCRAMBLES TASK!</b></p><p>In this task, you will listen to tone sequences and judge them as <b>Type 1 (Minor/Sad)</b> or <b>Type 2 (Major/Happy)</b>.</p><p>Please put on your headphones and click <b>NEXT</b> to listen to some examples of these stimuli.</p></div>',
        choices: ['next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>',
        post_trial_gap: 600
    }

    //Example of Type 1 stimulus
    var example1 = {
        type: "html-button-response",
        stimulus: '<p>This sound is a <b>Type 1 (Minor/Sad)</b> stimulus.</p>',
        prompt: "<p>When you hear this type of sound, click on the picture above. Try it now.</p>",
        choices: ['img/sad.png','img/transparent_img.png'],
        button_html: ['<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>'],
        post_trial_gap: 300,
        on_start: function(example1) {        
            //Set the scramble types 
            cur_type = 1;

            //Play example
            trial_obj = play_scramble(cur_type);
        },
        on_finish: function(){
            //Stop scramble if still playing
            stop_scramble();
            }
        }

    //Example of Type 2 stimulus
    var example2 = {
        type: "html-button-response",
        stimulus: '<p>This sound is a <b>Type 2 (Major/Happy)</b> stimulus.</p>',
        prompt: "<p>When you hear this type of sound, click on the picture above. Try it now.</p>",
        choices: ['img/transparent_img.png','img/happy.png'],
        button_html: ['<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>'],
        post_trial_gap: 300,
        on_start: function(example1) {        
            //Set the scramble types 
            cur_type = 2;

            //Play example
            trial_obj = play_scramble(cur_type);
        },
        on_finish: function(){
            //Stop scramble if still playing
            stop_scramble();
            }
        }

    var example_wrap = {
        type: 'html-button-response',
        stimulus: '<div class="instruc"><p><b>READY?</b></p><p>To recap, you will listen to 3 sets of 50 tone sequences. You will be asked if you heard <b>Type 1 (Minor/Sad)</b> or <b>Type 2 (Major/Happy)</b>.</p><p>You will receive feedback for each response. You will have the opportunity to take a break after each set of 50.</p><p>Please put your headphones on now before beginning and try your best!</p><p>Click <b>NEXT</b> to begin.</p></div>',
        choices: ['next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>',
        post_trial_gap: 600
    }

    //Example loop
    var example_loop = {
        timeline: [example1, example2, example1, example2, example_wrap]                
    }

    //Playback screen
    var playback = {
        type: "html-keyboard-response",
        stimulus: "",
        choices: ['q'],
        trial_duration: NaN,
        on_start: function(playback) {
            playback.trial_duration = (65* 20);

            //Get the scramble types
            cur_type = trials_type[cur_trial];

            //Play the specified scramble and hold onto its specs
            trial_obj = play_scramble(cur_type);

            //Iterate trial number
            cur_trial++;
        },
        on_finish: function(data){
            if (jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)=='q'){
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
        stimulus: "Error! This text should not appear to the user!",
        choices: [emoji_1,emoji_2],
        button_html: '<img src="%choice%" class="imgbutton"/>',
        on_start: function(trial) {
            //Set up text for this trial
            let tag = "<p>Type 1 or Type 2?</p>";
            trial.stimulus = ("<p><b>Trial ").concat(cur_trial.toString()).concat(" of ").concat(ntrials.toString()).concat("</b></p>").concat(tag);                    
        },
        on_finish: function(data) {
            //Check correctness to provide feedback
            let trial_resp = Number(data.button_pressed) + 1;                                                 

            //Update globals so feedback screen is accurate
            if(trial_resp == cur_type) {
                last_correct = true;
                total_correct++;
            } else {
                last_correct = false;
            }

            //Append the trial parameters and results to the data array
            trialData = trialData.concat({

                cur_trial: cur_trial,
                response: trial_resp,
                scramble_type: cur_type,                        
                seq: trial_obj.seq,
                freqs: trial_obj.freqs,
            });
        }
    }

    //Feedback screen
    var feedback = {
        type: "html-keyboard-response",
        stimulus: "Error! This text should not appear!",
        choices: [],
        trial_duration: 700,
        post_trial_gap: 150,
        on_start: function(feedback){
            //Stop scramble if it's still going (should be redundant due to playback trial duration)
            stop_scramble();
            if (last_correct){
                feedback.stimulus = "<p style='color:green'><b>CORRECT</b></p>"
            }else{
                feedback.stimulus = "<p style='color:red'><b>INCORRECT</b></p>"
            }
        }
    }

    //Block timeline (playback-trial-feedback triples)
    var block_timeline = {
        timeline: [playback, trial, feedback],
        repetitions: ntrials/nblocks
    }

    var break_screen = {
        type: "html-button-response",
        stimulus: "<p>You are partway through this task!</p><p>You can take a break, but do NOT refresh the page or use your browser's forward/back buttons, or you will lose your progress.</p><p>Click <b>NEXT</b> to resume the experiment.</p><p>To recap:<br>In this task, you are judging tone sequences as <b>Type 1 (Minor/Sad)</b> or <b>Type 2 (Major/Happy)</b>.</p>",
        choices: ['next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>'
    }            

    //Thank you page
    var thank_you = {
        type: "html-button-response",
        stimulus: "",
        choices: ['next.png'],
        button_html: '<img src="%choice%" class="navbutton"/>',
        on_start: function(thank_you) {
            //Calculate percent correct
            let p_corr = total_correct / cur_trial;

            thank_you.stimulus = ('<p>You have finished this task. Yay!</p><p>Percent correct = ').concat(Math.round(p_corr *100).toString()).concat('%</p><p>You have<b> ').concat(5-taskCounter-1).concat(' </b>tasks remaining.</p><p>Click <b>NEXT</b> to continue.</p>');
        }
    }

    //Set up the experiment
    timeline.push(start_screen,example_loop,block_timeline,break_screen,block_timeline,break_screen,block_timeline,thank_you);  

    var imgToPreload = ['img/sad.png','img/happy.png','img/transparent_img.png'];

    return [[],imgToPreload]
}
