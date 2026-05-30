/* ==========================================================
   PrepPath Phase 2 — Career Assessment
   assessment.js  |  Data + Scoring Engine + UI
========================================================== */

/* ----------------------------------------------------------
   1. ROLES  (36 roles, 11 clusters)
---------------------------------------------------------- */
const ROLES = {
  1:  { name: "Medical Doctor / Nurse / GP",            cluster: "Health & Wellbeing",             titles: "General Practitioner, Nurse, Midwife, Physician Assistant",                       desc: "Provides medical care through diagnosis, treatment, and monitoring of patients." },
  2:  { name: "Mental Health Specialist",               cluster: "Health & Wellbeing",             titles: "Psychologist, Therapist, Counselor, Psychiatrist",                                 desc: "Supports emotional and psychological wellbeing through therapy and mental health treatment." },
  3:  { name: "Pharmaceutical & Lab Scientist",         cluster: "Health & Wellbeing",             titles: "Pharmacist, Biomedical Scientist, Lab Technician, Clinical Researcher",             desc: "Conducts testing, research, and medication development in lab or pharmacy settings." },
  4:  { name: "Social Worker / Community Support",      cluster: "Health & Wellbeing",             titles: "Social Worker, Welfare Advisor, Community Officer, Case Manager",                   desc: "Supports vulnerable individuals and communities through advocacy and welfare services." },
  5:  { name: "Software & App Developer",               cluster: "Technology & Digital",           titles: "Frontend Developer, Backend Developer, Full Stack, Mobile App Developer",           desc: "Designs, develops, and maintains software or mobile applications." },
  6:  { name: "Data & AI Specialist",                   cluster: "Technology & Digital",           titles: "Data Analyst, Data Scientist, ML Engineer, Data Engineer",                         desc: "Uses data to generate insights or build intelligent systems for decision-making." },
  7:  { name: "Cybersecurity Specialist",               cluster: "Technology & Digital",           titles: "Cybersecurity Analyst, Cloud Engineer, Network Admin, DevOps",                     desc: "Protects digital systems and networks from cyber threats." },
  8:  { name: "Product Manager / Tech Strategy",        cluster: "Technology & Digital",           titles: "Product Manager, Growth Manager, Technical Program Manager",                       desc: "Bridges business and technology to define, build, and grow digital products." },
  9:  { name: "General Manager / Executive",            cluster: "Business & Strategy",            titles: "Operations Manager, Director, Executive Officer, Business Unit Head",               desc: "Oversees departments or businesses, managing operations, strategy, and decision-making." },
  10: { name: "Business Analyst / Consultant",          cluster: "Business & Strategy",            titles: "Business Analyst, Management Consultant, Strategy Analyst",                        desc: "Improves business performance through data-driven analysis and strategic planning." },
  11: { name: "Human Resources / People Ops",           cluster: "Business & Strategy",            titles: "HR Manager, Talent Partner, L&D Specialist, Recruiter",                           desc: "Manages recruitment, employee development, and organisational culture." },
  12: { name: "Supply Chain & Logistics Manager",       cluster: "Business & Strategy",            titles: "Procurement Manager, Logistics Coordinator, Inventory Manager",                   desc: "Oversees the flow of goods, inventory, sourcing, and transportation." },
  13: { name: "Entrepreneur / Startup Founder",         cluster: "Business & Strategy",            titles: "Startup Founder, Business Owner, Social Entrepreneur",                            desc: "Builds and grows a new business or venture across multiple functions." },
  14: { name: "Accountant / Auditor",                   cluster: "Finance, Legal & Policy",        titles: "Certified Accountant, Auditor, Financial Controller, Bookkeeper",                 desc: "Manages financial records, audits, and reporting for accuracy and compliance." },
  15: { name: "Finance Analyst / Banking Professional", cluster: "Finance, Legal & Policy",        titles: "Investment Analyst, Commercial Banker, Financial Advisor, Credit Analyst",         desc: "Provides financial analysis, forecasting, or investment services." },
  16: { name: "Lawyer / Legal Professional",            cluster: "Finance, Legal & Policy",        titles: "Corporate Lawyer, Legal Advisor, Paralegal, Legal Counsel",                       desc: "Advises on legal matters, represents clients, or supports compliance." },
  17: { name: "Policy & Government Officer",            cluster: "Finance, Legal & Policy",        titles: "Policy Analyst, Regulatory Officer, Government Affairs Specialist",               desc: "Develops and enforces policies and regulations for public or private institutions." },
  18: { name: "Teacher / Educator / Academic",          cluster: "Education & Knowledge",          titles: "School Teacher, University Lecturer, Academic Researcher, Tutor",                 desc: "Educates learners of all ages or conducts research in academic settings." },
  19: { name: "Interpreter / Multilingual Specialist",  cluster: "Education & Knowledge",          titles: "Interpreter, Translator, Localisation Specialist",                                desc: "Facilitates communication across languages in spoken or written form." },
  20: { name: "Architect / Urban Designer",             cluster: "Design & Built Environment",     titles: "Architect, Urban Planner, Interior Designer, Landscape Architect",                 desc: "Designs and plans buildings, urban spaces, and environments." },
  21: { name: "Visual & UX/UI Designer",                cluster: "Design & Built Environment",     titles: "Graphic Designer, UX Designer, UI Designer, Art Director",                        desc: "Creates visual experiences for branding, digital products, or media." },
  22: { name: "Creative Media & Content Professional",  cluster: "Creative & Communication",       titles: "Content Creator, Copywriter, Video Producer, Podcast Host",                       desc: "Produces written, video, or multimedia content for digital platforms." },
  23: { name: "Marketing & Communications Manager",     cluster: "Creative & Communication",       titles: "Digital Marketer, Brand Manager, PR Coordinator, Comms Director",                 desc: "Promotes products or organisations through campaigns, branding, and strategy." },
  24: { name: "Writer / Editor / Journalist",           cluster: "Creative & Communication",       titles: "Journalist, Editor, Author, Content Strategist",                                  desc: "Researches and writes compelling stories, articles, or content for audiences." },
  25: { name: "Fashion & Textile Designer",             cluster: "Creative & Communication",       titles: "Fashion Designer, Textile Designer, Costume Designer, Stylist",                   desc: "Creates clothing, accessories, and textile products blending artistry with function." },
  26: { name: "Chef / Culinary Professional",           cluster: "Hospitality & Services",         titles: "Chef, Pastry Chef, Sous Chef, Kitchen Manager",                                   desc: "Prepares meals and manages kitchen operations in professional settings." },
  27: { name: "Hospitality & Events Manager",           cluster: "Hospitality & Services",         titles: "Hotel Manager, Event Planner, Venue Coordinator",                                 desc: "Manages guest experiences and coordinates events or hospitality services." },
  28: { name: "Hair, Beauty & Wellness Professional",   cluster: "Hospitality & Services",         titles: "Hairstylist, Aesthetician, Nail Technician, Spa Therapist",                       desc: "Delivers grooming, skincare, and wellness services to clients." },
  29: { name: "Civil / Infrastructure Engineer",        cluster: "Engineering & Physical Systems", titles: "Civil Engineer, Structural Engineer, Transportation Engineer",                     desc: "Plans and oversees construction of public infrastructure and transport systems." },
  30: { name: "Mechanical / Electrical Engineer",       cluster: "Engineering & Physical Systems", titles: "Mechanical Engineer, Electrical Engineer, Production Engineer",                   desc: "Designs and maintains mechanical or electrical systems in industrial settings." },
  31: { name: "Environmental & Energy Engineer",        cluster: "Engineering & Physical Systems", titles: "Renewable Energy Engineer, Environmental Engineer, Sustainability Consultant",     desc: "Develops sustainable technologies related to energy, water, and the environment." },
  32: { name: "Skilled Trades Technician",              cluster: "Engineering & Physical Systems", titles: "Electrician, Plumber, Machinist, HVAC Technician, Welder",                       desc: "Applies technical skills in construction, repairs, and maintenance hands-on." },
  33: { name: "Pilot / Aviation Professional",          cluster: "Transport & Safety",             titles: "Commercial Pilot, Air Traffic Controller, Aviation Engineer",                     desc: "Operates, manages, or supports aircraft and aviation systems." },
  34: { name: "Emergency & Protective Services",        cluster: "Transport & Safety",             titles: "Police Officer, Firefighter, Paramedic, Security Officer",                        desc: "Maintains community safety and responds to emergencies." },
  35: { name: "NGO / International Development Officer",cluster: "Public Services & Impact",       titles: "Program Manager, Aid Worker, Field Coordinator, Development Officer",              desc: "Leads or supports humanitarian and development projects locally or globally." },
  36: { name: "Sports Coach / PE Professional",         cluster: "Public Services & Impact",       titles: "Sports Coach, PE Teacher, Athletic Trainer, Sports Development Officer",           desc: "Coaches athletes, teaches physical education, or manages sport programmes." },
};

