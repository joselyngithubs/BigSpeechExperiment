function run_headphone_check(timeline,taskCounter,taskID){
// Headphone Check (from McDermott lab, used in Woods et al. 2017)
// In this version, the timeline from a main index.html page is passed in. The headphoneCheck score is saved to a global variable trialData.
    
    var userAns;            
    var calibrateStims = [
        'HeadphoneCheck/antiphase_HC_IOS.wav',
        'HeadphoneCheck/antiphase_HC_ISO.wav',
        'HeadphoneCheck/antiphase_HC_OIS.wav',
        'HeadphoneCheck/antiphase_HC_OSI.wav',
        'HeadphoneCheck/antiphase_HC_SIO.wav',
        'HeadphoneCheck/antiphase_HC_SOI.wav'
    ];            
    var calibrateAns = [3,2,3,2,1,1];            
    var calibrateOrder = jsPsych.randomization.repeat([0,1,2,3,4,5],1);            
    var calibrateCurrTrial = 0;
    var calibrateScore = 0;

    var calibrate1 = {
        type: 'html-button-response',
        stimulus: '',
        prompt: '<p><b>Calibration</b></p><p>Please put on your headphones.</p><p>Turn your computer volume all the way DOWN. Then, press "calibrate" and increase your computer\'s volume until the calibration noise is at a loud but comfortable level.</p><p>Play the calibration sound as many times as you like. Press <b>Continue</b> when you are finished calibrating.</p><p>If the next page does not load, please switch to Google Chrome browser.</p>',
        choices: ['Calibrate','Continue'],
        on_finish: function(calibrate1){
            userAns= calibrate1.button_pressed;
        }
    }

    var calibrate2 = {
        type: 'audio-button-response',
        stimulus: '',
        prompt: '<p><b>Calibration</b></p><p>Please put on your headphones.</p><p>Press "calibrate" and adjust your computer\'s volume until the calibration noise is at a loud but comfortable level.</p><p>Play the calibration sound as many times as you like. Press <b>Continue</b> when you are finished calibrating.</p>',
        choices: ['Calibrate','Continue'],
        on_start: function(calibrate2){
            if(userAns==0){
                calibrate2.stimulus = 'HeadphoneCheck/noise_calib_stim.wav';
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
    timeline.push(calibrate_loop);

    var calibrateTestInstructions = {
        type: 'html-button-response',
        stimulus: '<p><b>Calibration</b></p><p>On the following 6 trials, you will hear 3 sounds separated by silences.</p><p>Simply judge WHICH SOUND WAS SOFTEST (quietest) -- 1, 2, or 3?</p><p>Test sounds can only be played once!</p><p>To begin, press <b>Start</b>.</p>',
        choices: ['Start'],
        post_trial_gap: 600
    }
    timeline.push(calibrateTestInstructions);

    var calibrateTrial = {
        type: 'audio-button-response',
        stimulus: '',
        prompt: 'Which sound was the SOFTEST (QUIETEST)?',
        choices: ['1','2','3'],
        post_trial_gap: 600,
        on_start: function(calibrateTrial){
            calibrateTrial.stimulus = calibrateStims[calibrateOrder[calibrateCurrTrial]];
        },
        on_finish: function(calibrateTrial){
            let ans = calibrateAns[calibrateOrder[calibrateCurrTrial]];
            if(calibrateTrial.button_pressed==ans-1){
                calibrateScore++;
            }                
            calibrateCurrTrial++;
        }                
    }

    var calibrationSeq = {
        timeline: [calibrateTrial],
        repetitions: 6
    }
    timeline.push(calibrationSeq);

    //Final page
    var calibrateFinish = {
        type: "html-button-response",
        stimulus: '<p>Calibration complete. Press <b>Continue</b> to move on.</p>',
        choices: ['Continue'],
        on_start: function(){
            trialData = trialData.concat({
                taskCounter: taskCounter,
                taskID: taskID,
                headphoneCheck: calibrateScore
            })
        }
    }            
    timeline.push(calibrateFinish);
    
    return [[calibrateStims,'HeadphoneCheck/noise_calib_stim.wav']] // for preloading purposes

}