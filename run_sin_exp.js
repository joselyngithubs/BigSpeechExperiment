function run_sin_exp(timeline,taskCounter,taskID){ 

var stim = [
            [
                {fname: 'CrmStims/t0_070000_m1_000206_m7_010304.wav', ans: 0, label: 'blue-1', idx: 1},
                {fname: 'CrmStims/t0_070001_m1_000104_m4_010203.wav', ans: 1, label: 'blue-2', idx: 2},
                {fname: 'CrmStims/t0_070002_m2_010101_m5_060205.wav', ans: 2, label: 'blue-3', idx: 3},
                {fname: 'CrmStims/t0_070003_m2_050106_m5_000305.wav', ans: 3, label: 'blue-4', idx: 4},
                {fname: 'CrmStims/t0_070004_m3_000301_m7_020202.wav', ans: 4, label: 'blue-5', idx: 5},
                {fname: 'CrmStims/t0_070005_m1_050307_m5_000103_catch.wav', ans: 5, label: 'blue-6', idx: 6},
                {fname: 'CrmStims/t0_070006_m3_010100_m4_030203_catch.wav', ans: 6, label: 'blue-7', idx: 7},
                {fname: 'CrmStims/t0_070007_m2_040204_m7_030303.wav', ans: 7, label: 'blue-8', idx: 8},
                {fname: 'CrmStims/t0_070100_m1_000003_m4_060202.wav', ans: 8, label: 'red-1', idx: 9},
                {fname: 'CrmStims/t0_070101_m1_040305_m7_000000.wav', ans: 9, label: 'red-2', idx: 10},
                {fname: 'CrmStims/t0_070102_m2_060207_m5_010004.wav', ans: 10, label: 'red-3', idx: 11},
                {fname: 'CrmStims/t0_070103_m2_010307_m5_000204.wav', ans: 11, label: 'red-4', idx: 12},
                {fname: 'CrmStims/t0_070104_m3_040006_m4_000302.wav', ans: 12, label: 'red-5', idx: 13},
                {fname: 'CrmStims/t0_070105_m1_020204_m4_050002.wav', ans: 13, label: 'red-6', idx: 14},
                {fname: 'CrmStims/t0_070106_m3_020202_m7_010003.wav', ans: 14, label: 'red-7', idx: 15},
                {fname: 'CrmStims/t0_070107_m3_050304_m7_040205.wav', ans: 15, label: 'red-8', idx: 16},
                {fname: 'CrmStims/t0_070200_m3_010301_m5_040007.wav', ans: 16, label: 'white-1', idx: 17},
                {fname: 'CrmStims/t0_070201_m1_050300_m5_000102.wav', ans: 17, label: 'white-2', idx: 18},
                {fname: 'CrmStims/t0_070202_m2_020303_m7_050105.wav', ans: 18, label: 'white-3', idx: 19},
                {fname: 'CrmStims/t0_070203_m3_040100_m5_030306_catch.wav', ans: 19, label: 'white-4', idx: 20},
                {fname: 'CrmStims/t0_070204_m1_010002_m7_060307.wav', ans: 20, label: 'white-5', idx: 21},
                {fname: 'CrmStims/t0_070205_m2_040000_m7_030102.wav', ans: 21, label: 'white-6', idx: 22},
                {fname: 'CrmStims/t0_070206_m3_010300_m4_020102.wav', ans: 22, label: 'white-7', idx: 23},
                {fname: 'CrmStims/t0_070207_m3_060102_m5_020300.wav', ans: 23, label: 'white-8', idx: 24},
                {fname: 'CrmStims/t0_070300_m1_040205_m5_020103.wav', ans: 24, label: 'green-1', idx: 25},
                {fname: 'CrmStims/t0_070301_m1_010000_m5_020102.wav', ans: 25, label: 'green-2', idx: 26},
                {fname: 'CrmStims/t0_070302_m1_030205_m7_020000_catch.wav', ans: 26, label: 'green-3', idx: 27},
                {fname: 'CrmStims/t0_070303_m2_040107_m4_050004.wav', ans: 27, label: 'green-4', idx: 28},
                {fname: 'CrmStims/t0_070304_m2_010201_m4_060006.wav', ans: 28, label: 'green-5', idx: 29},
                {fname: 'CrmStims/t0_070305_m2_000203_m4_010106.wav', ans: 29, label: 'green-6', idx: 30},
                {fname: 'CrmStims/t0_070306_m3_030205_m7_010002.wav', ans: 30, label: 'green-7', idx: 31},
                {fname: 'CrmStims/t0_070307_m3_000006_m4_010105.wav', ans: 31, label: 'green-8', idx: 32}           
            ],
            [
                {fname: 'CrmStims/t6_070000_m7_050306_m2_060105_catch.wav', ans: 0, label: 'blue-1', idx: 33},
                {fname: 'CrmStims/t6_070001_m7_030104_m3_020305.wav', ans: 1, label: 'blue-2', idx: 34},
                {fname: 'CrmStims/t6_070002_m4_000107_m2_010206.wav', ans: 2, label: 'blue-3', idx: 35},
                {fname: 'CrmStims/t6_070003_m5_040305_m3_060204.wav', ans: 3, label: 'blue-4', idx: 36},
                {fname: 'CrmStims/t6_070004_m7_020306_m3_060107.wav', ans: 4, label: 'blue-5', idx: 37},
                {fname: 'CrmStims/t6_070005_m4_060307_m2_050101.wav', ans: 5, label: 'blue-6', idx: 38},
                {fname: 'CrmStims/t6_070006_m4_040304_m1_020101.wav', ans: 6, label: 'blue-7', idx: 39},
                {fname: 'CrmStims/t6_070007_m5_000304_m1_060206.wav', ans: 7, label: 'blue-8', idx: 40},
                {fname: 'CrmStims/t6_070100_m5_040302_m2_030206.wav', ans: 8, label: 'red-1', idx: 41},
                {fname: 'CrmStims/t6_070101_m5_000203_m2_060005.wav', ans: 9, label: 'red-2', idx: 42},
                {fname: 'CrmStims/t6_070102_m7_060206_m2_030305_catch.wav', ans: 10, label: 'red-3', idx: 43},
                {fname: 'CrmStims/t6_070103_m4_030001_m1_060302.wav', ans: 11, label: 'red-4', idx: 44},
                {fname: 'CrmStims/t6_070104_m5_020305_m3_050207.wav', ans: 12, label: 'red-5', idx: 45},
                {fname: 'CrmStims/t6_070105_m4_000204_m3_040301.wav', ans: 13, label: 'red-6', idx: 46},
                {fname: 'CrmStims/t6_070106_m4_040004_m3_030307.wav', ans: 14, label: 'red-7', idx: 47},
                {fname: 'CrmStims/t6_070107_m7_000002_m2_010203.wav', ans: 15, label: 'red-8', idx: 48},
                {fname: 'CrmStims/t6_070200_m5_060302_m1_010005.wav', ans: 16, label: 'white-1', idx: 49},
                {fname: 'CrmStims/t6_070201_m5_010003_m1_020100.wav', ans: 17, label: 'white-2', idx: 50},
                {fname: 'CrmStims/t6_070202_m4_040104_m3_050300_catch.wav', ans: 18, label: 'white-3', idx: 51},
                {fname: 'CrmStims/t6_070203_m7_040004_m3_020101.wav', ans: 19, label: 'white-4', idx: 52},
                {fname: 'CrmStims/t6_070204_m4_000003_m1_050102.wav', ans: 20, label: 'white-5', idx: 53},
                {fname: 'CrmStims/t6_070205_m4_040106_m2_010304.wav', ans: 21, label: 'white-6', idx: 54},
                {fname: 'CrmStims/t6_070206_m7_040101_m1_030005.wav', ans: 22, label: 'white-7', idx: 55},
                {fname: 'CrmStims/t6_070207_m5_010105_m3_020004.wav', ans: 23, label: 'white-8', idx: 56},
                {fname: 'CrmStims/t6_070300_m5_030201_m3_040002.wav', ans: 24, label: 'green-1', idx: 57},
                {fname: 'CrmStims/t6_070301_m5_040203_m2_050004.wav', ans: 25, label: 'green-2', idx: 58},
                {fname: 'CrmStims/t6_070302_m5_050106_m2_060205.wav', ans: 26, label: 'green-3', idx: 59},
                {fname: 'CrmStims/t6_070303_m7_030105_m3_050007.wav', ans: 27, label: 'green-4', idx: 60},
                {fname: 'CrmStims/t6_070304_m7_020003_m1_040201_catch.wav', ans: 28, label: 'green-5', idx: 61},
                {fname: 'CrmStims/t6_070305_m4_050206_m1_030001.wav', ans: 29, label: 'green-6', idx: 62},
                {fname: 'CrmStims/t6_070306_m4_030003_m2_040101.wav', ans: 30, label: 'green-7', idx: 63},
                {fname: 'CrmStims/t6_070307_m7_010101_m1_030203.wav', ans: 31, label: 'green-8', idx: 64}
            ]
        ];
        
        var example_stim = [
            [
                {fname: 'CrmStims/examples/t0_070204.wav', ans: 20, label: 'white-5'},
                {fname: 'CrmStims/examples/t0_070000.wav', ans: 0, label: 'blue-1'},
                {fname: 'CrmStims/examples/t0_070107.wav', ans: 15, label: 'red-8'},
                {fname: 'CrmStims/examples/t0_070303.wav', ans: 27, label: 'green-4'},
                {fname: 'CrmStims/examples/t0_070002.wav', ans: 2, label: 'blue-3'},
                {fname: 'CrmStims/examples/t0_070201.wav', ans: 17, label: 'white-2'},
                {fname: 'CrmStims/examples/t0_070305.wav', ans: 29, label: 'green-6'},
                {fname: 'CrmStims/examples/t0_070102.wav', ans: 10, label: 'red-3'},
                {fname: 'CrmStims/examples/t0_070106.wav', ans: 14, label: 'red-7'},
                {fname: 'CrmStims/examples/t0_070004.wav', ans: 4, label: 'blue-5'}                
            ],
            [
                {fname: 'CrmStims/examples/t6_070003.wav', ans: 3, label: 'blue-4'},
                {fname: 'CrmStims/examples/t6_070206.wav', ans: 22, label: 'white-7'},
                {fname: 'CrmStims/examples/t6_070102.wav', ans: 10, label: 'red-3'},
                {fname: 'CrmStims/examples/t6_070004.wav', ans: 4, label: 'blue-5'},
                {fname: 'CrmStims/examples/t6_070306.wav', ans: 30, label: 'green-7'},
                {fname: 'CrmStims/examples/t6_070300.wav', ans: 24, label: 'green-1'},
                {fname: 'CrmStims/examples/t6_070204.wav', ans: 20, label: 'white-5'},
                {fname: 'CrmStims/examples/t6_070103.wav', ans: 11, label: 'red-4'},
                {fname: 'CrmStims/examples/t6_070001.wav', ans: 1, label: 'blue-2'},
                {fname: 'CrmStims/examples/t6_070305.wav', ans: 29, label: 'green-6'}      
            ]
        ];
        
        var order = []; // create an array of 0:31 (length 32) 
        var preload_stim = []; // load up stim set solely for preloading purposes
        for (var i=0;i<=31;i++) {
            order.push(i); 
            preload_stim.push(stim[0][i]["fname"],stim[1][i]["fname"]);
            if(i<10)
                preload_stim.push(example_stim[0][i]["fname"],example_stim[1][i]["fname"]);
        }
                
        var stim_order = [jsPsych.randomization.repeat(order,1),jsPsych.randomization.repeat(order,1)];
        // stimulus order of the 2 blocks
        
        var block_order = jsPsych.randomization.repeat([0,1],1);
        // block order (which target speaker)
        
        
        var nBlocks = 2;
        var nTrials = 32;
        
        var currBlock = 0;
        var currTrial = 0;                  // note that trials are 0-31 rather than 1-32
        var curr_stim;
        var userAns;                        // user response
        var numCorrect = 0;                 // keeps track of correct responses        
        
        var isExample = true;               // whether we are on the example trials or "real" experiment
        
        var buttonArray = [
            '<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>','<button class="button button_blue">%choice%</button>', //blue
            '<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>','<button class="button button_red">%choice%</button>', //red
            '<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>','<button class="button button_white">%choice%</button>', //white
            '<button class="button">%choice%</button>','<button class="button">%choice%</button>','<button class="button">%choice%</button>','<button class="button">%choice%</button>','<button class="button">%choice%</button>','<button class="button">%choice%</button>','<button class="button">%choice%</button>','<button class="button">%choice%</button>' //green
        ];// formatting for buttons
        
        var buttonChoices = ['BLUE<br>1','BLUE<br>2','BLUE<br>3','BLUE<br>4','BLUE<br>5','BLUE<br>6','BLUE<br>7','BLUE<br>8','RED<br>1','RED<br>2','RED<br>3','RED<br>4','RED<br>5','RED<br>6','RED<br>7','RED<br>8','WHITE<br>1','WHITE<br>2','WHITE<br>3','WHITE<br>4','WHITE<br>5','WHITE<br>6','WHITE<br>7','WHITE<br>8','GREEN<br>1','GREEN<br>2','GREEN<br>3','GREEN<br>4','GREEN<br>5','GREEN<br>6','GREEN<br>7','GREEN<br>8']; // labels to appear on the screen
                
        
        //////////////////////////////////////////////////////////////////////////////////////
        
        // Start Screen (instructions)
        var start_screen = {
            type: 'html-button-response',
            stimulus: ('<div class="instruc"><p>Task ').concat(taskCounter).concat(' of 7</p><p>Welcome to the Speech-In-Noise Task.</p><p>In this task, you will listen to multiple voices speaking at the same time. Please pay attention only to the voice whose sentences start with the word <b>BARON.</b> On each trial, please identify the <b>COLOR</b> and <b>NUMBER</b> that this person says.</p><p>There will be 2 blocks of 32 trials each. Click <b>NEXT</b> to begin the 1st block.</p></div>'),
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>'
        }
        
        var calibrate1 = {
            type: 'html-button-response',
            stimulus: '',
            prompt: '<div class="instruc"><p>Before we begin, let\'s calibrate again.</p><p>Put on your headphones and turn your computer\'s volume down. Then, press "calibrate" and increase your volume until the calibration tone is at a comfortable level.</p><p>Play the calibration sound as many times as you like. Press <b>Continue</b> when you are finished calibrating.</p></div>',
            choices: ['Calibrate','Continue'],
            on_finish: function(calibrate1){
                    userAns= calibrate1.button_pressed;
                }
        }        
        var calibrate2 = {
            type: 'audio-button-response',
            stimulus: '',
            prompt: '<div class="instruc"><p>Before we begin, let\'s calibrate again.</p><p>Put on your headphones and press "calibrate" and adjust your computer\'s volume until the calibration tone is at a comfortable level.</p><p>Play the calibration sound as many times as you like. Press <b>Continue</b> when you are finished calibrating.</p></div>',
            choices: ['Calibrate','Continue'],
            on_start: function(calibrate2){
                    if(userAns==0){
                        calibrate2.stimulus = 'calibrate/calibration_tone.wav';
                        calibrate2.trial_duration = 1500;
                    }
                    else{
                        calibrate2.trial_duration = 250;
                    }
                }
        }
        var calibrate_loop = {
            timeline: [calibrate1,calibrate2],
            loop_function: function(){
                return userAns==0;
            }
        }
        
        // instructions prior to examples
        var example_instruc = {
            type: 'html-button-response',
            stimulus: currBlock==0? '<div class="instruc"><p>Before we start the next block of trials, let\'s go through some examples.</p><p>In these examples, you will only hear 1 voice at a time. Identify the <b>COLOR</b> and <b>NUMBER</b> that this voice says. You will click buttons on the screen to indicate your choice.</p><p>Click <b>NEXT</b> to try these examples.</p></div>' : '<div class="instruc"><p>In the next block of trials, you will repeat the task with a new voice. Before we start, let\'s go through some examples.</p><p>In these examples, you will only hear 1 voice at a time. Identify the <b>COLOR</b> and <b>NUMBER</b> that this voice says. You will click buttons on the screen to indicate your choice.</p><p>Click <b>NEXT</b> to continue.</p></div>',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(){
                isExample=true;
            }
        }
        
        //SIN TASK TRIAL PIECES
        var playback = {
            type: 'audio-keyboard-response',
            choices: 'q',
            stimulus: '',
            trial_duration: 2200,
            on_start: function (play_word){
                curr_stim = isExample? example_stim[block_order[currBlock]][currTrial]["fname"] : stim[block_order[currBlock]][stim_order[block_order[currBlock]][currTrial]]["fname"];
                play_word.stimulus = curr_stim;
                corr_ans = isExample? example_stim[block_order[currBlock]][currTrial]["ans"] : stim[block_order[currBlock]][stim_order[block_order[currBlock]][currTrial]]["ans"];
                
                play_word.prompt = ("<div class='trialtext'>Listen to the voice who says 'BARON'</div>");
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
            type: 'html-button-response-grid',
            choices: '',  
            stimulus: 'Which color-number did they say?',   
            margin_vertical: '8px', //margin_horizontal is 8px by default
            on_start: function (get_response){
                get_response.choices = buttonChoices; 
                get_response.button_html = buttonArray;
            },
            on_finish: function (get_response){
                userAns= Number(get_response.button_pressed);
                if(corr_ans==userAns) numCorrect++;
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
                    trialNum: currTrial+1,
                    trial_type: corr_ans,
                    response: userAns,
                    stimSet0: curr_stim,
                    stimSet1: isExample? NaN: stim[block_order[currBlock]][stim_order[block_order[currBlock]][currTrial]]["idx"], // index number from excel sheet,
                    stimSet2: block_order[currBlock], // which voice set (0 or 1)
                    stimSet3: NaN,
                    stimSet4: NaN
                });                 
                 currTrial++;
            }
        }        
        // Feedback only occurs during example trials
         var feedback ={
            type: 'html-button-response',
            choices: ['NEXT'],
            stimulus: "",           
            on_start: function(feedback){
                feedback.stimulus = (isExample? 'Example ':'Trial ').concat(currTrial).concat(' of ').concat(isExample?10:nTrials).concat(corr_ans==userAns? '<p style="color:green;"><b>CORRECT:</b></p>' : '<p style="color:red;"><b>INCORRECT:</b></p>').concat(isExample?example_stim[block_order[currBlock]][currTrial-1]["label"]:stim[block_order[currBlock]][stim_order[block_order[currBlock]][currTrial-1]]["label"]);   
            }
        }     
        
         var preblock = {
            type: 'html-button-response',
            choices: ['img/next.png'],
            stimulus: "<p>Great! Let\'s continue. In the next 32 trials, you will hear multiple voices speaking at the same time. Please only pay attention to the voice who says <b>BARON</b>. This is the <b>same</b> voice who you heard in the examples.</p><p>Identify the <b>COLOR</b> and <b>NUMBER</b> that this voice says. You will click buttons on the screen to indicate your choice.</p><p>This task may be difficult. Please try your best!</p><p>Press <b>NEXT</b> to begin.</p>",
            button_html: '<img src="%choice%" class="navbutton"/>',       
            on_start: function(){
                //reset for a "real" block
                isExample = false;
                currTrial = 0;
                numCorrect = 0;
             }
         }
         
        // Combining the parts of a trial
        var example = {
            timeline: [playback,get_response,feedback],
            repetitions: 10
        };
        var trial = {
            timeline: [playback,get_response,feedback],
            repetitions: nTrials
        };     
        
        var break_screen = {
            type: 'html-button-response',
            stimulus: '',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(break_screen){
                break_screen.stimulus = ('<div class="instruc"><p>Percent correct = ').concat(((numCorrect/currTrial)*100).toFixed(2)).concat('%</p><p>Please take a break!</p><p>When you are ready, please put on your headphones and click <b>NEXT</b> to continue to the next block.</p></div>');
                
                // reset for the new block
                currBlock++;
                currTrial = 0;
                numCorrect = 0;
            }
        };
        
        // Final screen at the end
        var end_screen = {
            type: 'html-button-response',
            stimulus: '',
            choices: ['img/next.png'],
            button_html: '<img src="%choice%" class="navbutton"/>',
            on_start: function(end_screen) {
                let p_corr = numCorrect / currTrial;
                
                end_screen.stimulus = ('<p>You have finished this task. Yay!</p><p>Percent correct = ').concat(Math.round(p_corr *100).toString()).concat('%</p><p>You have<b> ').concat(7-taskCounter).concat(' </b>tasks remaining.</p><p>Click <b>NEXT</b> to continue.</p>');
                
                saveMyData(trialData);
        }
        };
        
        timeline.push(start_screen,calibrate_loop,example_instruc,example,preblock,trial,break_screen,example_instruc,example,preblock,trial,end_screen);

        var audioToPreload = [preload_stim,'calibrate/calibration_tone.wav'];
        var imgToPreload = [];

       return [audioToPreload,imgToPreload]

}