/* ----------------------------------------------------------
   2. CONTEXT QUESTIONS  (unscored)
---------------------------------------------------------- */
const CONTEXT_QUESTIONS = [
  {
    id: "CQ1",
    dim: "Context",
    text: "What country are you currently living in?",
    type: "text",
  },
  {
    id: "CQ2",
    dim: "Context",
    text: "What is your current study level?",
    type: "single",
    options: [
      "Secondary school (age 13–17)",
      "Pre-university",
      "University student",
      "Recent graduate",
      "Working professional",
    ],
  },
  {
    id: "CQ3",
    dim: "Context",
    text: "How much influence does your family have on your career choice?",
    type: "single",
    options: [
      "Low — I decide fully myself",
      "Medium — I consider their views",
      "High — their expectations matter a lot",
    ],
  },
];

/* ----------------------------------------------------------
   3. D1 — INTERESTS  (17 questions, POS / NEG framing)
   Scoring: POS → Likely=2, Neutral=1, NotLikely=0
            NEG → NotLikely=2, Neutral=1, Likely=0
   Applied to all 4 linked roles.
---------------------------------------------------------- */
const D1 = [
  { id:"IQ1",  neg:false, roles:[1,2,4,12],    text:"Do you find meaning in helping people with their physical or mental health?" },
  { id:"IQ2",  neg:false, roles:[5,6,7,8],     text:"Do you enjoy building things with software, code, or digital tools?" },
  { id:"IQ3",  neg:false, roles:[4,19,17,13],  text:"Does working toward social change or helping communities excite you?" },
  { id:"IQ4",  neg:false, roles:[9,13,11,10],  text:"Do you enjoy leading a team or making big decisions that affect others?" },
  { id:"IQ5",  neg:false, roles:[16,17,31,10], text:"Are you drawn to how laws, contracts, or government policy work in practice?" },
  { id:"IQ6",  neg:false, roles:[21,25,22,20], text:"Do you enjoy creating visual work — graphics, design, fashion, or art?" },
  { id:"IQ7",  neg:false, roles:[15,14,6,10],  text:"Do you enjoy analysing numbers, markets, or financial data?" },
  { id:"IQ8",  neg:false, roles:[18,36,11,20], text:"Does teaching, coaching, or helping someone learn something new energise you?" },
  { id:"IQ9",  neg:false, roles:[24,22,23,17], text:"Do you enjoy writing, articles, stories, reports, or creative content?" },
  { id:"IQ10", neg:false, roles:[6,5,7,8],     text:"Are you excited by new technology like AI, apps, or cybersecurity?" },
  { id:"IQ11", neg:false, roles:[26,27,28,23], text:"Do you enjoy cooking, hosting, or creating experiences for other people?" },
  { id:"IQ12", neg:false, roles:[20,29,30,21], text:"Would you enjoy designing or planning buildings, cities, or physical spaces?" },
  { id:"IQ13", neg:true,  roles:[32,35,26,33], text:"Would you find it frustrating to spend most of your day at a desk doing paperwork?" },
  { id:"IQ14", neg:true,  roles:[19,11,27,23], text:"Would you find it boring to work alone on a computer with little human interaction?" },
  { id:"IQ15", neg:true,  roles:[33,34,1,29],  text:"Would you feel uncomfortable in fast-paced, high-pressure emergency situations?" },
  { id:"IQ16", neg:true,  roles:[13,8,22,31],  text:"Would you find it dull if your job required you to follow the same fixed process every day?" },
  { id:"IQ17", neg:true,  roles:[32,36,29,28], text:"Would you struggle to enjoy a job that kept you indoors with no physical activity?" },
];

