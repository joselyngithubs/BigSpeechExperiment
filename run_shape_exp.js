function run_shape_exp(timeline,taskCounter){
       
        var currTrial = 0;                  // note that trials are 0-35 rather than 1-36
        var currStim = ['','',''];          // the set of 3 images shown on each trial
        var audioFile;                      // the word recording that is played
        var userAns;                        // user response
        var corrAns;                        // correct answer (position of the image: 0,1,2)
        var numCorrect = 0;                 // keeps track of correct responses
        
        var buttonArray = ['class="image"/>','class="image"/>','class="image"/>'];
                                            // formatting for buttons in feedback screens
        
        var tmpindx;                        // temporary variable for shuffling purposes
        var tmpStim = ['','',''];           // temporary variable for shuffling purposes
        
        
        var skip = false;                   // for testing purposes
        
        var imgExamples = [
            [
                'ShapeStims_shapes/dulenan.png',
                'ShapeStims_shapes/bevedis.png',
                'ShapeStims_shapes/biravu.png',
                'next.png'                
            ],
            [
                'ShapeStims_shapes/dumulene.png',
                'ShapeStims_shapes/binelud.png',
                'ShapeStims_shapes/dalorig.png',
                'next.png'
            ],
            [
                'ShapeStims_shapes/galelom.png',
                'ShapeStims_shapes/binenule.png',
                'ShapeStims_shapes/damidil.png',
                'next.png'
            ]
        ]
        var audioExamples = [
            [
                'ShapeStims/dulenan.wav',
                'ShapeStims/bevedis.wav',
                'ShapeStims/biravu.wav'        
            ],
            [
                'ShapeStims/dumulene.wav',
                'ShapeStims/binelud.wav',
                'ShapeStims/dalorig.wav'
            ],
            [
                'ShapeStims/galelom.wav',
                'ShapeStims/binenule.wav',
                'ShapeStims/damidil.wav'
            ]
        ]
        
        // setup main stimuli
        var tmp = [];
        for (var i=0;i<=35;i++) {
            tmp.push(i);
        } // create array of 0:35 (length 36)
        // 0:11 --> condition A
        // 12:23 --> cond B
        // 24:35 --> cond C
        idx = jsPsych.randomization.repeat(tmp,1); // shuffle
        
        // setup distractor set 
        var setA = tmp.slice(0,12);
        var setB = tmp.slice(12,24);
        var setC = tmp.slice(24);
        var distract1 = jsPsych.randomization.repeat(setB,1).concat(jsPsych.randomization.repeat(setC,1)).concat(jsPsych.randomization.repeat(setA,1)); // part 1 distractors for stims A, B, C respectively    
        var distract2 = jsPsych.randomization.repeat(setC,1).concat(jsPsych.randomization.repeat(setA,1)).concat(jsPsych.randomization.repeat(setB,1)); // part 2 distractors for stims A, B, C respectively   
        
        var audio = [
            'ShapeStims/bebinege.wav',
            'ShapeStims/berolele.wav',
            'ShapeStims/bonobor.wav',
            'ShapeStims/dagadabe.wav',
            'ShapeStims/degamene.wav',
            'ShapeStims/divigure.wav',
            'ShapeStims/doganov.wav',
            'ShapeStims/donaner.wav',
            'ShapeStims/doninene.wav',
            'ShapeStims/dorageg.wav',
            'ShapeStims/gamanan.wav',
            'ShapeStims/genegile.wav',
            'ShapeStims/balevel.wav',
            'ShapeStims/benerad.wav',
            'ShapeStims/binonere.wav',
            'ShapeStims/bovulen.wav',
            'ShapeStims/bugerade.wav',
            'ShapeStims/bulodole.wav',
            'ShapeStims/degoruge.wav',
            'ShapeStims/derogibe.wav',
            'ShapeStims/dodidar.wav',
            'ShapeStims/domimune.wav',
            'ShapeStims/galanan.wav',
            'ShapeStims/gemelole.wav',
            'ShapeStims/badadin.wav',
            'ShapeStims/bedeben.wav',
            'ShapeStims/beledan.wav',
            'ShapeStims/delemon.wav',
            'ShapeStims/dinideg.wav',
            'ShapeStims/diranel.wav',
            'ShapeStims/dodanen.wav',
            'ShapeStims/doguden.wav',
            'ShapeStims/dologan.wav',
            'ShapeStims/donebin.wav',
            'ShapeStims/dunilid.wav',
            'ShapeStims/gedurog.wav'
        ];
        
        var img = [
            'ShapeStims_shapes/bebinege.png',
            'ShapeStims_shapes/berolele.png',
            'ShapeStims_shapes/bonobor.png',
            'ShapeStims_shapes/dagadabe.png',
            'ShapeStims_shapes/degamene.png',
            'ShapeStims_shapes/divigure.png',
            'ShapeStims_shapes/doganov.png',
            'ShapeStims_shapes/donaner.png',
            'ShapeStims_shapes/doninene.png',
            'ShapeStims_shapes/dorageg.png',
            'ShapeStims_shapes/gamanan.png',
            'ShapeStims_shapes/genegile.png',
            'ShapeStims_shapes/balevel.png',
            'ShapeStims_shapes/benerad.png',
            'ShapeStims_shapes/binonere.png',
            'ShapeStims_shapes/bovulen.png',
            'ShapeStims_shapes/bugerade.png',
            'ShapeStims_shapes/bulodole.png',
            'ShapeStims_shapes/degoruge.png',
            'ShapeStims_shapes/derogibe.png',
            'ShapeStims_shapes/dodidar.png',
            'ShapeStims_shapes/domimune.png',
            'ShapeStims_shapes/galanan.png',
            'ShapeStims_shapes/gemelole.png',
            'ShapeStims_shapes/badadin.png',
            'ShapeStims_shapes/bedeben.png',
            'ShapeStims_shapes/beledan.png',
            'ShapeStims_shapes/delemon.png',
            'ShapeStims_shapes/dinideg.png',
            'ShapeStims_shapes/diranel.png',
            'ShapeStims_shapes/dodanen.png',
            'ShapeStims_shapes/doguden.png',
            'ShapeStims_shapes/dologan.png',
            'ShapeStims_shapes/donebin.png',
            'ShapeStims_shapes/dunilid.png',
            'ShapeStims_shapes/gedurog.png'
        ];
        
        //////////////////////////////////////////////////////////////////////////////////////
        
        // Start Screen (instructions)
        var start_screen = {
            type: 'html-button-response',
            stimulus: '<div class="instruc"><p><b>Welcome to the SHAPE TASK!</b></p><p>You will listen to 36 nonsense words. For each word, you will choose the shape that best matches the pitch contour of the word. So, you should only pay attention to the changes in PITCH in each word, and choose the shape that best represents these pitch changes.</p><p>Please put on your headphones and click <b>NEXT</b> to listen to some examples of words for each shape.</p></div>',
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="repeatbutton"/>'
        }
        
        
        // Example Screen Part 1 of 2: shows the images for the user to click
        var whichExample = 1;
        var currExamples = [];
        var example_display = {
            type: 'html-button-response',
            stimulus: '',
            choices: '',
            on_start: function (example){
                
                currExamples = imgExamples[whichExample-1];
                example.choices = currExamples;
                
                example.prompt = ('<div class="trialtext"><b>EXAMPLES: Set ').concat(whichExample).concat(' of 3</b><br>Click on each shape to listen to the word that corresponds to it.<br>When you are ready to move on to the next set of examples, click <b>NEXT</b>.</div>');
                
                example.button_html = [
                    '<img src="%choice%" style = "position:fixed; top: 1vh; right: 10vw" class="image"/>',
                    '<img src="%choice%" style = "position:fixed; top: 34vh; right: 10vw" class="image"/>',
                    '<img src="%choice%" style = "position:fixed; top: 67vh; right: 10vw" class="image"/>',
                    '<img src="%choice%" class="repeatbutton"/>'
                ];
            },
            on_finish: function(example){
                userAns= example.button_pressed;
            }
        }
        
        // Example Screen Part 2 of 2: plays the audio of the image that the user clicked
        var example_audio = {
            type: 'audio-button-response',
            stimulus: '',
            choices: '',
            trial_duration: [],
            on_start: function(example_audio){
                if(userAns==3){
                   example_audio.trial_duration = 1;
                    whichExample++;
                   }
                else{
                    example_audio.trial_duration = 1200;
                    
                    example_audio.stimulus = audioExamples[whichExample-1][userAns];
                
                    example_audio.prompt = ('<div class="trialtext"><b>EXAMPLES: Set ').concat(whichExample).concat(' of 3</b><br>Click on each shape to listen to the word that corresponds to it.<br>When you are ready to move on to the next set of examples, click <b>NEXT</b>.</div>');

                    example_audio.choices = currExamples;
                    example_audio.button_html = [
                        '<img src="%choice%" style = "position:fixed; top: 1vh; right: 10vw" class="image"/>',
                        '<img src="%choice%" style = "position:fixed; top: 34vh; right: 10vw" class="image"/>',
                        '<img src="%choice%" style = "position:fixed; top: 67vh; right: 10vw" class="image"/>',
                        '<img src="%choice%" class="repeatbutton"/>'
                    ];
                }                
            }
        }
        
        // sets up the looping of the examples
        var example_loop = {
            timeline: [example_display, example_audio],
            loop_function: function() {
                return whichExample<4; // as long as this returns TRUE, keep repeating
            }
        }
        
        
        // Final screen before beginning the experiment; reminds instructions
        var example_wrap = {
            type: 'html-button-response',
            stimulus: '<div class="instruc"><p><b>READY?</b></p><p>To recap, you will listen to 36 nonsense words.</p><p>On each trial, you will hear 1 word and see 3 shapes.</p><p>Your job is to choose the shape that best matches the pitch contour of the word.</p><p>You will indicate your choice by clicking the shape.</p><p>You will receive feedback on whether your answer is correct.</p><p>Please put your headphones on now before beginning and try your best!</p><p>Click <b>NEXT</b> to begin.</p></div>',
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="repeatbutton"/>' 
        }
        
        
        //EXPERIMENTAL TASK
        // Part 1 of 3 of a Trial: playing the stimulus
        var repeat = false; // determine whether to replay the word audio
        var play_word = {
            type: 'audio-keyboard-response',
            choices: 'q',
            stimulus: '',
            trial_duration: 1500,
            on_start: function (play_word){
                // setup which word gets played, and the set of images
                if (repeat==false){ // only set new audioFile and stim set if this is a brand new trial
                    audioFile = audio[idx[currTrial]];
                    tmpStim = [
                        img[idx[currTrial]],
                        img[distract1[idx[currTrial]]],
                        img[distract2[idx[currTrial]]]
                    ];             
                
                    // shuffle the order of the current set of 3 images
                    tmpindx = jsPsych.randomization.repeat([0,1,2], 1);
                    currStim[tmpindx[0]] = tmpStim[0];
                    currStim[tmpindx[1]] = tmpStim[1];
                    currStim[tmpindx[2]] = tmpStim[2];
                
                    corrAns = tmpindx[0];
                    
                    if(idx[currTrial]>23)
                        condition = 'C';
                    else if(idx[currTrial]>11)
                        condition = 'B';
                    else
                        condition = 'A';
                }
                
                play_word.stimulus = audioFile;
            },
            on_finish: function(data){
                if (jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)=='q'){ // option to skip for testing purposes
                    //NaN because no answer provided on this trial
                    userAns = NaN;
                    
                    skip = true;
                        
                    //Skip the current timeline (will jump to feedback page)
                    jsPsych.endCurrentTimeline();
                }
            }
        }
        
        // Part 2 of 3 of a Trial: user response
        var num_repeat = 0; // keep track of how many times the participant repeated
        var userResp = {
            type: 'html-button-response',
            choices: '',
            stimulus: "",
            on_start: function(userResp){
                userResp.prompt = ("<div class='trialtext'><b>Trial ").concat((currTrial+1).toString()).concat(" of 36</b><br>Click the shape that best matches the pitch contour of the word that you heard.<br>To listen to the word again, click <b>REPEAT</b>.</div>");
                userResp.choices = [currStim[0],currStim[1],currStim[2],'repeat.png'];
                
                userResp.button_html = [
                    '<img src="%choice%" style = "position:fixed; top: 1vh; right: 10vw" class="image"/>',
                    '<img src="%choice%" style = "position:fixed; top: 34vh; right: 10vw" class="image"/>',
                    '<img src="%choice%" style = "position:fixed; top: 67vh; right: 10vw" class="image"/>',
                    '<img src="%choice%" class="repeatbutton"/>'
                ];
            },
            on_finish: function(data) {
                userAns= data.button_pressed;
                if (userAns==3){
                    repeat = true;
                    num_repeat++;
                }
                else{
                    repeat = false;
                }
            }
        }
        
        // setup a loop if participant wants to replay the word
        var trial_repeat = {
            timeline: [play_word,userResp],
            loop_function: function() {
                return repeat;
            }
        }
        
        // Part 3 of 3 of a Trial: display feedback
         var feedback ={
            type: 'html-button-response',
            choices: "",
            stimulus: "",
            on_start: function(userResp){
                if(skip)
                    jsPsych.endCurrentTimeline();
                
                // button formatting to display red/green border in feedback
                buttonArray[userAns] = 'class="feedbackwrong"/>';
                buttonArray[corrAns] = 'class="feedbackcorrect"/>';
                
                userResp.choices = currStim;
                    
                userResp.button_html = [('<img src="%choice%" style = "position:fixed; top: 1vh; right: 10vw;"' ).concat(buttonArray[0]),('<img src="%choice%" style = "position:fixed; top: 34vh; right: 10vw;"').concat(buttonArray[1]),('<img src="%choice%" style = "position:fixed; top: 67vh; right: 10vw"').concat(buttonArray[2])];
                
                if (corrAns==userAns){
                    userResp.prompt = ("<div class='trialtext'><b>Correct!</b><br>Click any image to continue.</div>");
                    numCorrect++;
                }
                else
                    userResp.prompt = ("<div class='trialtext'><b>Incorrect!</b><br>Click any image to continue.</div>");
            },
             on_finish: function(data){
                 buttonArray = ['class="image"/>','class="image"/>','class="image"/>']; 
                 
                 // save data
                 trialData = trialData.concat({
                     trialNum: currTrial+1,
                     condition: condition,
                     stimSet0: currStim[0],
                     stimSet1: currStim[1],
                     stimSet2: currStim[2],
                     word: audioFile,
                     correctAnswer: corrAns,
                     response: userAns,
                     correct: corrAns==userAns,
                     num_repeat: num_repeat
                });
                 
                 currTrial++;
                 num_repeat = 0;
             }
        }        
        
         // Combining the 3 parts of a trial
        var trial = {
            timeline: [trial_repeat,feedback],
            repetitions: 36
        };

        
        // Final screen at the end
        var end_screen = {
            type: 'html-button-response',
            stimulus: '',
            choices: ['next.png'],
            button_html: '<img src="%choice%" class="nextbutton"/>',
            on_start: function(end_screen) {
                let p_corr = numCorrect / currTrial;
                
                end_screen.stimulus = ('<p>You have finished this task. Yay!</p><p>Percent correct = ').concat(Math.round(p_corr *100).toString()).concat('%</p><p>You have<b> ').concat(5-taskCounter-1).concat(' </b>tasks remaining.</p><p>Click <b>NEXT</b> to continue.</p>');
            }
        }
        timeline.push(start_screen,example_loop,example_wrap,trial,end_screen);
       var audioToPreload = [audio,audioExamples];
       var imgToPreload = [img,imgExamples];
       
       return [audioToPreload,imgToPreload]
        
}