import { useState, useEffect, useRef } from "react";

const MOODS = [
  { id: "chill", label: "Chill", emoji: "🌊", color: "#4FC3F7", bg: "from-blue-900/40 to-cyan-900/40" },
  { id: "fashion", label: "Fashion", emoji: "✨", color: "#F06292", bg: "from-pink-900/40 to-rose-900/40" },
  { id: "study", label: "Study", emoji: "📚", color: "#81C784", bg: "from-green-900/40 to-emerald-900/40" },
  { id: "motivation", label: "Motivation", emoji: "🔥", color: "#FFB74D", bg: "from-orange-900/40 to-amber-900/40" },
  { id: "latenight", label: "Late Night", emoji: "🌙", color: "#CE93D8", bg: "from-purple-900/40 to-violet-900/40" },
  { id: "lonely", label: "Lonely", emoji: "🫧", color: "#90CAF9", bg: "from-slate-900/40 to-blue-900/40" },
  { id: "funny", label: "Funny", emoji: "😂", color: "#FFF176", bg: "from-yellow-900/40 to-lime-900/40" },
  { id: "romantic", label: "Romantic", emoji: "🌹", color: "#F48FB1", bg: "from-red-900/40 to-pink-900/40" },
];

const PAGES = ["splash","onboarding","login","home","explore","mood","reels","chat","profile","ai","rooms","dashboard","monetize","settings"];

const FEED_POSTS = [
  { id:1, user:"@aurora.vibe", avatar:"🌸", aura:9842, mood:"fashion", caption:"soft girl era loading... ✨ AI styled this whole look", likes:12400, comments:847, type:"image", gradient:"from-pink-500 to-rose-400", tag:"#SoftAesthetic" },
  { id:2, user:"@neon.codex", avatar:"⚡", aura:7231, mood:"motivation", caption:"3am grind hits different when your AI assistant drops weekly analytics 📊", likes:8900, comments:612, type:"reel", gradient:"from-violet-600 to-indigo-500", tag:"#CreatorMode" },
  { id:3, user:"@luna.dreamer", avatar:"🌙", aura:11200, mood:"latenight", caption:"voice story from last night — feeling everything at once 🎙️", likes:15600, comments:1203, type:"voice", gradient:"from-purple-700 to-blue-600", tag:"#VoiceStory" },
  { id:4, user:"@prism.girl", avatar:"🪩", aura:6540, mood:"chill", caption:"virtual room tour 🛁 come hang? Study cafe is open 24/7", likes:9300, comments:521, type:"room", gradient:"from-cyan-600 to-teal-500", tag:"#VirtualRoom" },
];

const EXPLORE_ITEMS = [
  { id:1, label:"FashionAI", emoji:"👗", gradient:"from-pink-500 to-fuchsia-600", size:"large" },
  { id:2, label:"GlowUp", emoji:"✨", gradient:"from-amber-400 to-orange-500", size:"small" },
  { id:3, label:"StudyCafe", emoji:"☕", gradient:"from-green-500 to-emerald-600", size:"small" },
  { id:4, label:"LateNight", emoji:"🌙", gradient:"from-indigo-600 to-purple-700", size:"medium" },
  { id:5, label:"VibeMatch", emoji:"💫", gradient:"from-rose-500 to-pink-600", size:"small" },
  { id:6, label:"MusicLounge", emoji:"🎵", gradient:"from-blue-500 to-cyan-600", size:"medium" },
  { id:7, label:"AuraRising", emoji:"🔮", gradient:"from-violet-600 to-purple-800", size:"large" },
  { id:8, label:"Collab", emoji:"🎬", gradient:"from-red-500 to-rose-600", size:"small" },
];

const CHATS = [
  { id:1, user:"aurora.vibe", avatar:"🌸", msg:"omg your aura score is INSANE", time:"2m", unread:3, online:true },
  { id:2, user:"neon.codex", avatar:"⚡", msg:"collab reel? I have an idea 🎬", time:"11m", unread:1, online:true },
  { id:3, user:"luna.dreamer", avatar:"🌙", msg:"that voice story made me cry 🥹", time:"1h", unread:0, online:false },
  { id:4, user:"Lovie AI 🤖", avatar:"🤖", msg:"Your engagement is up 34% this week!", time:"3h", unread:2, online:true },
];

const AI_SUGGESTIONS = [
  { icon:"✍️", title:"Caption Generator", desc:"Drop your vibe, get viral captions instantly" },
  { icon:"📅", title:"Content Calendar", desc:"7-day aesthetic plan tailored to your style" },
  { icon:"📊", title:"Growth Advisor", desc:"Real-time analytics + what to post next" },
  { icon:"🎨", title:"Aesthetic Theme", desc:"AI curates your whole feed color palette" },
  { icon:"🏷️", title:"Hashtag Engine", desc:"Top hashtags matched to your niche & mood" },
  { icon:"🎬", title:"Reel Ideas", desc:"Trending concepts personalized to your aura" },
];