/* ----------------------------------------------------------
   4. D2 — WORK STYLE  (8 questions, forced A or B)
   Scoring: chosen side → 2pts to all linked roles on that side
---------------------------------------------------------- */
const D2 = [
  {
    id:"WQ1", text:"When working on a task, you prefer to:",
    optA:"Work independently with full ownership",         rolesA:[32,6,14,24,16],
    optB:"Collaborate closely with others, sharing ideas", rolesB:[9,11,27,18,23],
  },
  {
    id:"WQ2", text:"The environment that energises you more:",
    optA:"Structured — clear goals, defined steps, predictable",        rolesA:[14,20,3,29,34],
    optB:"Dynamic — fast-changing, varied, improvise as you go",        rolesB:[13,5,23,35,8],
  },
  {
    id:"WQ3", text:"When solving a problem, you tend to:",
    optA:"Analyse information carefully and systematically first",       rolesA:[6,14,10,15,16],
    optB:"Act quickly, try things, and adjust based on results",        rolesB:[13,5,7,23,36],
  },
  {
    id:"WQ4", text:"The type of work that fits you better:",
    optA:"Mostly mental — research, analysis, writing, strategy",       rolesA:[6,15,16,24,18],
    optB:"Mostly hands-on — building, making, moving, creating",        rolesB:[32,26,29,30,28],
  },
  {
    id:"WQ5", text:"In a team, the role you naturally take:",
    optA:"Planner or strategist — set the direction",                   rolesA:[9,17,10,15,8],
    optB:"Builder or executor — get things done",                       rolesB:[5,32,26,30,29],
  },
  {
    id:"WQ6", text:"How you prefer to interact with people at work:",
    optA:"Minimal interaction — I focus best with quiet time",          rolesA:[5,6,14,24,3],
    optB:"Constant interaction — people and energy all day",            rolesB:[23,28,27,36,4],
  },
  {
    id:"WQ7", text:"How you prefer to make decisions:",
    optA:"Using logic, data, and objective evidence",                   rolesA:[6,14,15,7,10],
    optB:"Using instinct, empathy, and reading people",                 rolesB:[4,18,11,2,36],
  },
  {
    id:"WQ8", text:"The work rhythm you prefer:",
    optA:"Deep focus on one long project at a time",                    rolesA:[3,16,24,29,6],
    optB:"Managing many varied tasks and switching between them",       rolesB:[23,27,13,34,11],
  },
];

/* ----------------------------------------------------------
   5. D3 — VALUES
   Scale (VQ1–VQ3): Low=0, Medium=1, High=2 → to Hi-linked roles
                    Lo-linked roles always get 0
   Trade-off (VQ4–VQ7): chosen option → 2pts to its roles
---------------------------------------------------------- */
const D3_SCALE = [
  {
    id:"VQ1", text:"How important is it that your work directly helps or serves other people?",
    optLow:"Not important — impact on people doesn't drive me",
    optMid:"Somewhat important",
    optHigh:"Very important — helping people is core to why I work",
    rolesHigh:[1,2,4,28,35], rolesLow:[9,12,27,36],
  },
  {
    id:"VQ2", text:"How important is job security and stability to you?",
    optLow:"Not important — I embrace risk and uncertainty",
    optMid:"Somewhat important",
    optHigh:"Very important — I need to feel financially stable",
    rolesHigh:[14,30,3,29,34], rolesLow:[13,5,22,25],
  },
  {
    id:"VQ3", text:"How important is working in a role that contributes to the environment or social good?",
    optLow:"Not a priority for me",
    optMid:"Somewhat important",
    optHigh:"A core priority — I want my work to matter beyond profit",
    rolesHigh:[35,4,2,31,17], rolesLow:[13,33,19,36],
  },
];

const D3_TRADEOFF = [
  {
    id:"VQ4", text:"If you had to choose: a job that pays 40% more but little creative freedom, OR full creative control but lower pay?",
    optA:"Higher pay, less creative freedom",      rolesA:[14,15,9,12,7],
    optB:"Lower pay, full creative freedom",       rolesB:[21,22,24,25,20],
  },
  {
    id:"VQ5", text:"If you had to choose: a very public-facing role, OR working behind the scenes where results are recognised?",
    optA:"Behind the scenes — results matter, not recognition", rolesA:[6,14,30,3,31],
    optB:"Public-facing — I want to present, publish, or be seen", rolesB:[23,22,18,24,27],
  },
  {
    id:"VQ6", text:"If you had to choose: a stable corporate job with clear progression, OR building your own venture with no guarantees?",
    optA:"Stable corporate path — security and structure",  rolesA:[14,9,16,18,30],
    optB:"Own venture — freedom and ownership, despite the risk", rolesB:[13,5,22,21,25],
  },
  {
    id:"VQ7", text:"If you had to choose: working with people all day, OR working primarily with ideas, data, or objects?",
    optA:"Primarily with ideas, data, or objects",          rolesA:[6,14,5,24,31],
    optB:"Primarily with people — interaction is what I enjoy", rolesB:[1,19,27,4,36],
  },
];

