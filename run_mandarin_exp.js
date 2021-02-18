function run_mandarin_exp(timeline,taskCounter){

// Mandarin syllables discrimination task       
        
        var nTrials = 40;
        
        //var currBlock = 0;
        var currTrial = 0;                  // note that trials are 0-35 rather than 1-36
        
        var userAns;                        // user response
        var numCorrect = 0;                 // keeps track of correct responses
    
        var mandarinToneImg = ['MandarinStims/highlevel.png','MandarinStims/lowrising.png','MandarinStims/lowdipping.png', 'MandarinStims/highfalling.png'];
        
        var buttonArray = ['class="imgbutton"/>','class="imgbutton"/>','class="imgbutton"/>','class="imgbutton"/>'];
                                            // formatting for buttons in feedback screens
        
        var exampleStims = ['MandarinStims/examples/la1.mp3',
                             'MandarinStims/examples/la2.mp3',
                             'MandarinStims/examples/la3.mp3',
                             'MandarinStims/examples/la4.mp3'];
        
        var MandarinStims = [
            'MandarinStims/fen1.mp3','MandarinStims/fen2.mp3','MandarinStims/fen3.mp3','MandarinStims/fen4.mp3',
            'MandarinStims/fu1.mp3','MandarinStims/fu2.mp3','MandarinStims/fu3.mp3','MandarinStims/fu4.mp3',
            'MandarinStims/ma1.mp3','MandarinStims/ma2.mp3','MandarinStims/ma3.mp3','MandarinStims/ma4.mp3',
            'MandarinStims/po1.mp3','MandarinStims/po2.mp3','MandarinStims/po3.mp3','MandarinStims/po4.mp3',
            'MandarinStims/she1.mp3','MandarinStims/she2.mp3','MandarinStims/she3.mp3','MandarinStims/she4.mp3',
            'MandarinStims/shi1.mp3','MandarinStims/shi2.mp3','MandarinStims/shi3.mp3','MandarinStims/shi4.mp3',
            'MandarinStims/xie1.mp3','MandarinStims/xie2.mp3','MandarinStims/xie3.mp3','MandarinStims/xie4.mp3',
            'MandarinStims/yi1.mp3','MandarinStims/yi2.mp3','MandarinStims/yi3.mp3','MandarinStims/yi4.mp3',
            'MandarinStims/ying1.mp3','MandarinStims/ying2.mp3','MandarinStims/ying3.mp3','MandarinStims/ying4.mp3',
            'MandarinStims/you1.mp3','MandarinStims/you2.mp3','MandarinStims/you3.mp3','MandarinStims/you4.mp3' 
        ];
        
        var tone = [1,2,3,4,
                        1,2,3,4,
                       1,2,3,4,
                       1,2,3,4,
                       1,2,3,4,
                       1,2,3,4,
                       1,2,3,4,
                       1,2,3,4,
                       1,2,3,4,
                       1,2,3,4];
                
        var order = [];        
        for (var i=0;i<=39;i++) {
            order.push(i);
        } // create arrays of 0:39 (length 40)
        
        // shuffle array
        order = jsPsych.randomization.repeat(order,1);
        
        var toneLabel = ['High-level, −','Low-rising, /','Low-dipping, ∨','High-falling, &#92;'];
    
    var toneDescription = '<p style="text-align:left">The 4 tones are:<br><b>High-level, −:</b> begins at a high frequency and stays level<br><b>Low-rising, /:</b> begins at a low frequency and moves upward to a higher frequency<br><b>Low-dipping, ∨:</b> begins at a low frequency and dips before rising<br><b>High-falling, &#92;:</b> begins at a high frequency and moves downward to a lower frequency</p>';
        
        //////////////////////////////////////////////////////////////////////////////////////
        
        // Start Screen (instructions)
        var start_screen = {
            type: 'html-button-response',
            stimulus: '<div class="instruc"><p><b>Welcome to the MANDARIN SYLLABLES TASK!</b></p><p>You will listen to Mandarin Chinese syllables and identify which tone they are spoken in.</p><p>There are 4 possible tones, which attribute different lexical meanings to a syllable.</p><p>Click <b>NEXT</b> to learn more about these tones.</p></div>',
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>'
        }
        timeline.push(start_screen);
        
        var tone_summary = {
            type: 'html-button-response',
            stimulus: toneDescription.concat('<p>Please put on your headphones and click <b>NEXT</b> to hear examples of these tones.</p>'),
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>'
        }
        //timeline.push(tone_summary);
        
        // Example Screen Part 1 of 2: shows the images for the user to click
        var listened = [false,false,false,false,true];
        var example_display = {
            type: 'html-button-response',
            stimulus: '',
            choices: ['MandarinStims/highlevel.png','MandarinStims/lowrising.png','MandarinStims/lowdipping.png', 'MandarinStims/highfalling.png'],
            button_html: ['<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>'],
            prompt: toneDescription.concat('<p><b>Click on each image to hear an example of that tone.</b></p><p>You can listen to each example more than once.</p>'),
            on_start: function(example_display){
                
                if(listened.every(Boolean)){ // if subject has played all tones, then they can proceed
                    example_display.prompt = example_display.prompt.concat('<p>When you are ready to move on, click <b>NEXT</b>.</p>');
                    example_display.choices = ['MandarinStims/highlevel.png','MandarinStims/lowrising.png','MandarinStims/lowdipping.png', 'MandarinStims/highfalling.png','next.png'];
                    example_display.button_html = ['<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="navbutton"/>'];
                }                
            },
            on_finish: function(example){
                userAns= example.button_pressed;
                listened[userAns] = true;
            }
        }
        
        // Example Screen Part 2 of 2: plays the audio of the image that the user clicked
        var example_audio = {
            type: 'audio-button-response',
            stimulus: '',
            choices: ['MandarinStims/highlevel.png','MandarinStims/lowrising.png','MandarinStims/lowdipping.png', 'MandarinStims/highfalling.png'],
            button_html: ['<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>'],
            prompt: toneDescription.concat('<p><b>Click on each image to hear an example of that tone.</b></p><p>You can listen to each example more than once.</p>'),
            trial_duration: [],
            on_start: function(){
                if(userAns==4){
                   this.trial_duration = 1;
                   }
                else{
                    this.trial_duration = 500;
                    this.stimulus = exampleStims[userAns];
                }                
            }
        }
        
        // sets up the looping of the examples
        var example_loop = {
            timeline: [example_display, example_audio],
            loop_function: function() {
                return userAns<4; // as long as this returns TRUE (user doesn't click NEXT), keep repeating
            }
        }       
        timeline.push(example_loop);
        
        var preblock = {
            type: 'html-button-response',
            stimulus: '<div class="instruc"><p><b>READY?</b></p><p>To recap, you will listen to 40 syllables and will be asked which of the 4 tone patterns you heard. You will receive feedback for each response.</p><p>Please put your headphones on now before beginning and try your best!</p><p>Click <b>NEXT</b> to begin.</p></div>',
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>' 
        }
        timeline.push(preblock);
        
        //EXPERIMENTAL TASK
        var currTrial = 0;
        var play_word = {
            type: 'audio-keyboard-response',
            choices: 'q',
            stimulus: '',
            trial_duration: 1100,
            on_start: function (play_word){
                // setup which word gets played
                play_word.stimulus = MandarinStims[order[currTrial]];
                play_word.prompt = ("<div class='trialtext'><b>Trial ").concat((currTrial+1).toString()).concat(" of ").concat(nTrials.toString()).concat(": Which tone did you hear?</div>");
            },
            on_finish: function (data){
                if (jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)=='q'){ // option to skip for testing purposes
                    //NaN because no answer provided on this trial
                    userAns = NaN;
                        
                    //Skip the current timeline (i.e., go to next level)
                    jsPsych.endCurrentTimeline();
                }
            }
        }
        
        var get_response = {
            type: 'html-button-response',
            choices: ['MandarinStims/highlevel.png','MandarinStims/lowrising.png','MandarinStims/lowdipping.png', 'MandarinStims/highfalling.png'],
            stimulus: '',
            button_html: ['<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>','<img src="%choice%" class="imgbutton"/>'],
            on_start: function (play_word){
                            
                play_word.prompt = ("<div class='trialtext'><b>Trial ").concat((currTrial+1).toString()).concat(" of ").concat(nTrials.toString()).concat(": Which tone did you hear?</div>");
            },
            on_finish: function (play_word){
                userAns= play_word.button_pressed;
            }
        }
        
        // Feedback
         var feedback ={
            type: 'html-button-response',
            choices: '',
            stimulus: "",
            on_start: function(feedback){
                
                if (tone[order[currTrial]]==(Number(userAns)+1)){
                    //feedback.prompt = ("<div class='trialtext' style='color:green'><b>Correct, the answer was ").concat(toneLabel[tone[order[currTrial]]-1]).concat("</b></div>");
                    
                    feedback.prompt = ("<div class='trialtext' style='color:green'><b>Correct!</b> Click any symbol to continue.</div>");
                    numCorrect++;
                }
                else{                    
                    feedback.prompt = ("<div class='trialtext' style='color:red'><b>Incorrect!</b> Click any symbol to continue.</div>");
                }
                
                // button formatting to display red/green border in feedback
                buttonArray[Number(userAns)] = 'class="imgbutton feedbackwrong"/>';
                buttonArray[tone[order[currTrial]]-1] = 'class="imgbutton feedbackcorrect"/>';
                
                feedback.choices = ['MandarinStims/highlevel.png','MandarinStims/lowrising.png','MandarinStims/lowdipping.png', 'MandarinStims/highfalling.png'];
                    
                feedback.button_html = [('<img src="%choice%"' ).concat(buttonArray[0]),('<img src="%choice%"').concat(buttonArray[1]),('<img src="%choice%"').concat(buttonArray[2]),('<img src="%choice%"' ).concat(buttonArray[3])];
                
            },
             on_finish: function(data){
                 
                 // reset buttonArray
                 buttonArray = ['class="imgbutton"/>','class="imgbutton"/>','class="imgbutton"/>','class="imgbutton"/>'];
                 
                 // save data
                 trialData = trialData.concat({
                     trialNum: currTrial+1,
                     stim: MandarinStims[order[currTrial]],
                     tone: tone[order[currTrial]],
                     response: Number(userAns) + 1,
                     correct: tone[order[currTrial]]==(Number(userAns)+1)
                });
                 
                 currTrial++;
             }
        }        
        
         // Combining the 3 parts of a trial
        var trial = {
            timeline: [play_word,get_response,feedback],
            repetitions: nTrials,
        };
        timeline.push(trial);        
        
        // Final screen at the end
        var end_screen = {
            type: 'html-button-response',
            stimulus: '',
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(end_screen) {
                
               end_screen.stimulus = ('<p>You have finished this task. Yay!</p><p>Percent correct = ').concat(((numCorrect/currTrial)*100).toFixed(2)).concat('%</p><p>You have<b> ').concat(5-taskCounter-1).concat(' </b>tasks remaining.</p><p>Click <b>NEXT</b> to continue.</p>');
                
                }
        }
        timeline.push(end_screen);
        
        var imgToPreload = mandarinToneImg;
        
        var audioToPreload = [MandarinStims,exampleStims];
        
        return [audioToPreload,imgToPreload];
        
}