//////////////////////////////////
// Setup
//////////////////////////////////

//See audio buffering example: https://mdn.github.io/webaudio-examples/audio-buffer/

//console.log('Warning: assuming fs=44100. Double-check system abilities! Then delete this warning.');
var fs;// = 44100;

const button = document.querySelector('button');
const myScript = document.querySelector('script');

let AudioContext = window.AudioContext || window.webkitAudioContext;
let aud_ctx;
let source;

//Mono
let channels = 1;

function init() {
    aud_ctx = new AudioContext();
    fs = aud_ctx.sampleRate;
}



//////////////////////////////////
// Tone generating functions
//////////////////////////////////

//Create array containing tone waveforms from array containing sequence of frequencies
function freqs_2_wave(freqs,gap_dur) {
    //Parameters
    let pip_duration = gap_dur==0? 0.0650:0.5;
    let pip_len      = Math.ceil(fs * pip_duration);
    let ramp_dur     = 0.0225;
    let r            = Math.ceil(ramp_dur * fs);

    //Create the ramp-damp mask
    let damp = sv_prod(1/2, sv_sum(1, cos_vec(sv_prod(Math.PI / r, Array.from(Array(r).keys())))));
    let ramp = sv_sum(1, sv_prod(-1, damp));
    let mask = ramp.concat(ones(pip_len - 2 * r).concat(damp));

    //Create stim waveform
    var waveform = new Array;
    for (let f = 0; f < freqs.length; f++) {
        if (Number.isNaN(freqs[f])) {
            waveform = waveform.concat(gen_gap(gap_dur));
        }else{
            waveform = waveform.concat(ew_prod(mask, cos_vec(sv_prod(2 * Math.PI * freqs[f] / fs, Array.from(Array(pip_len).keys())))))
        }
    }
    return waveform;
}

//Create array containing sequence of frequencies from an array containing a sequence of semitone distances from tonic, assuming TET    
function seq_2_freqs(seq, f_I) {
    let result = new Array(seq.length);
    for (let k = 0; k < seq.length; k++) {
        result[k] = f_I * Math.pow(2, seq[k] / 12);
    }
    return result;
}

//Create a sequence for the tone scramble
function gen_seq(stim_type) {
    
    //Number of pips per frequency (minimum 2)
    let n_each = 5;
    
    var SEQ;
    
    //Put all the notes in a vector
    SEQ = zeros(n_each).concat(sv_prod(2+stim_type, ones(n_each))).concat(sv_prod(7, ones(n_each))).concat(sv_prod(12, ones(n_each)));
    
    //Scramble the vector
    SEQ = v_i(SEQ, randperm(SEQ.length));
    
    return SEQ;
}


//Create a gap to separate the two tones
function gen_gap(gap_dur) {
    //Gap parameters
    //let isi_dur  = 1; // 1 sec
    let isi_len  = Math.ceil(fs * gap_dur);
    
    //Return gap waveform 
    return zeros(isi_len);
}