/* ----------------------------------------------------------
   6. D4 — STRENGTHS  (5 statements)
   Scoring: Agree=2, Somewhat Agree=1, Disagree=0
   Applied to all linked roles.
---------------------------------------------------------- */
const D4 = [
  { id:"SQ1", roles:[2,4,18,11,12],  text:"People often come to me for advice or to talk through a problem." },
  { id:"SQ2", roles:[14,6,16,3,10],  text:"I tend to catch errors, inconsistencies, or gaps that others miss." },
  { id:"SQ3", roles:[19,24,10,8,22], text:"I can explain complicated ideas clearly and simply." },
  { id:"SQ4", roles:[9,34,33,13,1],  text:"I naturally step up and take charge in uncertain or stressful situations." },
  { id:"SQ5", roles:[21,20,25,22,23],text:"I have a strong visual sense — I notice design, aesthetics, and how things look." },
];

/* ----------------------------------------------------------
   7. D5 — BONUS / TIEBREAKER  (5 questions, pick 1 of 4)
   Scoring: selected option → +2 to that one role only
   Applied AFTER D1–D4 normalisation.
---------------------------------------------------------- */
const D5 = [
  {
    id:"BQ1", text:"Which environment feels most natural to you?",
    options:[
      { label:"A", text:"A lab, clinic, or research facility",          role:3  },
      { label:"B", text:"A government or public policy institution",     role:35 },
      { label:"C", text:"A classroom, campus, or training centre",       role:18 },
      { label:"D", text:"A startup, tech hub, or co-working space",      role:13 },
    ],
  },
  {
    id:"BQ2", text:"What kind of problem would you most enjoy solving?",
    options:[
      { label:"A", text:"How to treat or care for a patient",            role:1  },
      { label:"B", text:"How to prevent a cyberattack or data breach",   role:7  },
      { label:"C", text:"How to grow a brand and reach new audiences",   role:23 },
      { label:"D", text:"How to design a sustainable energy system",     role:31 },
    ],
  },
  {
    id:"BQ3", text:"Which would you find most satisfying to manage?",
    options:[
      { label:"A", text:"A hotel, restaurant, or large event",           role:27 },
      { label:"B", text:"A construction or infrastructure project",       role:29 },
      { label:"C", text:"A legal case or compliance process",            role:16 },
      { label:"D", text:"A supply chain and logistics operation",        role:12 },
    ],
  },
  {
    id:"BQ4", text:"Which activity sounds most enjoyable day-to-day?",
    options:[
      { label:"A", text:"Writing articles, reports, or creative content",role:24 },
      { label:"B", text:"Designing visuals, interfaces, or products",    role:21 },
      { label:"C", text:"Filming, editing, or managing a media channel", role:22 },
      { label:"D", text:"Styling, sewing, or designing clothing",        role:25 },
    ],
  },
  {
    id:"BQ5", text:"Which hands-on activity appeals most?",
    options:[
      { label:"A", text:"Flying or managing aviation operations",        role:33 },
      { label:"B", text:"Preparing and plating a gourmet meal",         role:26 },
      { label:"C", text:"Coaching athletes or teaching physical skills", role:36 },
      { label:"D", text:"Repairing, installing, or building with tools", role:30 },
    ],
  },
];

/* ----------------------------------------------------------
   8. FLAT QUESTION QUEUE
   Order: CQ1–CQ3, IQ1–IQ17, WQ1–WQ8, VQ1–VQ3, VQ4–VQ7,
          SQ1–SQ5, BQ1–BQ5
---------------------------------------------------------- */
function buildQueue() {
  const q = [];

  // Context questions
  CONTEXT_QUESTIONS.forEach(cq => q.push({ section:"CTX", data:cq }));

  // D1
  D1.forEach(d => q.push({ section:"D1", data:d }));

  // D2
  D2.forEach(d => q.push({ section:"D2", data:d }));

  // D3 scale then trade-off
  D3_SCALE.forEach(d => q.push({ section:"D3_SCALE", data:d }));
  D3_TRADEOFF.forEach(d => q.push({ section:"D3_TRADEOFF", data:d }));

  // D4
  D4.forEach(d => q.push({ section:"D4", data:d }));

  // D5
  D5.forEach(d => q.push({ section:"D5", data:d }));

  return q;
}

/* ----------------------------------------------------------
   9. SCORING ENGINE
---------------------------------------------------------- */

// Calculate max possible score for each role from D1–D4 only
function calcMaxPossible() {
  const max = {};
  for (let id = 1; id <= 36; id++) max[id] = 0;

  // D1: each question can award 2pts to each linked role
  D1.forEach(q => q.roles.forEach(r => { max[r] += 2; }));

  // D2: each question can award 2pts (only one side wins, max = 2)
  D2.forEach(q => {
    q.rolesA.forEach(r => { max[r] += 2; });
    q.rolesB.forEach(r => { max[r] += 2; });
  });

  // D3 Scale: each question can award 2pts to High-linked roles
  // Lo-linked always 0 → not included in max
  D3_SCALE.forEach(q => q.rolesHigh.forEach(r => { max[r] += 2; }));

  // D3 Trade-off: each question can award 2pts (one side only)
  D3_TRADEOFF.forEach(q => {
    q.rolesA.forEach(r => { max[r] += 2; });
    q.rolesB.forEach(r => { max[r] += 2; });
  });

  // D4: each statement can award 2pts to each linked role
  D4.forEach(q => q.roles.forEach(r => { max[r] += 2; }));

  return max;
}