const ONBOARDING_STEPS = [
  { title:"Your universe,\nyour vibe.", sub:"Lovie is where creators feel everything — and get rewarded for it.", emoji:"🌌", color:"#CE93D8" },
  { title:"AI that actually\ngets you.", sub:"Your personal creator AI: captions, content calendars, growth advice — on demand.", emoji:"🤖", color:"#81C784" },
  { title:"Choose your\nmood, anytime.", sub:"Your feed shifts with your energy. No algorithm. Just pure emotional resonance.", emoji:"✨", color:"#F06292" },
  { title:"Build your\nAura.", sub:"Forget followers. Aura Score rewards creativity, originality, and real connection.", emoji:"🔮", color:"#FFB74D" },
];

// ─── Glassmorphism Card ───────────────────────────────────────────────────────
function Glass({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl ${className}`}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}
    >
      {children}
    </div>
  );
}

// ─── Gradient Button ─────────────────────────────────────────────────────────
function GradBtn({ children, onClick, className = "", gradient = "from-[#CE93D8] to-[#F06292]", small }) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${gradient} text-white font-bold rounded-2xl transition-all active:scale-95 hover:opacity-90 ${small ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"} ${className}`}
      style={{ boxShadow: "0 4px 20px rgba(206,147,216,0.4)" }}
    >
      {children}
    </button>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ page, setPage }) {
  const items = [
    { id:"home", icon:"🏠", label:"Home" },
    { id:"explore", icon:"🔍", label:"Explore" },
    { id:"reels", icon:"🎬", label:"Reels" },
    { id:"chat", icon:"💬", label:"Chat" },
    { id:"profile", icon:"👤", label:"Me" },
  ];
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm z-50 px-2 pb-2">
      <Glass className="px-2 py-2 flex items-center justify-around">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${page===item.id?"scale-110":""}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`text-[9px] font-semibold ${page===item.id?"text-[#CE93D8]":"text-white/40"}`}>{item.label}</span>
            {page===item.id && <div className="w-1 h-1 rounded-full bg-[#CE93D8] mt-0.5" />}
          </button>
        ))}
      </Glass>
    </div>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
