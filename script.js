(function(){
"use strict";

  /* ---------------- Theme toggle ---------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  try{
    var savedTheme = localStorage.getItem('mirror_theme');
    if(savedTheme) root.setAttribute('data-theme', savedTheme);
  }catch(e){}
  themeBtn.addEventListener('click', function(){
    var current = root.getAttribute('data-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = current ? current === 'dark' : prefersDark;
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('mirror_theme', next); }catch(e){}
  });

  /* ---------------- Question bank ---------------- */
  var GROUPS = {
    O: [
      {text:"You have an entire afternoon in a city you've never visited. What would you naturally choose?", options:[
        {t:"Follow a random street and see where it leads.", s:4},
        {t:"Visit the most famous places listed online.", s:3},
        {t:"Make a proper plan before leaving.", s:1},
        {t:"Stay somewhere comfortable and relax.", s:2}
      ]},
      {text:"During a college discussion, someone suggests an unusual idea nobody has tried before. Your first reaction is:", options:[
        {t:"\u201cInteresting. Let's see where this could go.\u201d", s:4},
        {t:"\u201cDoes it have enough evidence to work?\u201d", s:2},
        {t:"\u201cI'm curious, but I'd rather hear what others think first.\u201d", s:3},
        {t:"\u201cWhy change something that already works?\u201d", s:1}
      ]},
      {text:"You are given a completely open-ended college project with no fixed format. What do you do?", options:[
        {t:"Try something nobody in the class has done.", s:4},
        {t:"Look at examples and create your own version.", s:3},
        {t:"Ask for a clear structure before starting.", s:2},
        {t:"Choose the safest format that is already familiar.", s:1}
      ]},
      {text:"Your original weekend plan gets cancelled unexpectedly. What sounds most like you?", options:[
        {t:"Find something completely different to do.", s:4},
        {t:"Look for another interesting option.", s:3},
        {t:"Replace it with something familiar.", s:2},
        {t:"Feel irritated because the original plan was better.", s:1}
      ]}
    ],
    C: [
      {text:"You have an assignment due in five days. What is your natural approach?", options:[
        {t:"Finish it immediately so it's out of the way.", s:3},
        {t:"Break it into smaller tasks and spread them across the days.", s:4},
        {t:"Start when the deadline becomes closer.", s:2},
        {t:"Work best when the pressure becomes intense.", s:1}
      ]},
      {text:"Your group has four days to complete an important project. What do you naturally do?", options:[
        {t:"Wait until everyone decides what to do.", s:1},
        {t:"Take responsibility for one part and complete it.", s:3},
        {t:"Help organize who should handle what.", s:4},
        {t:"Start working and figure things out as you go.", s:2}
      ]},
      {text:"You suddenly remember an important task you almost forgot. What is your first reaction?", options:[
        {t:"Do it immediately.", s:3},
        {t:"Add it to a list and decide when to complete it.", s:4},
        {t:"Finish whatever I'm currently doing first.", s:2},
        {t:"Hope I can remember it later.", s:1}
      ]},
      {text:"You have two hours completely free before an important day tomorrow.", options:[
        {t:"Prepare everything needed for tomorrow.", s:4},
        {t:"Finish one pending task and then relax.", s:3},
        {t:"Relax first and handle things later.", s:2},
        {t:"Do whatever feels interesting at the moment.", s:1}
      ]}
    ],
    E: [
      {text:"You enter a room where you don't know anyone. What do you naturally do?", options:[
        {t:"Find someone and introduce yourself.", s:4},
        {t:"Look for someone who seems approachable.", s:3},
        {t:"Wait until someone starts talking to you.", s:2},
        {t:"Stay comfortable on your own.", s:1}
      ]},
      {text:"Your professor suddenly asks you to explain something in front of the class.", options:[
        {t:"I enjoy the opportunity.", s:4},
        {t:"I'm nervous initially but can handle it.", s:3},
        {t:"I'd rather someone else explain it.", s:2},
        {t:"I strongly prefer avoiding the attention.", s:1}
      ]},
      {text:"Your friends are celebrating after completing a major project. What sounds most natural?", options:[
        {t:"Get involved and keep the energy going.", s:4},
        {t:"Talk with a few people I know well.", s:3},
        {t:"Enjoy the event without being very involved.", s:2},
        {t:"Leave early and enjoy some quiet time.", s:1}
      ]},
      {text:"You're sitting with a group and nobody is talking.", options:[
        {t:"Start a conversation.", s:4},
        {t:"Make a small comment to break the silence.", s:3},
        {t:"Wait and see what happens.", s:2},
        {t:"I'm perfectly comfortable with the silence.", s:1}
      ]}
    ],
    A: [
      {text:"Two people in your team strongly disagree about how to complete the project. What do you naturally do?", options:[
        {t:"Help them find a middle ground.", s:4},
        {t:"Listen to both sides before deciding.", s:3},
        {t:"Let them solve it themselves.", s:2},
        {t:"Support the approach you think will work best.", s:1}
      ]},
      {text:"A friend makes a mistake that affects the whole group.", options:[
        {t:"Help them fix it before discussing the mistake.", s:4},
        {t:"Ask what happened and understand their side.", s:3},
        {t:"Tell them directly that they caused the problem.", s:1},
        {t:"Focus on making sure it doesn't happen again.", s:2}
      ]},
      {text:"Someone strongly disagrees with an opinion you care about.", options:[
        {t:"Try to understand why they think that way.", s:4},
        {t:"Explain your point and listen to theirs.", s:3},
        {t:"Agree to disagree and move on.", s:2},
        {t:"Defend your position until they understand it.", s:1}
      ]},
      {text:"You're already busy when someone asks you for help with something important.", options:[
        {t:"Help them if I reasonably can.", s:4},
        {t:"Ask what they need and see whether I can fit it in.", s:3},
        {t:"Tell them I'll help later if possible.", s:2},
        {t:"Explain that it's their responsibility.", s:1}
      ]}
    ],
    N: [
      {text:"You discover an unexpected problem just before an important deadline.", options:[
        {t:"I immediately start thinking about everything that could go wrong.", s:4},
        {t:"I feel stressed, but then start working on the problem.", s:3},
        {t:"I pause and figure out what can actually be fixed.", s:2},
        {t:"I stay relatively calm and handle it step by step.", s:1}
      ]},
      {text:"Someone important hasn't replied to your message for several hours.", options:[
        {t:"I start wondering whether something is wrong.", s:4},
        {t:"I check occasionally but continue with my day.", s:3},
        {t:"I assume they're probably busy.", s:2},
        {t:"I barely think about it until they reply.", s:1}
      ]},
      {text:"You make a noticeable mistake in front of other people. What happens afterward?", options:[
        {t:"I keep replaying it in my mind.", s:4},
        {t:"I feel embarrassed for a while but recover.", s:3},
        {t:"I think about what I can learn from it.", s:2},
        {t:"I move on fairly quickly.", s:1}
      ]},
      {text:"You are waiting for an important result but don't know what the outcome will be.", options:[
        {t:"The uncertainty stays on my mind a lot.", s:4},
        {t:"I think about it occasionally.", s:3},
        {t:"I focus on things I can control.", s:2},
        {t:"I can usually wait without thinking much about it.", s:1}
      ]}
    ]
  };

  var DIMS = ['O','C','E','A','N'];
  var DIM_LABEL = {O:"Openness", C:"Conscientiousness", E:"Extraversion", A:"Agreeableness", N:"Emotional Reactivity"};
  var DIM_SHORT_DESC = {
    O:"How curious and open you are to new ideas, places and experiences.",
    C:"How organized and disciplined you tend to be when getting things done.",
    E:"How much you enjoy socializing, talking and being around people.",
    A:"How caring, cooperative and considerate you tend to be with others.",
    N:"How much stress, worry or pressure tends to affect you in tough moments."
  };

  // Interleave the 20 questions round-robin across dimensions so the
  // underlying trait never becomes obvious from consecutive questions.
  var QUESTIONS = [];
  for(var round=0; round<4; round++){
    for(var d=0; d<DIMS.length; d++){
      var dim = DIMS[d];
      var q = GROUPS[dim][round];
      QUESTIONS.push({dim:dim, text:q.text, options:q.options});
    }
  }

  /* ---------------- Archetypes ---------------- */
  var BASE_NAME = {
    O:"The Explorer", C:"The Builder", E:"The Spark", A:"The Bridge", N:"The Sensor"
  };
  var BASE_DESC = {
    O:"Your responses lean toward curiosity, imagination and a pull toward new ideas and experiences.",
    C:"Your responses lean toward structure, planning and quiet follow-through.",
    E:"Your responses lean toward social energy, expression and engagement with the people around you.",
    A:"Your responses lean toward cooperation, empathy and consideration for other people's perspectives.",
    N:"Your responses suggest that pressure, uncertainty and setbacks tend to affect you somewhat more strongly than the other areas MIRROR measures."
  };
  var COMBO = {
    "CO": {title:"The Inventor", desc:"You pair curiosity with structure — drawn to new ideas, and also inclined to give them real shape and follow through."},
    "EO": {title:"The Trailblazer", desc:"You pair curiosity with social energy — drawn to new experiences, and energized by bringing others along."},
    "AO": {title:"The Storyteller", desc:"You pair curiosity with consideration for others — interested in new ideas, and attentive to how they land on people."},
    "CE": {title:"The Leader", desc:"You pair structure with social energy — comfortable organizing people and moving things forward together."},
    "AC": {title:"The Anchor", desc:"You pair structure with consideration for others — steady, reliable, and attentive to how your work affects the people around you."},
    "AE": {title:"The Connector", desc:"You pair social energy with consideration for others — engaged with people, and attentive to keeping things comfortable for everyone."}
  };

  function computeResult(pct){
    var entries = DIMS.map(function(d){ return [d, pct[d]]; });
    entries.sort(function(a,b){ return b[1]-a[1]; });
    var max = entries[0][1], min = entries[4][1];

    if(max - min < 18){
      return {
        title:"The Harmonizer",
        primary:entries[0][0],
        secondary:entries[1][0],
        desc:"No single tendency dominates strongly in your responses. You show a fairly even balance across the areas MIRROR measures — likely adapting your approach to the situation rather than leaning heavily on one pattern.",
        secondaryLine:""
      };
    }

    var p = entries[0][0], s = entries[1][0];
    var key = [p,s].sort().join('');
    if(COMBO[key]){
      return {
        title:COMBO[key].title,
        primary:p, secondary:s,
        desc:COMBO[key].desc,
        secondaryLine:""
      };
    }
    return {
      title:BASE_NAME[p],
      primary:p, secondary:s,
      desc:BASE_DESC[p],
      secondaryLine:"There's also a secondary current of " + DIM_LABEL[s].toLowerCase() + " running through your responses."
    };
  }

  /* ---------------- State ---------------- */
  var answers = new Array(QUESTIONS.length).fill(null); // {dim, s}
  var current = 0;

  var screenIntro = document.getElementById('screen-intro');
  var screenQ = document.getElementById('screen-question');
  var screenR = document.getElementById('screen-results');

  function showScreen(el){
    [screenIntro, screenQ, screenR].forEach(function(s){ s.classList.remove('active'); });
    el.classList.add('active');
    window.scrollTo(0,0);
  }

  /* Results are intentionally never persisted — nothing is written to
     localStorage or sent anywhere, so there is nothing to resume. */

  /* ---------------- Begin ---------------- */
  document.getElementById('beginBtn').addEventListener('click', function(){
    current = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    renderQuestion();
    showScreen(screenQ);
  });

  /* ---------------- Question rendering ---------------- */
  var qText = document.getElementById('qText');
  var qOptions = document.getElementById('qOptions');
  var progressFill = document.getElementById('progressFill');
  var progressLabel = document.getElementById('progressLabel');
  var backBtn = document.getElementById('backBtn');

  function renderQuestion(){
    var q = QUESTIONS[current];
    qText.textContent = q.text;
    qOptions.innerHTML = '';
    q.options.forEach(function(opt, i){
      var btn = document.createElement('button');
      btn.className = 'opt';
      btn.type = 'button';
      btn.textContent = opt.t;
      if(answers[current] && answers[current].optIndex === i){
        btn.classList.add('selected');
      }
      btn.addEventListener('click', function(){ selectOption(i, opt); });
      qOptions.appendChild(btn);
    });
    progressFill.style.width = ((current)/QUESTIONS.length*100) + '%';
    progressLabel.textContent = (current+1) + ' / ' + QUESTIONS.length;
    backBtn.disabled = current === 0;
  }

  function selectOption(i, opt){
    answers[current] = {dim: QUESTIONS[current].dim, s: opt.s, optIndex:i};
    // brief visual confirmation, then advance
    var btns = qOptions.querySelectorAll('.opt');
    btns.forEach(function(b, idx){ b.classList.toggle('selected', idx===i); });
    setTimeout(function(){
      if(current < QUESTIONS.length - 1){
        current++;
        renderQuestion();
      } else {
        finish();
      }
    }, 220);
  }

  backBtn.addEventListener('click', function(){
    if(current > 0){
      current--;
      renderQuestion();
    }
  });

  /* ---------------- Finish & score ---------------- */
  function finish(){
    var raw = {O:0,C:0,E:0,A:0,N:0};
    answers.forEach(function(a){ if(a) raw[a.dim] += a.s; });
    var pct = {};
    DIMS.forEach(function(d){
      var p = ((raw[d]-4)/12)*100;
      pct[d] = Math.max(0, Math.min(100, Math.round(p)));
    });
    try{
      localStorage.removeItem('mirror_last_result');
    }catch(e){}
    renderResults(pct);
    showScreen(screenR);
  }

  function renderResults(pct){
    var result = computeResult(pct);
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDesc').textContent = result.desc;
    document.getElementById('resultSecondary').textContent = result.secondaryLine || '';
    document.getElementById('resultSecondary').style.display = result.secondaryLine ? 'block' : 'none';

    var traits = document.getElementById('traits');
    traits.innerHTML = '';
    var order = DIMS.slice().sort(function(a,b){ return pct[b]-pct[a]; });
    order.forEach(function(d){
      var row = document.createElement('div');
      row.className = 'trait-row';
      row.innerHTML =
        '<div class="trait-top ui"><span class="trait-name">'+DIM_LABEL[d]+'</span><span class="trait-pct">'+pct[d]+'%</span></div>'+
        '<div class="trait-track"><div class="trait-fill" data-pct="'+pct[d]+'"></div></div>'+
        '<div class="trait-desc ui">'+DIM_SHORT_DESC[d]+'</div>';
      traits.appendChild(row);
    });
    // animate fills after paint
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        traits.querySelectorAll('.trait-fill').forEach(function(el){
          el.style.width = el.getAttribute('data-pct') + '%';
        });
      });
    });
  }

  document.getElementById('retakeBtn').addEventListener('click', function(){
    current = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    renderQuestion();
    showScreen(screenQ);
  });

  document.getElementById('shareBtn').addEventListener('click', function(){
    var title = document.getElementById('resultTitle').textContent;
    var lines = [];
    document.querySelectorAll('.trait-row').forEach(function(row){
      var name = row.querySelector('.trait-name').textContent;
      var pctv = row.querySelector('.trait-pct').textContent;
      lines.push(name + ': ' + pctv);
    });
    var text = 'MIRROR result — ' + title + '\n' + lines.join('\n');
    var btn = document.getElementById('shareBtn');
    function done(label){ var orig = 'Copy results'; btn.textContent = label; setTimeout(function(){ btn.textContent = orig; }, 1600); }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ done('Copied'); }).catch(function(){ done('Copy failed'); });
    } else {
      done('Copy unavailable');
    }
  });
})();