function scoreAssessment(answers) {
  const raw = {};
  for (let id = 1; id <= 36; id++) raw[id] = 0;

  // ── D1 ──
  D1.forEach(q => {
    const ans = answers[q.id]; // "likely" | "neutral" | "notlikely"
    if (ans === undefined) return;
    let pts = 0;
    if (!q.neg) {
      pts = ans === "likely" ? 2 : ans === "neutral" ? 1 : 0;
    } else {
      pts = ans === "notlikely" ? 2 : ans === "neutral" ? 1 : 0;
    }
    q.roles.forEach(r => { raw[r] += pts; });
  });

  // ── D2 ──
  D2.forEach(q => {
    const ans = answers[q.id]; // "A" | "B"
    if (ans === undefined) return;
    if (ans === "A") q.rolesA.forEach(r => { raw[r] += 2; });
    else             q.rolesB.forEach(r => { raw[r] += 2; });
  });

  // ── D3 Scale ──
  D3_SCALE.forEach(q => {
    const ans = answers[q.id]; // "low" | "mid" | "high"
    if (ans === undefined) return;
    const pts = ans === "high" ? 2 : ans === "mid" ? 1 : 0;
    q.rolesHigh.forEach(r => { raw[r] += pts; });
    // rolesLow always get 0 — not scored
  });

  // ── D3 Trade-off ──
  D3_TRADEOFF.forEach(q => {
    const ans = answers[q.id]; // "A" | "B"
    if (ans === undefined) return;
    if (ans === "A") q.rolesA.forEach(r => { raw[r] += 2; });
    else             q.rolesB.forEach(r => { raw[r] += 2; });
  });

  // ── D4 ──
  D4.forEach(q => {
    const ans = answers[q.id]; // "agree" | "somewhat" | "disagree"
    if (ans === undefined) return;
    const pts = ans === "agree" ? 2 : ans === "somewhat" ? 1 : 0;
    q.roles.forEach(r => { raw[r] += pts; });
  });

  // ── Normalise (D1–D4 only) ──
  const maxPossible = calcMaxPossible();
  const normalised = {};
  for (let id = 1; id <= 36; id++) {
    normalised[id] = maxPossible[id] > 0
      ? Math.round((raw[id] / maxPossible[id]) * 100)
      : 0;
  }

  // ── D5 Bonus (applied after normalisation) ──
  D5.forEach(q => {
    const ans = answers[q.id]; // index (0–3)
    if (ans === undefined) return;
    const role = q.options[ans].role;
    normalised[role] += 2;
  });

  // ── Rank ──
  const ranked = Object.entries(normalised)
    .map(([id, score]) => ({ id: Number(id), score }))
    .sort((a, b) => b.score - a.score);

  return { normalised, ranked };
}

/* ----------------------------------------------------------
   10. STATE
---------------------------------------------------------- */
const QUEUE     = buildQueue();
const TOTAL_Q   = QUEUE.length;               // 45
const SCORED_START = 3;                        // first 3 are context (unscored)
const SCORED_TOTAL = TOTAL_Q - SCORED_START;   // 42 scored

let currentIdx = 0;
let answers    = {};        // { questionId: answer }
let ctxAnswers = {};        // { CQ1: text, CQ2: text, CQ3: text }
let selectedVal = null;     // current selection before storing

/* ----------------------------------------------------------
   11. UI — HELPERS
---------------------------------------------------------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

function setProgress(idx) {
  const pct = Math.round((idx / TOTAL_Q) * 100);
  document.getElementById("progress-bar").style.width = pct + "%";
  document.getElementById("progress-label").textContent = `Question ${idx} of ${TOTAL_Q}`;
}

function updateNextBtn() {
  document.getElementById("btn-next").disabled = (selectedVal === null);
}

function dimLabel(section) {
  const map = {
    CTX:"Context", D1:"D1 — Interests", D2:"D2 — Work Style",
    D3_SCALE:"D3 — Values", D3_TRADEOFF:"D3 — Values",
    D4:"D4 — Strengths", D5:"D5 — Bonus",
  };
  return map[section] || section;
}

/* ----------------------------------------------------------
   12. UI — RENDER QUESTION
---------------------------------------------------------- */
function renderQuestion(idx) {
  const item    = QUEUE[idx];
  const { section, data } = item;
  selectedVal   = answers[data.id] !== undefined ? answers[data.id] : null;

  setProgress(idx + 1);
  document.getElementById("dim-badge").textContent  = dimLabel(section);
  document.getElementById("q-number").textContent   = `Question ${idx + 1} of ${TOTAL_Q}`;
  document.getElementById("q-text").textContent     = data.text;
  document.getElementById("btn-back").style.visibility = idx === 0 ? "hidden" : "visible";

  const container = document.getElementById("options-container");
  container.innerHTML = "";
  container.className = "options";

  // ── Context: free text ──
  if (section === "CTX" && data.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your answer…";
    input.value = selectedVal || "";
    input.style.cssText = "width:100%;padding:12px 14px;font-size:15px;border:1.5px solid var(--border);border-radius:8px;font-family:inherit;outline:none;";
    input.addEventListener("input", () => {
      selectedVal = input.value.trim() || null;
      updateNextBtn();
    });
    container.appendChild(input);
    if (selectedVal) updateNextBtn();
    else updateNextBtn();
    updateNextBtn();
  }

  // ── Context: single select ──
  else if (section === "CTX" && data.type === "single") {
    data.options.forEach((opt, i) => {
      const btn = makeOptionBtn(null, opt, i, selectedVal === i,
        () => { selectedVal = i; renderOptionStates(container, i); updateNextBtn(); });
      container.appendChild(btn);
    });
    updateNextBtn();
  }

  // ── D1: Likely / Neutral / Not Likely ──
  else if (section === "D1") {
    container.classList.add("scale-row");
    const opts = [
      { val:"likely",    label:"Likely" },
      { val:"neutral",   label:"Neutral" },
      { val:"notlikely", label:"Not Likely" },
    ];
    opts.forEach(opt => {
      const btn = makeOptionBtn(null, opt.label, opt.val, selectedVal === opt.val,
        () => { selectedVal = opt.val; renderOptionStates(container, opt.val); updateNextBtn(); });
      container.appendChild(btn);
    });
    updateNextBtn();
  }

  // ── D2 & D3 Trade-off: A or B ──
  else if (section === "D2" || section === "D3_TRADEOFF") {
    container.classList.add("two-col");
    [["A", data.optA], ["B", data.optB]].forEach(([val, text]) => {
      const btn = makeOptionBtn(val, text, val, selectedVal === val,
        () => { selectedVal = val; renderOptionStates(container, val); updateNextBtn(); });
      container.appendChild(btn);
    });
    updateNextBtn();
  }

  // ── D3 Scale: Low / Mid / High ──
  else if (section === "D3_SCALE") {
    container.classList.add("scale-row");
    const opts = [
      { val:"low",  label:data.optLow  },
      { val:"mid",  label:data.optMid  },
      { val:"high", label:data.optHigh },
    ];
    opts.forEach(opt => {
      const btn = makeOptionBtn(null, opt.label, opt.val, selectedVal === opt.val,
        () => { selectedVal = opt.val; renderOptionStates(container, opt.val); updateNextBtn(); });
      container.appendChild(btn);
    });
    updateNextBtn();
  }

  // ── D4: Agree / Somewhat / Disagree ──
  else if (section === "D4") {
    container.classList.add("scale-row");
    const opts = [
      { val:"agree",    label:"Agree" },
      { val:"somewhat", label:"Somewhat Agree" },
      { val:"disagree", label:"Disagree" },
    ];
    opts.forEach(opt => {
      const btn = makeOptionBtn(null, opt.label, opt.val, selectedVal === opt.val,
        () => { selectedVal = opt.val; renderOptionStates(container, opt.val); updateNextBtn(); });
      container.appendChild(btn);
    });
    updateNextBtn();
  }

  // ── D5: Pick 1 of 4 ──
  else if (section === "D5") {
    container.classList.add("four-col");
    data.options.forEach((opt, i) => {
      const btn = makeOptionBtn(opt.label, opt.text, i, selectedVal === i,
        () => { selectedVal = i; renderOptionStates(container, i); updateNextBtn(); });
      container.appendChild(btn);
    });
    updateNextBtn();
  }
}