function TopBar({ title, right, left, setPage }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      {left ? left : <div className="w-8" />}
      <span className="text-white font-bold text-lg tracking-tight">{title}</span>
      {right ? right : <div className="w-8" />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

function SplashPage({ onDone }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    setTimeout(() => onDone(), 2600);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
      {/* Animated bg orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-30 blur-3xl animate-pulse" style={{background:"radial-gradient(circle, #CE93D8, transparent)"}} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-20 blur-3xl animate-pulse" style={{background:"radial-gradient(circle, #F06292, transparent)", animationDelay:"1s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-15 blur-2xl animate-pulse" style={{background:"radial-gradient(circle, #81C784, transparent)", animationDelay:"0.5s"}} />
      </div>
      <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${show?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl" style={{background:"linear-gradient(135deg, #CE93D8, #F06292)", boxShadow:"0 0 60px rgba(206,147,216,0.6)"}}>
          🌸
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tight" style={{fontFamily:"Georgia, serif", letterSpacing:"-2px"}}>Lovie</h1>
          <p className="text-white/50 text-sm mt-1 tracking-widest uppercase font-light">Your Creator Universe</p>
        </div>
        <div className="flex gap-1 mt-4">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full animate-bounce bg-[#CE93D8]" style={{animationDelay:`${i*0.15}s`}} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingPage({ setPage }) {
  const [step, setStep] = useState(0);
  const s = ONBOARDING_STEPS[step];
  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse" style={{background:`radial-gradient(circle, ${s.color}, transparent)`}} />
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-6">
        <div className="text-8xl animate-bounce" style={{animationDuration:"3s"}}>{s.emoji}</div>
        <div>
          <h2 className="text-3xl font-black text-white leading-tight whitespace-pre-line" style={{fontFamily:"Georgia, serif"}}>{s.title}</h2>
          <p className="text-white/60 mt-3 text-sm leading-relaxed">{s.sub}</p>
        </div>
        {/* Dots */}
        <div className="flex gap-2">
          {ONBOARDING_STEPS.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} className={`rounded-full transition-all cursor-pointer ${i===step?"w-6 h-2":"w-2 h-2"}`} style={{background:i===step?s.color:"rgba(255,255,255,0.2)"}} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {step < ONBOARDING_STEPS.length-1 ? (
          <GradBtn onClick={() => setStep(step+1)} className="w-full py-4">Continue ✨</GradBtn>
        ) : (
          <GradBtn onClick={() => setPage("login")} className="w-full py-4">Enter Lovie 🌸</GradBtn>
        )}
        {step < ONBOARDING_STEPS.length-1 && (
          <button onClick={() => setPage("login")} className="text-white/30 text-sm text-center py-2">Skip</button>
        )}
      </div>
    </div>
  );
}

function LoginPage({ setPage }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background:"radial-gradient(circle, #CE93D8, transparent)"}} />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-15" style={{background:"radial-gradient(circle, #F06292, transparent)"}} />
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>🌸</div>
        <h1 className="text-3xl font-black text-white" style={{fontFamily:"Georgia, serif"}}>Lovie</h1>
        <p className="text-white/40 text-sm mt-1">Your creator universe awaits</p>
      </div>
      {/* Mode Toggle */}
      <Glass className="p-1 flex mb-6">
        {["login","signup"].map(m => (
          <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2.5 rounded-2xl text-sm font-bold capitalize transition-all ${mode===m?"text-white":"text-white/30"}`} style={mode===m?{background:"linear-gradient(135deg,#CE93D8,#F06292)"}:{}}>
            {m === "login" ? "Sign In" : "Join Free"}
          </button>
        ))}
      </Glass>
      <div className="flex flex-col gap-3 flex-1">
        {mode==="signup" && (
          <Glass className="px-4 py-3">
            <input className="w-full bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Your name ✨" />
          </Glass>
        )}
        <Glass className="px-4 py-3">
          <input className="w-full bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Email or username" value={email} onChange={e=>setEmail(e.target.value)} />
        </Glass>
        <Glass className="px-4 py-3">
          <input type="password" className="w-full bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} />
        </Glass>
        <GradBtn onClick={() => setPage("mood")} className="w-full py-4 mt-2">
          {mode==="login" ? "Enter Lovie 🌸" : "Create My Universe 🌌"}
        </GradBtn>
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="flex gap-3">
          {["🍎 Apple","G Google","𝕏 Twitter"].map(s => (
            <Glass key={s} className="flex-1 py-2.5 text-center text-xs text-white/60 cursor-pointer hover:bg-white/10 transition-all">{s}</Glass>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoodPage({ setPage, setMood }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-24">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-white" style={{fontFamily:"Georgia, serif"}}>What's your vibe? ✨</h2>
        <p className="text-white/40 text-sm mt-1">Your feed morphs to your mood</p>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
        {MOODS.map(m => (
          <Glass
            key={m.id}
            onClick={() => { setSelected(m.id); setMood(m); setTimeout(() => setPage("home"), 400); }}
            className={`p-4 cursor-pointer transition-all ${selected===m.id?"scale-95 border-white/30":"hover:border-white/20"} bg-gradient-to-br ${m.bg}`}
          >
            <div className="text-3xl mb-2">{m.emoji}</div>
            <p className="text-white font-bold text-sm">{m.label}</p>
            <div className="w-8 h-0.5 rounded-full mt-1" style={{background:m.color}} />
          </Glass>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage, mood }) {
  const [liked, setLiked] = useState({});
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div>
          <h1 className="text-2xl font-black text-white" style={{fontFamily:"Georgia, serif"}}>Lovie <span className="text-[#CE93D8]">✦</span></h1>
          <p className="text-white/40 text-xs">{mood?.label || "Chill"} mode {mood?.emoji || "🌊"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage("ai")} className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>🤖</button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-white/5 border border-white/10">🔔</button>
        </div>
      </div>
      {/* Stories */}
      <div className="flex gap-3 px-4 pb-3 overflow-x-auto no-scrollbar">
        {[{a:"🌸",n:"You"},{a:"⚡",n:"neon"},{a:"🌙",n:"luna"},{a:"🪩",n:"prism"},{a:"🔮",n:"aurora"},{a:"🎵",n:"wave"}].map((s,i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{background:i===0?"rgba(255,255,255,0.08)":"linear-gradient(135deg,#CE93D8,#F06292)", boxShadow:i>0?"0 0 15px rgba(206,147,216,0.4)":"none", border:i===0?"2px dashed rgba(255,255,255,0.2)":"none"}}>
              {i===0 ? "＋" : s.a}
            </div>
            <span className="text-white/50 text-[9px]">{s.n}</span>
          </div>
        ))}
      </div>
      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4 no-scrollbar">
        {FEED_POSTS.map(post => (
          <Glass key={post.id} className="overflow-hidden">
            {/* Post Visual */}
            <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative`}>
              <span className="text-6xl opacity-50">{post.type==="image"?"🖼️":post.type==="reel"?"🎬":post.type==="voice"?"🎙️":"🏠"}</span>
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">{post.tag}</span>
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm flex items-center gap-1">
                <span className="text-[10px] text-[#CE93D8]">🔮</span>
                <span className="text-[10px] text-white font-bold">{post.aura.toLocaleString()}</span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>{post.avatar}</div>
                <span className="text-white text-xs font-semibold">{post.user}</span>
                <span className="text-white/30 text-[10px] ml-auto">2h</span>
              </div>
              <p className="text-white/70 text-xs mb-3 leading-relaxed">{post.caption}</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setLiked(l => ({...l,[post.id]:!l[post.id]}))} className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className={`text-lg transition-all ${liked[post.id]?"scale-125":""}`}>{liked[post.id]?"❤️":"🤍"}</span>
                  <span>{(post.likes + (liked[post.id]?1:0)).toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-white/60"><span className="text-lg">💬</span>{post.comments}</button>
                <button className="flex items-center gap-1.5 text-xs text-white/60"><span className="text-lg">↗️</span>Share</button>
                <button className="ml-auto text-white/40 text-lg">⋯</button>
              </div>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  );
}

function ExplorePage({ setPage }) {
  return (
    <div className="flex flex-col h-full">
      <TopBar title="Explore 🔍" />
      <div className="px-4 mb-4">
        <Glass className="px-4 py-3 flex items-center gap-2">
          <span className="text-white/30">🔍</span>
          <input className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Search vibes, creators, moods..." />
        </Glass>
      </div>
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {["Trending","Fashion","Music","Study","Aesthetic","Gaming"].map(t => (
          <button key={t} className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-white/60 hover:border-[#CE93D8]/50 transition-all">{t}</button>
        ))}
      </div>
      {/* Masonry Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {EXPLORE_ITEMS.map(item => (
            <Glass key={item.id} className={`overflow-hidden cursor-pointer hover:scale-[1.02] transition-all ${item.size==="large"?"col-span-2 h-40":item.size==="medium"?"h-32":"h-24"}`}>
              <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-2`}>
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-white font-bold text-sm">#{item.label}</span>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReelsPage() {
  const reels = [
    { user:"@aurora.vibe", emoji:"🌸", caption:"POV: AI styled your whole aesthetic ✨", likes:"24K", tag:"#FashionAI", gradient:"from-pink-600 via-rose-500 to-fuchsia-600" },
    { user:"@neon.codex", emoji:"⚡", caption:"3AM productivity hits different 🔥", likes:"18K", tag:"#LateNightGrind", gradient:"from-violet-700 via-indigo-600 to-blue-600" },
    { user:"@luna.dreamer", emoji:"🌙", caption:"voice story: when everything feels heavy 🎙️", likes:"31K", tag:"#VoiceStory", gradient:"from-purple-700 via-violet-600 to-indigo-700" },
  ];
  const [current, setCurrent] = useState(0);
  const r = reels[current];
  return (
    <div className="relative h-full overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${r.gradient} transition-all duration-500`} />
      <div className="absolute inset-0 flex flex-col justify-end p-4 pb-28">
        {/* Center play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-4xl">{r.emoji}</div>
        </div>
        {/* Info */}
        <div className="flex items-end justify-between">
          <div className="flex-1 mr-4">
            <p className="text-white font-bold text-sm mb-1">{r.user}</p>
            <p className="text-white/80 text-xs leading-relaxed mb-2">{r.caption}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">{r.tag}</span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <button className="flex flex-col items-center gap-1"><span className="text-2xl">❤️</span><span className="text-white text-xs">{r.likes}</span></button>
            <button className="flex flex-col items-center gap-1"><span className="text-2xl">💬</span><span className="text-white text-xs">843</span></button>
            <button className="flex flex-col items-center gap-1"><span className="text-2xl">↗️</span><span className="text-white text-xs">Share</span></button>
            <button className="flex flex-col items-center gap-1"><span className="text-2xl">✨</span><span className="text-white text-xs">Collab</span></button>
          </div>
        </div>
      </div>
      {/* Swipe hint */}
      <div className="absolute top-1/2 right-3 flex flex-col gap-2">
        {reels.map((_,i) => <div key={i} onClick={() => setCurrent(i)} className={`w-1 rounded-full transition-all cursor-pointer ${i===current?"h-8 bg-white":"h-2 bg-white/30"}`} />)}
      </div>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
        <span className="text-white font-bold text-lg" style={{fontFamily:"Georgia, serif"}}>Reels</span>
        <button className="w-8 h-8 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center text-sm">🎬</button>
      </div>
    </div>
  );
}

function ChatPage({ setPage }) {
  const [active, setActive] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { from:"them", text:"omg your aura score is INSANE 🔮", time:"2m" },
    { from:"me", text:"haha thank you!! been posting every day ✨", time:"1m" },
    { from:"them", text:"collab reel?? I have a vision 🎬", time:"30s" },
  ]);
  if (active) {
    const chat = CHATS.find(c=>c.id===active);
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-white/5">
          <button onClick={() => setActive(null)} className="text-white/60 text-lg">‹</button>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>{chat.avatar}</div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{chat.user}</p>
            <p className="text-[10px] text-green-400">{chat.online?"● Online":"○ Offline"}</p>
          </div>
          <button className="text-white/40 text-lg">⋯</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
          {messages.map((m,i) => (
            <div key={i} className={`flex ${m.from==="me"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${m.from==="me"?"text-white rounded-br-sm":"bg-white/8 text-white/80 rounded-bl-sm border border-white/10"}`} style={m.from==="me"?{background:"linear-gradient(135deg,#CE93D8,#F06292)"}:{}}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-24">
          <Glass className="flex items-center gap-2 px-3 py-2">
            <button className="text-xl">😊</button>
            <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Message..." />
            <button onClick={() => { if(msg.trim()){setMessages(m=>[...m,{from:"me",text:msg,time:"now"}]);setMsg("");} }} className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>↑</button>
          </Glass>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <TopBar title="Messages 💬" right={<button className="text-xl">✏️</button>} />
      <div className="px-4 mb-3">
        <Glass className="px-4 py-2.5 flex items-center gap-2">
          <span className="text-white/30">🔍</span>
          <input className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Search conversations..." />
        </Glass>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-2 no-scrollbar">
        {CHATS.map(c => (
          <Glass key={c.id} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/8 transition-all" onClick={() => setActive(c.id)}>
            <div className="relative">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>{c.avatar}</div>
              {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0a0a0f]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-sm">{c.user}</p>
                <span className="text-white/30 text-[10px]">{c.time}</span>
              </div>
              <p className="text-white/40 text-xs truncate">{c.msg}</p>
            </div>
            {c.unread > 0 && <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>{c.unread}</div>}
          </Glass>
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ setPage }) {
  const [tab, setTab] = useState("posts");
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 no-scrollbar">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-[#CE93D8]/60 to-[#F06292]/60 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
        </div>
        <div className="px-4 -mt-10 relative">
          <div className="flex items-end justify-between mb-3">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border-4 border-[#0a0a0f]" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)", boxShadow:"0 0 30px rgba(206,147,216,0.5)"}}>🌸</div>
            <div className="flex gap-2 mt-2">
              <GradBtn small>Edit Profile</GradBtn>
              <Glass className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer">⚙️</Glass>
            </div>
          </div>
          <h2 className="text-white font-black text-xl" style={{fontFamily:"Georgia, serif"}}>aurora.vibe</h2>
          <p className="text-white/50 text-xs mb-1">@aurora.vibe · she/her</p>
          <p className="text-white/70 text-sm mb-3">✨ Gen Z creator · fashion + AI + late nights 🌙<br/>collab? DMs open 💌</p>
          {/* Aura Score */}
          <Glass className="p-3 mb-4 bg-gradient-to-r from-[#CE93D8]/10 to-[#F06292]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔮</span>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Aura Score</p>
                  <p className="text-2xl font-black text-white">9,842</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-green-400">↑ +234 this week</p>
                <p className="text-[10px] text-white/30">Top 2% Creator</p>
              </div>
            </div>
          </Glass>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[["842","Posts"],["128K","Followers"],["$4.2K","Earned"]].map(([v,l]) => (
              <Glass key={l} className="p-2 text-center">
                <p className="text-white font-black text-lg">{v}</p>
                <p className="text-white/40 text-[10px]">{l}</p>
              </Glass>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-1 px-4 mb-3">
        {["posts","reels","rooms","shop"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${tab===t?"text-white":"text-white/30 bg-white/3"}`} style={tab===t?{background:"linear-gradient(135deg,#CE93D8,#F06292)"}:{}}>
            {t}
          </button>
        ))}
      </div>
      {/* Grid */}
      <div className="px-4 grid grid-cols-3 gap-1.5">
        {Array.from({length:9},(_,i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden" style={{background:`linear-gradient(${135+i*20}deg, #CE93D8${Math.floor(40+i*15).toString(16)}, #F06292${Math.floor(40+i*10).toString(16)})`}}>
            <div className="w-full h-full flex items-center justify-center text-3xl opacity-50">
              {["🌸","✨","🌙","🔮","⚡","🎵","💫","🌊","🎬"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPage({ setPage }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  async function askAI() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setLoading(true);
    setHistory(h => [...h, { from: "user", text: userMsg }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are Lovie AI — a futuristic, emotionally intelligent Gen Z creator assistant built into the Lovie app (an AI-powered social media platform). You help creators with captions, hashtags, content ideas, reel scripts, aesthetic themes, growth advice, and vibe checks. Be warm, expressive, and Gen Z-coded. Use emojis naturally. Keep responses concise and energetic.",
          messages: [
            ...history.map(h => ({ role: h.from === "user" ? "user" : "assistant", content: h.text })),
            { role: "user", content: userMsg }
          ],
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "something went wrong bestie 😔";
      setHistory(h => [...h, { from: "ai", text }]);
    } catch {
      setHistory(h => [...h, { from: "ai", text: "oops, connection issue! try again ✨" }]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>🤖</div>
          <div>
            <h2 className="text-white font-black text-lg" style={{fontFamily:"Georgia, serif"}}>Lovie AI</h2>
            <p className="text-green-400 text-[10px]">● Your creator assistant · always on</p>
          </div>
        </div>
      </div>
      {/* Suggestions */}
      {history.length === 0 && (
        <div className="px-4 mb-4">
          <p className="text-white/40 text-xs mb-2">Try asking:</p>
          <div className="grid grid-cols-2 gap-2">
            {AI_SUGGESTIONS.map((s, i) => (
              <Glass key={i} className="p-3 cursor-pointer hover:bg-white/8 transition-all" onClick={() => { setInput(s.title); }}>
                <span className="text-xl mb-1 block">{s.icon}</span>
                <p className="text-white text-xs font-semibold">{s.title}</p>
                <p className="text-white/40 text-[10px] mt-0.5">{s.desc}</p>
              </Glass>
            ))}
          </div>
        </div>
      )}
      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4 no-scrollbar">
        {history.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start gap-2"}`}>
            {m.from === "ai" && <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>🤖</div>}
            <Glass className={`max-w-[80%] px-3 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "text-white" : "text-white/85"}`} style={m.from === "user" ? {background:"linear-gradient(135deg,#CE93D8,#F06292)"} : {}}>
              {m.text}
            </Glass>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>🤖</div>
            <Glass className="px-4 py-3 flex gap-1.5 items-center">
              {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#CE93D8] animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}
            </Glass>
          </div>
        )}
      </div>
      {/* Input */}
      <div className="px-4 pb-24">
        <Glass className="flex items-center gap-2 px-3 py-2.5">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && askAI()} className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30" placeholder="Ask Lovie AI anything ✨" />
          <button onClick={askAI} disabled={loading} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all active:scale-95" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>↑</button>
        </Glass>
      </div>
    </div>
  );
}

function RoomsPage({ setPage }) {
  const rooms = [
    { name:"Aurora's Fashion Room", host:"@aurora.vibe", emoji:"👗", gradient:"from-pink-600 to-rose-500", live:true, count:24 },
    { name:"Study Café ☕", host:"@luna.dreamer", emoji:"📚", gradient:"from-green-600 to-emerald-500", live:true, count:12 },
    { name:"Music Lounge", host:"@neon.codex", emoji:"🎵", gradient:"from-violet-600 to-indigo-500", live:false, count:0 },
    { name:"Dream Bedroom 🌙", host:"@prism.girl", emoji:"🛏️", gradient:"from-purple-700 to-violet-600", live:true, count:8 },
    { name:"Gaming Den", host:"@zephyr.x", emoji:"🎮", gradient:"from-blue-600 to-cyan-500", live:false, count:0 },
  ];
  return (
    <div className="flex flex-col h-full">
      <TopBar title="Virtual Rooms 🏠" right={<GradBtn small>Create</GradBtn>} />
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3 no-scrollbar">
        {rooms.map((r, i) => (
          <Glass key={i} className="overflow-hidden cursor-pointer hover:scale-[1.01] transition-all">
            <div className={`h-20 bg-gradient-to-r ${r.gradient} flex items-center px-4 gap-3`}>
              <span className="text-4xl">{r.emoji}</span>
              <div className="flex-1">
                <p className="text-white font-bold">{r.name}</p>
                <p className="text-white/60 text-xs">{r.host}</p>
              </div>
              {r.live ? (
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white">● LIVE</span>
                  <span className="text-white/70 text-xs">{r.count} inside</span>
                </div>
              ) : (
                <span className="text-white/30 text-xs">Offline</span>
              )}
            </div>
            {r.live && (
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex -space-x-1">
                  {["🌸","⚡","🌙"].map((a,j) => <div key={j} className="w-6 h-6 rounded-full border border-[#0a0a0f] flex items-center justify-center text-sm bg-gradient-to-br from-[#CE93D8] to-[#F06292]">{a}</div>)}
                </div>
                <GradBtn small>Join Room</GradBtn>
              </div>
            )}
          </Glass>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({ setPage }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 no-scrollbar">
      <TopBar title="Creator Dashboard 📊" />
      <div className="px-4 space-y-4">
        {/* Aura */}
        <Glass className="p-4 bg-gradient-to-br from-[#CE93D8]/10 to-[#F06292]/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Aura Score</p>
              <p className="text-4xl font-black text-white">9,842</p>
              <p className="text-green-400 text-xs mt-0.5">↑ +234 this week · Top 2%</p>
            </div>
            <span className="text-5xl">🔮</span>
          </div>
          <div className="flex gap-1">
            {[60,75,55,80,90,70,85].map((h,i) => (
              <div key={i} className="flex-1 rounded-sm" style={{height:`${h*0.5}px`, background:`linear-gradient(to top, #CE93D8, #F06292)`, opacity:0.7+i*0.04}} />
            ))}
          </div>
        </Glass>
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[["128K","Followers","↑ +2.1K"],["842","Posts","This Month: 23"],["$4,210","Earned","This Month"],["89%","Aura Quality","Creativity Score"]].map(([v,l,sub]) => (
            <Glass key={l} className="p-3">
              <p className="text-2xl font-black text-white">{v}</p>
              <p className="text-white/50 text-xs">{l}</p>
              <p className="text-[#CE93D8] text-[10px] mt-1">{sub}</p>
            </Glass>
          ))}
        </div>
        {/* AI Insights */}
        <Glass className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🤖</span>
            <p className="text-white font-bold text-sm">AI Growth Insights</p>
          </div>
          <div className="space-y-2">
            {["Post Reels on Tuesday 8PM for 3x reach","Your fashion content gets 40% more saves","Collab with @neon.codex — vibe match 94%"].map((t,i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                <span className="text-[#CE93D8] mt-0.5">✦</span>{t}
              </div>
            ))}
          </div>
        </Glass>
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {[["🎬","New Reel"],["🛍️","Open Shop"],["💰","Monetize"]].map(([e,l]) => (
            <Glass key={l} className="p-3 text-center cursor-pointer hover:bg-white/8 transition-all" onClick={() => l==="Monetize"&&setPage("monetize")}>
              <span className="text-2xl">{e}</span>
              <p className="text-white/60 text-[10px] mt-1">{l}</p>
            </Glass>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonetizePage({ setPage }) {
  const streams = [
    { icon:"🛍️", title:"Creator Shop", desc:"Sell digital products & merch", earned:"$1,840", color:"#CE93D8" },
    { icon:"🤝", title:"Affiliate Links", desc:"Fashion & beauty partnerships", earned:"$920", color:"#F06292" },
    { icon:"💎", title:"Paid Communities", desc:"3 exclusive communities", earned:"$780", color:"#81C784" },
    { icon:"💝", title:"Tips & Donations", desc:"From your community", earned:"$470", color:"#FFB74D" },
    { icon:"🏷️", title:"Brand Deals", desc:"AI-matched sponsorships", earned:"$200", color:"#90CAF9" },
  ];
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 no-scrollbar">
      <TopBar title="Monetization 💰" />
      <div className="px-4 space-y-4">
        <Glass className="p-4 bg-gradient-to-br from-[#CE93D8]/10 to-[#F06292]/10 text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total Earned</p>
          <p className="text-5xl font-black text-white">$4,210</p>
          <p className="text-green-400 text-sm mt-1">↑ +$830 this month 🚀</p>
        </Glass>
        <p className="text-white/40 text-xs uppercase tracking-wider px-1">Revenue Streams</p>
        {streams.map((s,i) => (
          <Glass key={i} className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/8 transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:`${s.color}20`, border:`1px solid ${s.color}30`}}>{s.icon}</div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{s.title}</p>
              <p className="text-white/40 text-xs">{s.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-sm">{s.earned}</p>
              <p className="text-[10px] text-green-400">Active ✓</p>
            </div>
          </Glass>
        ))}
        <Glass className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🤖</span>
            <p className="text-white font-bold text-sm">AI Brand Matchmaking</p>
          </div>
          <p className="text-white/60 text-xs mb-3">3 brands want to collab with you this week</p>
          <GradBtn className="w-full" gradient="from-amber-500 to-orange-500">View Brand Deals ✨</GradBtn>
        </Glass>
      </div>
    </div>
  );
}

function SettingsPage({ setPage }) {
  const [dark, setDark] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [aimode, setAimode] = useState(true);
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 no-scrollbar">
      <TopBar title="Settings ⚙️" />
      <div className="px-4 space-y-4">
        <Glass className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background:"linear-gradient(135deg,#CE93D8,#F06292)"}}>🌸</div>
          <div className="flex-1">
            <p className="text-white font-bold">aurora.vibe</p>
            <p className="text-white/40 text-xs">aurora@lovie.app</p>
          </div>
          <GradBtn small>Edit</GradBtn>
        </Glass>
        {[
          { label:"Appearance", icon:"🎨", items:[
            { label:"Dark Mode", toggle:true, val:dark, set:setDark },
            { label:"Aesthetic Theme", sub:"Soft Glow" },
          ]},
          { label:"AI & Features", icon:"🤖", items:[
            { label:"AI Assistant", toggle:true, val:aimode, set:setAimode },
            { label:"Mood Feed", sub:"Always on" },
            { label:"Vibe Match", sub:"Open to matches" },
          ]},
          { label:"Privacy", icon:"🔒", items:[
            { label:"Notifications", toggle:true, val:notifs, set:setNotifs },
            { label:"Secret Communities", sub:"Invite only" },
            { label:"Aura Score", sub:"Visible to all" },
          ]},
        ].map(section => (
          <div key={section.label}>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2 px-1">{section.icon} {section.label}</p>
            <Glass className="divide-y divide-white/5">
              {section.items.map((item,i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-white text-sm">{item.label}</p>
                    {item.sub && <p className="text-white/30 text-xs">{item.sub}</p>}
                  </div>
                  {item.toggle ? (
                    <button onClick={() => item.set(!item.val)} className={`w-11 h-6 rounded-full transition-all relative ${item.val?"bg-gradient-to-r from-[#CE93D8] to-[#F06292]":"bg-white/10"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${item.val?"left-6":"left-1"}`} />
                    </button>
                  ) : <span className="text-white/30 text-sm">›</span>}
                </div>
              ))}
            </Glass>
          </div>
        ))}
        <button onClick={() => setPage("login")} className="w-full py-3 rounded-2xl text-red-400 text-sm font-medium border border-red-400/20 bg-red-400/5 hover:bg-red-400/10 transition-all">Sign Out</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function LovieApp() {
  const [page, setPage] = useState("splash");
  const [mood, setMood] = useState(null);
  const showNav = ["home","explore","reels","chat","profile"].includes(page);
  const showExtra = ["ai","rooms","dashboard","monetize","settings"].includes(page);

  const renderPage = () => {
    switch(page) {
      case "splash": return <SplashPage onDone={() => setPage("onboarding")} />;
      case "onboarding": return <OnboardingPage setPage={setPage} />;
      case "login": return <LoginPage setPage={setPage} />;
      case "mood": return <MoodPage setPage={setPage} setMood={setMood} />;
      case "home": return <HomePage setPage={setPage} mood={mood} />;
      case "explore": return <ExplorePage setPage={setPage} />;
      case "reels": return <ReelsPage />;
      case "chat": return <ChatPage setPage={setPage} />;
      case "profile": return <ProfilePage setPage={setPage} />;
      case "ai": return <AIPage setPage={setPage} />;
      case "rooms": return <RoomsPage setPage={setPage} />;
      case "dashboard": return <DashboardPage setPage={setPage} />;
      case "monetize": return <MonetizePage setPage={setPage} />;
      case "settings": return <SettingsPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} mood={mood} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{background:"#050508"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
        .no-scrollbar::-webkit-scrollbar{display:none;}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
        * { font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif; }
      `}</style>
      {/* Phone frame */}
      <div className="relative w-[390px] h-[844px] rounded-[48px] overflow-hidden border border-white/10" style={{background:"#0a0a0f", boxShadow:"0 0 80px rgba(206,147,216,0.15), 0 40px 80px rgba(0,0,0,0.6)"}}>
        {/* Status bar */}
        {!["splash","onboarding"].includes(page) && (
          <div className="flex items-center justify-between px-6 pt-3 pb-1">
            <span className="text-white/60 text-xs font-medium">9:41</span>
            <div className="w-24 h-6 rounded-full bg-black absolute left-1/2 -translate-x-1/2 top-1" />
            <div className="flex items-center gap-1">
              <span className="text-white/60 text-xs">●●●</span>
              <span className="text-white/60 text-xs">WiFi</span>
              <span className="text-white/60 text-xs">🔋</span>
            </div>
          </div>
        )}
        {/* Extra Nav: top bar for secondary pages */}
        {showExtra && (
          <div className="flex items-center gap-2 px-4 pt-2 pb-1 border-b border-white/5">
            <button onClick={() => setPage("home")} className="text-white/50 text-sm mr-1">‹ Home</button>
            <div className="flex-1" />
            {page==="profile" && <button onClick={()=>setPage("dashboard")} className="text-[#CE93D8] text-xs">Dashboard</button>}
          </div>
        )}
        {/* Secondary pages nav pills */}
        {!["splash","onboarding","login","mood"].includes(page) && !showNav && (
          <div className="flex gap-1 px-3 pb-2 overflow-x-auto no-scrollbar">
            {[["🤖","ai","AI"],["🏠","rooms","Rooms"],["📊","dashboard","Studio"],["💰","monetize","Money"],["⚙️","settings","Settings"]].map(([emoji,id,label]) => (
              <button key={id} onClick={()=>setPage(id)} className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${page===id?"text-white":"text-white/40 bg-white/3"}`} style={page===id?{background:"linear-gradient(135deg,#CE93D8,#F06292)"}:{}}>
                {emoji} {label}
              </button>
            ))}
          </div>
        )}
        {/* Main content */}
        <div className="h-full overflow-hidden">
          {renderPage()}
        </div>
        {/* Bottom Nav */}
        {showNav && <BottomNav page={page} setPage={setPage} />}
        {/* Home indicator */}
        {!["splash"].includes(page) && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/20" />
        )}
      </div>
    </div>
  );
}
