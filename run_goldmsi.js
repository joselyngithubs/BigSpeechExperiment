function run_goldmsi(timeline,taskCounter,taskID){
        
            var p_resp = [];
            var p_score = 0;
            var t_resp = [];
            var t_score = 0;
            var s_resp = [];
            var s_score = 0;
            
            var pq = [5,6,11,12,13,18,22,23,26];
            var tq = [14,27,32,33,35,36,37];
            var sq = [1,3,4,7,10,12,15,17,19,24,25,29,32,tq[0],pq[7],tq[1],tq[3],tq[6]]; // overlapping q's are at the end -- correspond to 14,23,27,33,37            
            
            var pq_idx = [1,1,0,1,0,1,1,0,1];
            var tq_idx = [0,0,1,1,1,1,1];
            var sq_idx = [1,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,1,1]; // overlapping q's are at the end
                        
            var scale_1 = [
                "Completely Disagree",
                "Strongly Disagree",
                "Disagree",
                "Neither Agree nor Disagree",
                "Agree",
                "Strongly Agree",
                "Completely Agree"
            ];
            
            var perceptual_abilities = {
                type: 'survey-likert',
                preamble: ('<div class="instruc"><p>Task ').concat(taskCounter).concat(' of 7</p><p>Goldsmith Musical Sophistication Index</p><p>This survey asks about your musical abilities and interests.</p><p>Please respond to the statements below. (Page 1 of 3)</p></div>'),
                questions: [
                    {prompt: "I am able to judge whether someone is a good singer or not.", name: pq[0], labels: scale_1,required:true},
                    {prompt: "I usually know when I'm hearing a song for the first time.", name: pq[1], labels: scale_1,required:true},
                    {prompt: "I find it difficult to spot mistakes in a performance of a song even if I know the tune.", name: pq[2], labels: scale_1,required:true},
                    {prompt: "I can compare and discuss differences between two performances or versions of the same piece of music.", name: pq[3], labels: scale_1,required:true},
                    {prompt: "I have trouble recognizing a familiar song when played in a different way or by a different performer.", name: pq[4], labels: scale_1,required:true},
                    {prompt: "I can tell when people sing or play out of time with the beat.", name: pq[5], labels: scale_1,required:true},
                    {prompt: "I can tell when people sing or play out of tune.", name: pq[6], labels: scale_1,required:true},
                    {prompt: "When I sing, I have no idea whether I'm in tune or not.", name: pq[7], labels: scale_1,required:true},
                    {prompt: "When I hear a piece of music I can usually identify its genre.", name: pq[8], labels: scale_1,required:true}
                ],
                on_finish: function(data){
                    p_resp = data.responses;
                    
                    for(var i=0;i<pq.length;i++){
                        let tmp_score = pq_idx[i]==0? (p_resp[pq[i]]*-1+7):(p_resp[pq[i]]+1);
                        
                        trialData = trialData.concat({
                            taskCounter: taskCounter,
                            taskID: taskID,
                            subscale: 'perceptual',
                            q: pq[i],
                            index: pq_idx[i],
                            resp: p_resp[pq[i]],
                            val: tmp_score
                        });
                        
                        p_score = p_score + tmp_score;                    
                    };
                    
                    // store total p score
                    trialData = trialData.concat({
                        taskCounter: taskCounter,
                        taskID: taskID,
                        subscale: 'perceptual',
                        q: NaN,
                        index: NaN,
                        resp: NaN,
                        val: p_score                   
                    });
                }
            };
            timeline.push(perceptual_abilities);           


            var musical_training = {
                type: 'survey-likert',
                preamble: '<div class="instruc"><p>Please respond to the statements below. (Page 2 of 3)</p></div>',
                questions: [
                    {prompt: "I have never been complimented for my talents as a musical performer.", name: tq[0], labels: scale_1,required:true},
                    {prompt: "I would not consider myself a musician.", name: tq[1], labels: scale_1,required:true},
                    {prompt: "I engaged in regular, daily practice of a musical instrument (including voice) for ___ years.", name: tq[2], labels: ['0','1','2','3','4-5','6-9','10 or more'],required:true},
                    {prompt: "At the peak of my interest, I practiced ___ hours per day on my primary instrument.", name: tq[3], labels: ['0','0.5','1','1.5','2','3-4','5 or more'],required:true},
                    {prompt: "I have had formal training in music theory for __ years", name: tq[4], labels: ['0','0.5','1','2','3','4-6','7 or more'],required:true},
                    {prompt: "I have had __ years of formal training on a musical instrument (including voice) during my lifetime. ", name: tq[5], labels: ['0','0.5','1','2','3-5','6-9','10 or more'],required:true},
                    {prompt: "I can play ___ musical instruments", name: tq[6], labels: ['0','1','2','3','4','5','6 or more'],required:true}
                ],
                on_finish: function(data){
                    t_resp = data.responses;
                                                            
                    for(var i=0;i<tq.length;i++){
                        let tmp_score = tq_idx[i]==0? (t_resp[tq[i]]*-1+7):(t_resp[tq[i]]+1);
                        
                        trialData = trialData.concat({
                            taskCounter: taskCounter,
                            taskID: taskID,
                            subscale: 'training',
                            q: tq[i],
                            index: tq_idx[i],
                            resp: t_resp[tq[i]],
                            val: tmp_score
                        });
                        
                        t_score = t_score + tmp_score;                    
                    };
                    
                    // store total p score
                    trialData = trialData.concat({
                        taskCounter: taskCounter,
                        taskID: taskID,
                        subscale: 'training',
                        q: NaN,
                        index: NaN,
                        resp: NaN,
                        val: t_score                   
                    });
                }
            };
            timeline.push(musical_training); 
            
            var sophistication = {
                type: 'survey-likert',
                preamble: '<div class="instruc"><p>Please respond to the statements below. (Page 3 of 3)</p></div>',
                questions: [
                    {prompt: "I spend a lot of my free time doing music-related activities.", name: sq[0], labels: scale_1,required:true},
                    {prompt: "I enjoy writing about music, for example on blogs and forums.", name: sq[1], labels: scale_1,required:true},
                    {prompt: "If somebody starts singing a song I don't know, I can usually join in.", name: sq[2], labels: scale_1,required:true},
                    {prompt: "I can sing or play music from memory.", name: sq[3], labels: scale_1,required:true},
                    {prompt: "I am able to hit the right notes when I sing along with a recording.", name: sq[4], labels: scale_1,required:true},
                    {prompt: "I can compare and discuss differences between two performances or versions of the same piece of music.", name: sq[5], labels: scale_1,required:true},
                    {prompt: "I often read or search the internet for things related to music.", name: sq[6], labels: scale_1,required:true},
                    {prompt: "I am not able to sing in harmony when somebody is singing a familiar tune.", name: sq[7], labels: scale_1,required:true},
                    {prompt: "I am able to identify what is special about a given musical piece.", name: sq[8], labels: scale_1,required:true},
                    {prompt: "Music is kind of an addiction for me - I couldn't live without it.", name: sq[9], labels: scale_1,required:true},
                    {prompt: "I don’t like singing in public because I’m afraid that I would sing wrong notes.", name: sq[10], labels: scale_1,required:true},
                    {prompt: "After hearing a new song two or three times, I can usually sing it by myself.", name: sq[11], labels: scale_1,required:true},
                    {prompt: "I engaged in regular, daily practice of a musical instrument (including voice) for ___ years.", name: sq[12], labels: ['0','1','2','3','4-5','6-9','10 or more'],required:true}
                ],
                on_finish: function(data){
                    s_resp = data.responses; // does not include overlapping q's
                    
                    // include overlapping q's
                    s_resp[tq[0]] = t_resp[tq[0]];
                    s_resp[pq[7]] = p_resp[pq[7]];
                    s_resp[tq[1]] = t_resp[tq[1]];
                    s_resp[tq[3]] = t_resp[tq[3]];
                    s_resp[tq[6]] = t_resp[tq[6]];
                    
                    for(var i=0;i<sq.length;i++){
                        let tmp_score = sq_idx[i]==0? (s_resp[sq[i]]*-1+7):(s_resp[sq[i]]+1);
                        
                        trialData = trialData.concat({
                            taskCounter: taskCounter,
                            taskID: taskID,
                            subscale: 'sophistication',
                            q: sq[i],
                            index: sq_idx[i],
                            resp: s_resp[sq[i]],
                            val: tmp_score
                        });
                        
                        s_score = s_score + tmp_score;                    
                    };
                    
                    // store total p score
                    trialData = trialData.concat({
                        taskCounter: taskCounter,
                        taskID: taskID,
                        subscale: 'sophistication',
                        q: NaN,
                        index: NaN,
                        resp: NaN,
                        val: s_score                   
                    });
                }
            };
            timeline.push(sophistication); 
            
            //Thank you page
            var end_screen = {
                type: "html-button-response",
                stimulus: 'Survey responses have been recorded.<br>Press Next to continue.',
                choices: ['Next']
            }
            timeline.push(end_screen);        
            
}