function makeOptionBtn(label, text, val, isSelected, onClick) {
  const btn = document.createElement("button");
  btn.className = "option-btn" + (isSelected ? " selected" : "");
  btn.dataset.val = val;
  if (label) {
    const lSpan = document.createElement("span");
    lSpan.className = "option-label";
    lSpan.textContent = label + ". ";
    btn.appendChild(lSpan);
  }
  btn.appendChild(document.createTextNode(text));
  btn.addEventListener("click", onClick);
  return btn;
}

function renderOptionStates(container, selectedRaw) {
  container.querySelectorAll(".option-btn").forEach(btn => {
    btn.classList.toggle("selected", String(btn.dataset.val) === String(selectedRaw));
  });
}

/* ----------------------------------------------------------
   13. UI — NAVIGATION
---------------------------------------------------------- */
function startAssessment() {
  currentIdx = 0;
  answers    = {};
  ctxAnswers = {};
  selectedVal = null;
  showScreen("screen-question");
  renderQuestion(0);
}

function goNext() {
  if (selectedVal === null) return;
  const { section, data } = QUEUE[currentIdx];

  // Build impact BEFORE storing (so running raw reflects state after this answer)
  const impact = buildImpact(section, data, selectedVal);

  // Store answer
  if (section === "CTX") {
    const val = data.type === "text"
      ? (document.querySelector("#options-container input") || {}).value || selectedVal
      : selectedVal;
    ctxAnswers[data.id] = data.type === "text" ? val : data.options[val];
    answers[data.id] = selectedVal;
  } else {
    answers[data.id] = selectedVal;
  }

  // Refresh scoring panel with this answer's impact
  refreshScoringPanel(impact);

  currentIdx++;
  if (currentIdx >= TOTAL_Q) {
    showResults();
  } else {
    selectedVal = answers[QUEUE[currentIdx].data.id] !== undefined
      ? answers[QUEUE[currentIdx].data.id]
      : null;
    renderQuestion(currentIdx);
  }
}

function goBack() {
  if (currentIdx === 0) return;
  // Save current partial answer if any
  if (selectedVal !== null) answers[QUEUE[currentIdx].data.id] = selectedVal;
  currentIdx--;
  selectedVal = answers[QUEUE[currentIdx].data.id] !== undefined
    ? answers[QUEUE[currentIdx].data.id]
    : null;
  renderQuestion(currentIdx);
}

function restartAssessment() {
  showScreen("screen-welcome");
}