//////////////////////////////////
// Play tones
//////////////////////////////////
function play_tones(rove, diff, high_low_same, gap_dur) {
    // rove == 0, fixed; ==1, rove (whether or not the 1st tone freq is roved)
    // diff = freq difference (not actual hertz)
    // high_low_same == 0 -> the 2nd tone is higher
    // high_low_same == 1 -> the 2nd tone is lower
    // high_low_same == 2 -> same tones
    // gap dur == duration of gap (seconds)
    
    
    //Create audio context if it hasn't been made already (some browsers will prevent the audio context from being created before user input)
    if(!aud_ctx) {
        init();
    }
        
    //Set the 2 freqs
    let alpha = Math.pow(2,(1/12));
    var freq1;
    var freq2;
    var MinFreq;
    var MaxFreq;
    
    if(rove==0){ // fixed 1st tone
        freq1 = 440;
    } else{ // roved 1st tone
        // log(200 Hz) <= log(Freq1) < log(1600 Hz)
        let val = Math.random() * (Math.log(1600) - Math.log(200)) + Math.log(200);
        freq1 = Math.exp(val);        
    }
    
    // Danny Mann's code to set freq1...
    //var freq1 = Math.exp(Math.log(MinFreq)+Math.random()*(Math.log(MaxFreq)-Math.log(MinFreq)));
    
    // Min and Max freqs are no more than 1 octave below/above freq1 -- if listeners cannot hear an octave difference, then they already cannot do the task
    MinFreq = freq1/2;
    MaxFreq = freq1*2;
    
    if(high_low_same==2){ // 2 tones are the same
        freq2 = freq1;
    } else{
        let add_or_sub = [1,-1];
        freq2 = Math.exp(Math.log(freq1)+add_or_sub[high_low_same]*diff*Math.log(alpha));
        // if high_or_low==0 (2nd tone higher), add the diff
        // if high_or_low==1 (2nd tone lower), subtract the diff
        
        if(freq2>MaxFreq)
            freq2 = MaxFreq;
        else if(freq2<MinFreq)
            freq2 = MinFreq;
    }    

    var seq = [freq1,NaN,freq2]; //NaN is the isi
    
    //Create the waveform / PCM data
    var stim = freqs_2_wave(seq,gap_dur);    
    
    //Initialize the audio buffer for playback
    let frame_count = stim.length;
    let arr_buf = aud_ctx.createBuffer(channels, frame_count, aud_ctx.sampleRate);

    //Fill the buffer with the waveform
    for (let channel = 0; channel < channels; channel++) {
      //This gives us the actual array that contains the data
      let now_buffering = arr_buf.getChannelData(channel);
      for (let k = 0; k < frame_count; k++) {
          now_buffering[k] = stim[k];
      }
    }

    //Get an AudioBufferSourceNode; this is the AudioNode to use when we want to play an AudioBuffer
    source = aud_ctx.createBufferSource();
    source.buffer = arr_buf;             //Set the buffer in the AudioBufferSourceNode
    source.connect(aud_ctx.destination); //Connect the AudioBufferSourceNode to the destination so we can hear the sound
    source.start();                      //Start the source playing

    //Print a message to the console when the sound is done playing
    /*source.onended = () => {
        console.log('Sound finished.');
    }*/
    
    //Playback initiated, return an object with all the stim parameters
    var trial_obj = new Object();
    trial_obj.freq1 = freq1;
    trial_obj.freq2 = freq2;
    
    return trial_obj;
}

//////////////////////////////////
// Play a tone scramble
//////////////////////////////////
function play_scramble(scramble_type) {
    //scramble_type : 1 (minor), 2 (major)
    
    //Create audio context if it hasn't been made already (some browsers will prevent the audio context from being created before user input)
    if(!aud_ctx) {
        init();
    }
    
    //Always use 783.99 Hz as the tonic (as in Chubb et al, 2013)
    let f_I = 783.99;
    
    //Generate stimulus based on task type
    var seq;
    var freqs;
    var scramble;

    //Create the tone scramble waveform / PCM data
    seq      = gen_seq(scramble_type);
    freqs    = seq_2_freqs(seq, f_I);
    scramble = freqs_2_wave(freqs,0);
    
    //Initialize the audio buffer for playback
    let frame_count = scramble.length;
    let arr_buf = aud_ctx.createBuffer(channels, frame_count, aud_ctx.sampleRate);

    //Fill the buffer with the tone scramble waveform
    for (let channel = 0; channel < channels; channel++) {
      //This gives us the actual array that contains the data
      let now_buffering = arr_buf.getChannelData(channel);
      for (let k = 0; k < frame_count; k++) {
          now_buffering[k] = scramble[k];
      }
    }

    //Get an AudioBufferSourceNode; this is the AudioNode to use when we want to play an AudioBuffer
    source = aud_ctx.createBufferSource();
    source.buffer = arr_buf;             //Set the buffer in the AudioBufferSourceNode
    source.connect(aud_ctx.destination); //Connect the AudioBufferSourceNode to the destination so we can hear the sound
    source.start();                      //Start the source playing

    //Print a message to the console when the sound is done playing
    /*source.onended = () => {
        console.log('Sound finished.');
    }*/
    
    //Playback initiated, return an object with all the scramble parameters
    var trial_obj = new Object();
    trial_obj.seq = seq;
    trial_obj.freqs = freqs;
    trial_obj.f_I = f_I;
    return trial_obj;
}

//End playback of tones if subject responds early
// TODO: ending early often causes a click to be heard (playback is immediately halted). Ideally, the playback would be ramped down.
function stop_scramble() {
    source.stop();
}