<!-- Speech perception task a la Morrill et al 2015 paper -->

function run_lanna_exp(timeline,taskCounter,taskID){
        
        var nBlocks = 2;
        var nTrials = 96;
        
        var currTrial = 0;                  // note that trials are 0-35 rather than 1-36
        
        var userAns;                        // user response
        var corrAns;                        // correct answer
        var numCorrect = 0;                 // keeps track of correct responses
        
        var LannaStims = ['LannaStims/lanna1.wav',
                          'LannaStims/lanna2.wav',
                          'LannaStims/lanna3.wav',
                          'LannaStims/lanna4.wav',
                          'LannaStims/lanna5.wav',
                          'LannaStims/lanna6.wav']
        
        var tmpArray = [1,2,3,4,5,6];
        var order = jsPsych.randomization.repeat(tmpArray,nTrials/6);
        
        //////////////////////////////////////////////////////////////////////////////////////
        
        // Start Screen (instructions)
        var start_screen = {
            type: 'html-button-response',
            stimulus: ('<div class="instruc"><p>Task ').concat(taskCounter).concat(' of 7</p><p><b>Welcome to the LANNAMARAINE TASK!</b></p><p>You will listen to speech stimuli and judge if they are Type 1 or Type 2.</p><p>Please put on your headphones and click <b>NEXT</b> to listen to some examples of these stimuli.</p></div>'),
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>'
        }
        timeline.push(start_screen);
        
        // Example 1
        var nExample = 0; // counter to keep track of num examples played
        var example1 = {
            type: 'audio-button-response',
            stimulus: '',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(example1){
                example1.stimulus = 'LannaStims/lanna1.wav';
                example1.prompt = ('Example ').concat(++nExample).concat(' of 16: This is a Type 1 stimulus.<p>Press <b>NEXT</b> to continue.</p>');                
            }
        }
        
        // Example 2
        var example2 = {
            type: 'audio-button-response',
            stimulus: '',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(example2){
                example2.stimulus = 'LannaStims/lanna6.wav';
                example2.prompt = ('Example ').concat(++nExample).concat(' of 16: This is a Type 2 stimulus.<p>Press <b>NEXT</b> to continue.</p>');
            }
        }
                
        // sets up the sequence of the examples
        var example_loop = {
            timeline: [example1, example2],
            loop_function: function() {
                return nExample<16; // as long as this returns TRUE, keep repeating
            }
        }
        timeline.push(example_loop);
        
        // Final screen before beginning the experiment; reminds instructions
        var example_wrap = {
            type: 'html-button-response',
            stimulus: '<div class="instruc"><p><b>READY?</b></p><p>To recap, you will listen to 2 blocks of 48 stimuli and will be asked if you heard Type 1 or Type 2. You will receive feedback for each response.</p><p>Please put your headphones on now before beginning and try your best!</p><p>Click <b>NEXT</b> to begin.</p></div>',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>' 
        }
        timeline.push(example_wrap);
        
        //EXPERIMENTAL TASK
        var play_word = {
            type: 'audio-keyboard-response',
            choices: 'q',
            stimulus: '',
            trial_duration: 1700,
            on_start: function (play_word){
                // setup which word gets played
                play_word.stimulus = LannaStims[order[currTrial]-1];
                    
                corrAns = Number(order[currTrial]>3) + 1; // stims 1,2,3 return 1; stims 4,5,6 return 2
                
                play_word.prompt = ("<b>Trial ").concat((currTrial+1).toString()).concat(" of ").concat(nTrials.toString());
            },
            on_finish: function (data){
                if (inits=='debug' && jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)=='q'){ // option to skip for testing purposes
                    //NaN because no answer provided on this trial
                    userAns = NaN;
                        
                    //Skip the current timeline (i.e., go to next level)
                    jsPsych.endCurrentTimeline();
                }
            }
        }
        
        var get_response = {
            type: 'html-button-response',
            choices: ['Type 1','Type 2'],
            stimulus: '',
            on_start: function (play_word){
                                
                play_word.stimulus = ("<b>Trial ").concat((currTrial+1).toString()).concat(" of ").concat(nTrials.toString());
            },
            on_finish: function (play_word){
                userAns= play_word.button_pressed;
            }
        }
        
        // Feedback
         var feedback ={
            type: 'html-button-response',
            choices: "",
            stimulus: "",
            trial_duration: 700,
            post_trial_gap: 150,
            on_start: function(feedback){
                
                if (corrAns==(Number(userAns)+1)){
                    feedback.stimulus = ("<p style='color:green'><b>Correct!</b></p>");
                    numCorrect++;
                }
                else
                    feedback.stimulus = ("<p style='color:red'><b>Incorrect!</b></p>");
            },
             on_finish: function(data){
                 
                 // save data
                 trialData = trialData.concat({
                     subj_inits: inits,
                     subj_email: email,
                     lang: lang,
                     lang_other: lang_other,
                     chinese: chinese,
                     years_train: years_train,
                     device_samp_hz: fs,
                     headphoneCheck: calibrateScore,
                     taskCounter: taskCounter,
                     taskID: taskID,
                     trialNum: currTrial+1,
                     trial_type: corrAns,
                     response: Number(userAns) + 1,
                     stimSet0: order[currTrial],
                     stimSet1: NaN,
                     stimSet2: NaN,
                     stimSet3: NaN,
                     stimSet4: NaN
                });
                 
                 currTrial++;
             }
        }        
        
         // Combining the 3 parts of a trial
        var trial = {
            timeline: [play_word,get_response,feedback],
            repetitions: nTrials/nBlocks
        };
        timeline.push(trial);
        
        var break_screen = {
            type: 'html-button-response',
            stimulus: '<div class="instruc"><p>Please take a break!</p><p>When you are ready, please put on your headphones and click <b>NEXT</b> to continue to the next block.</p><p>To recap, you will listen to speech stimuli and will be asked if you heard Type 1 or Type 2.</p></div>',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>'
        };
        timeline.push(break_screen,trial);
        
        // Final screen at the end
        var end_screen = {
            type: 'html-button-response',
            stimulus: '',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(end_screen) {
                
                end_screen.stimulus = ('<p>You have finished this task. Yay!</p><p>Percent correct = ').concat(((numCorrect/currTrial)*100).toFixed(2)).concat('%</p><p>You have<b> ').concat(7-taskCounter).concat(' </b>tasks remaining.</p><p>Click <b>NEXT</b> to continue.</p>');
              
                saveMyData(trialData);
            }
        }
        timeline.push(end_screen);
        
return [LannaStims,[]];
}