/* ----------------------------------------------------------
   14. UI — RESULTS
---------------------------------------------------------- */
function showResults() {
  const { normalised, ranked } = scoreAssessment(answers);

  showScreen("screen-results");

  // Subtitle personalised by study level if available
  const studyLevel = ctxAnswers["CQ2"] || "";
  const country    = ctxAnswers["CQ1"] || "";
  const sub = document.getElementById("results-subtitle");
  sub.textContent = studyLevel
    ? `Based on your responses${country ? " from " + country : ""} — here are your top career matches${studyLevel ? " as a " + studyLevel.toLowerCase() : ""}.`
    : "Based on your responses, here are your top career matches.";

  // Top 3
  const top3Container = document.getElementById("top3-container");
  top3Container.innerHTML = "";
  const medals = ["🥇","🥈","🥉"];
  const rankLabels = ["1st Match","2nd Match","3rd Match"];
  const rankClasses = ["rank-1","rank-2","rank-3"];

  ranked.slice(0, 3).forEach((item, i) => {
    const role = ROLES[item.id];
    const card = document.createElement("div");
    card.className = `result-card ${rankClasses[i]}`;
    card.innerHTML = `
      <div class="result-rank-row">
        <span class="medal">${medals[i]}</span>
        <span class="result-rank-label">${rankLabels[i]}</span>
        <span class="result-match">${item.score}%</span>
      </div>
      <div class="result-role">${role.name}</div>
      <div class="result-cluster">${role.cluster}</div>
      <div class="result-titles">e.g. ${role.titles}</div>
      <div class="result-desc">${role.desc}</div>
    `;
    top3Container.appendChild(card);
  });

  // Full breakdown
  const maxScore = ranked[0].score || 1;
  const breakdownEl = document.getElementById("full-breakdown");
  breakdownEl.innerHTML = "";
  ranked.forEach((item, i) => {
    const role = ROLES[item.id];
    const barPct = Math.round((item.score / Math.max(maxScore, 1)) * 100);
    const row = document.createElement("div");
    row.className = "breakdown-row";
    row.innerHTML = `
      <span class="breakdown-rank">${i+1}</span>
      <span class="breakdown-name">${role.name}</span>
      <div class="breakdown-bar-wrap">
        <div class="breakdown-bar" style="width:${barPct}%"></div>
      </div>
      <span class="breakdown-pct">${item.score}%</span>
    `;
    breakdownEl.appendChild(row);
  });

  // Context reflection
  const reflEl = document.getElementById("context-reflection");
  const familyAns = ctxAnswers["CQ3"] || "";
  if (familyAns) {
    let familyMsg = "";
    if (familyAns.startsWith("High")) {
      familyMsg = "You indicated that family expectations are important to you. Consider discussing your top matches with them — these are established and respected career paths that may align well with family values.";
    } else if (familyAns.startsWith("Medium")) {
      familyMsg = "You indicated that you consider your family's views. Your top matches reflect your own interests — sharing these results with family can be a great starting point for an informed conversation.";
    } else {
      familyMsg = "You make your own career decisions independently. Trust the results — they reflect your genuine interests and working style.";
    }

    let nextSteps = "";
    if (studyLevel.includes("Secondary")) {
      nextSteps = "As a secondary school student, focus on the <strong>subjects</strong> most relevant to your top match. Look into which university programmes lead to your matched roles.";
    } else if (studyLevel.includes("University") || studyLevel.includes("Pre-university")) {
      nextSteps = "Consider <strong>degree specialisations</strong> and <strong>internship paths</strong> aligned to your top match. Talk to professionals in the field through LinkedIn or university career fairs.";
    } else if (studyLevel.includes("graduate") || studyLevel.includes("professional")) {
      nextSteps = "Explore <strong>transition pathways</strong> into your top matched roles — postgraduate courses, professional certifications, or lateral moves within your current organisation may all apply.";
    }

    reflEl.innerHTML = `
      <h3>Reflection</h3>
      <p><strong>Family influence:</strong> ${familyMsg}</p>
      ${nextSteps ? `<p><strong>Next steps for you:</strong> ${nextSteps}</p>` : ""}
    `;
  } else {
    reflEl.style.display = "none";
  }
}

/* ----------------------------------------------------------
   15. LIVE SCORING PANEL
---------------------------------------------------------- */
let scoringPanelOpen = false;

function toggleScoringPanel() {
  scoringPanelOpen = !scoringPanelOpen;
  const body   = document.getElementById("scoring-body");
  const toggle = document.getElementById("scoring-toggle");
  body.style.display   = scoringPanelOpen ? "block" : "none";
  toggle.textContent   = scoringPanelOpen ? "🔢 Hide Live Scoring" : "🔢 Show Live Scoring";
  // Round corners of toggle when open
  toggle.style.borderRadius = scoringPanelOpen ? "var(--radius) var(--radius) 0 0" : "var(--radius)";
  if (scoringPanelOpen) refreshScoringPanel(null);
}

// Call this after every answer is stored
function refreshScoringPanel(lastImpact) {
  if (!scoringPanelOpen) return;

  const rawScores = calcRunningRaw(answers);
  const maxPossible = calcMaxPossible();

  // ── Last Impact ──
  const impactEl = document.getElementById("last-impact");
  if (!lastImpact) {
    impactEl.innerHTML = `<span class="scoring-empty">Answer a question to see scoring.</span>`;
  } else {
    let noteHtml = `<div class="impact-note">${lastImpact.explanation}</div>`;
    let rowsHtml = lastImpact.affected
      .sort((a, b) => b.pts - a.pts)
      .map(r => `
        <div class="impact-row">
          <span class="impact-pts pts-${r.pts}">+${r.pts}</span>
          <span class="impact-role">${ROLES[r.id].name}</span>
          <span class="impact-cluster">${ROLES[r.id].cluster}</span>
          <span class="impact-total">Total: ${rawScores[r.id]}</span>
        </div>
      `).join("");
    impactEl.innerHTML = noteHtml + rowsHtml;
  }

  // ── Top 10 Standings ──
  const ranked = Object.entries(rawScores)
    .map(([id, raw]) => ({ id: Number(id), raw }))
    .sort((a, b) => b.raw - a.raw);

  const topRaw = ranked[0]?.raw || 1;
  const standingsEl = document.getElementById("live-standings");
  standingsEl.innerHTML = ranked.slice(0, 10).map((item, i) => {
    const barPct = Math.round((item.raw / Math.max(topRaw, 1)) * 100);
    const maxPoss = maxPossible[item.id];
    return `
      <div class="standing-row">
        <span class="standing-rank">${i + 1}</span>
        <span class="standing-name">${ROLES[item.id].name}</span>
        <div class="standing-bar-wrap">
          <div class="standing-bar" style="width:${barPct}%"></div>
        </div>
        <span class="standing-raw">${item.raw}/${maxPoss}</span>
      </div>
    `;
  }).join("");

  // ── All 36 Scores ──
  const allEl = document.getElementById("all-scores");
  allEl.innerHTML = `<div class="all-scores-grid">` +
    ranked.map(item => `
      <div class="score-row">
        <span class="score-id">${item.id}</span>
        <span class="score-name" title="${ROLES[item.id].name}">${ROLES[item.id].name}</span>
        <span class="score-val${item.raw === 0 ? " zero" : ""}">${item.raw}</span>
      </div>
    `).join("") +
  `</div>`;
}

// Compute raw scores from current answers (D1–D4 only, no normalisation, no D5)
function calcRunningRaw(answers) {
  const raw = {};
  for (let id = 1; id <= 36; id++) raw[id] = 0;

  D1.forEach(q => {
    const ans = answers[q.id];
    if (ans === undefined) return;
    let pts = 0;
    if (!q.neg) pts = ans === "likely" ? 2 : ans === "neutral" ? 1 : 0;
    else        pts = ans === "notlikely" ? 2 : ans === "neutral" ? 1 : 0;
    q.roles.forEach(r => { raw[r] += pts; });
  });

  D2.forEach(q => {
    const ans = answers[q.id];
    if (ans === undefined) return;
    if (ans === "A") q.rolesA.forEach(r => { raw[r] += 2; });
    else             q.rolesB.forEach(r => { raw[r] += 2; });
  });

  D3_SCALE.forEach(q => {
    const ans = answers[q.id];
    if (ans === undefined) return;
    const pts = ans === "high" ? 2 : ans === "mid" ? 1 : 0;
    q.rolesHigh.forEach(r => { raw[r] += pts; });
  });

  D3_TRADEOFF.forEach(q => {
    const ans = answers[q.id];
    if (ans === undefined) return;
    if (ans === "A") q.rolesA.forEach(r => { raw[r] += 2; });
    else             q.rolesB.forEach(r => { raw[r] += 2; });
  });

  D4.forEach(q => {
    const ans = answers[q.id];
    if (ans === undefined) return;
    const pts = ans === "agree" ? 2 : ans === "somewhat" ? 1 : 0;
    q.roles.forEach(r => { raw[r] += pts; });
  });

  return raw;
}

// Build the impact object describing what the last answer did
function buildImpact(section, data, answerVal) {
  let affected = [];
  let explanation = "";

  if (section === "CTX") {
    return null; // unscored
  }

  if (section === "D1") {
    const q = data;
    let pts;
    if (!q.neg) {
      pts = answerVal === "likely" ? 2 : answerVal === "neutral" ? 1 : 0;
      const ansLabel = answerVal === "likely" ? "Likely" : answerVal === "neutral" ? "Neutral" : "Not Likely";
      explanation = `D1 Interest (${q.neg ? "NEG" : "POS"}): You answered <strong>${ansLabel}</strong> → <strong>${pts} point${pts !== 1 ? "s" : ""}</strong> added to each of the ${q.roles.length} linked roles.`;
    } else {
      pts = answerVal === "notlikely" ? 2 : answerVal === "neutral" ? 1 : 0;
      const ansLabel = answerVal === "notlikely" ? "Not Likely" : answerVal === "neutral" ? "Neutral" : "Likely";
      explanation = `D1 Interest (NEG — inverted scoring): You answered <strong>${ansLabel}</strong> → <strong>${pts} point${pts !== 1 ? "s" : ""}</strong> added to each of the ${q.roles.length} linked roles. (NEG questions reward "Not Likely" with 2pts to catch response bias.)`;
    }
    affected = q.roles.map(id => ({ id, pts }));
  }

  else if (section === "D2") {
    const chosen = answerVal === "A" ? data.rolesA : data.rolesB;
    const other  = answerVal === "A" ? data.rolesB : data.rolesA;
    explanation = `D2 Work Style (forced choice): You chose <strong>Option ${answerVal}</strong> → <strong>+2 pts</strong> to ${chosen.length} roles on that side. The other ${other.length} roles get 0.`;
    affected = [
      ...chosen.map(id => ({ id, pts: 2 })),
      ...other.map(id => ({ id, pts: 0 })),
    ];
  }

  else if (section === "D3_SCALE") {
    const pts = answerVal === "high" ? 2 : answerVal === "mid" ? 1 : 0;
    const label = answerVal === "high" ? "High" : answerVal === "mid" ? "Medium" : "Low";
    explanation = `D3 Values (scale): You answered <strong>${label}</strong> → <strong>${pts} pt${pts !== 1 ? "s" : ""}</strong> to ${data.rolesHigh.length} High-linked roles. Low-linked roles always receive 0.`;
    affected = [
      ...data.rolesHigh.map(id => ({ id, pts })),
      ...data.rolesLow.map(id => ({ id, pts: 0 })),
    ];
  }

  else if (section === "D3_TRADEOFF") {
    const chosen = answerVal === "A" ? data.rolesA : data.rolesB;
    const other  = answerVal === "A" ? data.rolesB : data.rolesA;
    explanation = `D3 Values (trade-off): You chose <strong>Option ${answerVal}</strong> → <strong>+2 pts</strong> to ${chosen.length} roles. The other ${other.length} roles get 0.`;
    affected = [
      ...chosen.map(id => ({ id, pts: 2 })),
      ...other.map(id => ({ id, pts: 0 })),
    ];
  }

  else if (section === "D4") {
    const pts = answerVal === "agree" ? 2 : answerVal === "somewhat" ? 1 : 0;
    const label = answerVal === "agree" ? "Agree" : answerVal === "somewhat" ? "Somewhat Agree" : "Disagree";
    explanation = `D4 Strengths: You answered <strong>${label}</strong> → <strong>${pts} pt${pts !== 1 ? "s" : ""}</strong> added to each of the ${data.roles.length} linked roles.`;
    affected = data.roles.map(id => ({ id, pts }));
  }

  else if (section === "D5") {
    const picked = data.options[answerVal];
    explanation = `D5 Bonus (tiebreaker — applied after normalisation): You selected <strong>Option ${picked.label}</strong> → <strong>+2 pts</strong> to <strong>${ROLES[picked.role].name}</strong> only. Other options get 0.`;
    affected = data.options.map((opt, i) => ({ id: opt.role, pts: i === answerVal ? 2 : 0 }));
  }

  return { explanation, affected };
}

/* ----------------------------------------------------------
   16. INIT
---------------------------------------------------------- */
// Nothing to auto-init — user clicks "Begin Assessment" to start.
