import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  FlaskConical,
  Gavel,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { Language } from "@/context/LanguageContext";

export type GameId = "amazen" | "pluribus" | "safe-future" | "sanction-ladder";

export interface LocalizedText {
  he: string;
  en: string;
}

export interface PortfolioGame {
  id: GameId;
  icon: LucideIcon;
  title: LocalizedText;
  eyebrow: LocalizedText;
  short: LocalizedText;
  long: LocalizedText;
  inquiry: LocalizedText;
  mechanics: Record<Language, string[]>;
  visual: string;
  accent: string;
  href?: string | LocalizedText;
}

export interface RationalePoint {
  icon: LucideIcon;
  title: LocalizedText;
  text: LocalizedText;
}

export const teamKeys = ["uriel", "ori", "jonathan", "joachim", "ido", "dafna", "daria"] as const;

export const uiText = {
  brandTitle: {
    he: "משחקי דמוקרטיה",
    en: "Democracy Games",
  },
  brandSubtitle: {
    he: "Democracy Games Lab",
    en: "Democracy Games Lab",
  },
  nav: {
    rationale: { he: "הרציונל", en: "Rationale" },
    games: { he: "המשחקים", en: "Games" },
    team: { he: "הצוות", en: "Team" },
  },
  language: {
    he: "English",
    en: "עברית",
  },
  heroBadge: {
    he: "אוסף משחקים לחשיבה דמוקרטית",
    en: "A collection of games for democratic thinking",
  },
  heroTitle: {
    he: "לשחק בתוך רגעי ההכרעה של הדמוקרטיה",
    en: "Play inside democracy’s moments of decision",
  },
  heroDescription: {
    he: "פרויקט משחקי-מחקרי שמפתח חוויות אינטראקטיביות על חירות, מוסדות, כוח, זכויות, טכנולוגיה וקבלת החלטות פוליטית.",
    en: "A research-through-games project creating interactive experiences about liberty, institutions, power, rights, technology, and political decision-making.",
  },
  heroGamesButton: {
    he: "לראות את המשחקים",
    en: "Explore the games",
  },
  heroRationaleButton: {
    he: "להבין את הרציונל",
    en: "Read the rationale",
  },
  rationaleKicker: {
    he: "למה משחקים?",
    en: "Why games?",
  },
  rationaleTitle: {
    he: "דמוקרטיה נלמדת טוב יותר כשהיא הופכת למצב שצריך לפעול בתוכו.",
    en: "Democracy becomes more legible when people have to act inside it.",
  },
  gamesKicker: {
    he: "הפעילויות",
    en: "Activities",
  },
  gamesTitle: {
    he: "ארבעה משחקים, ארבע צורות מחשבה",
    en: "Four games, four ways to think",
  },
  gamesIntro: {
    he: "כל כרטיס פותח פרטים על המשחק, השאלה המחקרית שלו והאופן שבו הוא הופך דילמה פוליטית למהלך משחקי.",
    en: "Each card opens the game’s details, research question, and the way it turns a political dilemma into playable action.",
  },
  inquiryLabel: {
    he: "שאלה מובילה",
    en: "Guiding question",
  },
  mechanicsLabel: {
    he: "מרכיבי חוויה",
    en: "Experience elements",
  },
  playGame: {
    he: "כניסה למשחק",
    en: "Enter the game",
  },
  linkPending: {
    he: "קישור משחק יתווסף בהמשך",
    en: "Game link will be added soon",
  },
  teamKicker: {
    he: "יוצרים וחוקרים",
    en: "Creators and researchers",
  },
  devEdit: {
    he: "עריכת טקסט",
    en: "Edit text",
  },
  devDone: {
    he: "סיום עריכה",
    en: "Done editing",
  },
};

export const games: PortfolioGame[] = [
  {
    id: "amazen",
    icon: Sparkles,
    title: { he: "aMAZE Yourself", en: "aMAZE Yourself" },
    eyebrow: { he: "גלו את עצמכם", en: "Discover yourself" },
    short: {
      he: "מסע משחקי שבו בחירות אישיות, דילמות ציבוריות ומשוב ערכי מתחברים לתמונת זהות פוליטית מתפתחת.",
      en: "A playable journey where personal choices, public dilemmas, and value feedback form an evolving picture of political identity.",
    },
    long: {
      he: "המשחק המקורי של הלובי: סימולציה פוליטית-נרטיבית שמובילה משתתפים דרך תרחישים, תפקידים ודילמות שנוגעות לליברליזם, אוטונומיה ודמוקרטיה. הבחירות נאספות למחקר ומוחזרות לשחקן כמשוב על ערכים, סדרי עדיפויות ודפוסי הכרעה.",
      en: "The original lobby game: a political narrative simulation that moves participants through scenarios, roles, and dilemmas touching liberalism, autonomy, and democracy. Choices are collected for research and reflected back as feedback on values, priorities, and patterns of judgment.",
    },
    inquiry: {
      he: "איך אנשים מזהים את הערכים שמנחים אותם כאשר בחירות פרטיות הופכות להכרעות ציבוריות?",
      en: "How do people recognize the values guiding them when private choices become public decisions?",
    },
    mechanics: {
      he: ["דילמות מתפתחות", "משוב ערכי", "מסלול אישי במבוך", "תוכן דינמי בעזרת AI"],
      en: ["Evolving dilemmas", "Value feedback", "Personal maze path", "AI-supported dynamic content"],
    },
    visual: "/background2.webp",
    accent: "#d7b947",
    href: "https://amazenpolitics.vercel.app/#/lobby",
  },
  {
    id: "pluribus",
    icon: Users,
    title: { he: "aMAZE’n Politics", en: "aMAZE’n Politics" },
    eyebrow: { he: "שלום או צדק? מונרכיה או דמוקרטיה?", en: "Peace or justice? Monarchy or democracy?" },
    short: {
      he: "חוויה נרטיבית במבוך של מפגשים, מדידות ערכים ושאלות על חירות, חוק, כוח וטעם אישי.",
      en: "A narrative maze of encounters, value measures, and questions about liberty, law, power, and personal taste.",
    },
    long: {
      he: "Pluribus משתמש במבוך, דמויות סמליות ושברי מראה כדי לחבר בין פעילויות שונות: דירוגי ערכים ליברליים, קריאה ופרשנות של ״לפני שער החוק״, שאלות על כוח, טעם ועתיד. בסוף נבנית תמונה רפלקטיבית של האופן שבו המשתתף נע בין היחיד לבין הרבים.",
      en: "Pluribus uses a maze, symbolic characters, and mirror shards to connect several activities: liberal value rankings, reading and interpreting Kafka’s Before the Law, and questions about power, taste, and the future. The ending builds a reflective picture of how the participant moves between the individual and the many.",
    },
    inquiry: {
      he: "מה קורה כאשר התלבטות דמוקרטית אינה רק עמדה, אלא מפגש עם דמויות, זיכרונות וסיפורים?",
      en: "What happens when democratic deliberation is not only a position, but an encounter with characters, memories, and stories?",
    },
    mechanics: {
      he: ["מבוך אינטראקטיבי", "שברי מראה", "שאלוני ערכים", "כתיבה פתוחה ורפלקציה"],
      en: ["Interactive maze", "Mirror shards", "Value questionnaires", "Open writing and reflection"],
    },
    visual: "/project-assets/pluribus/maze-overview.png",
    accent: "#f0b35b",
    href: {
      he: "https://pluribus-zeta.vercel.app/",
      en: "https://pluribus-zeta.vercel.app/en",
    },
  },
  {
    id: "safe-future",
    icon: ShieldCheck,
    title: { he: "Safe Future", en: "Safe Future" },
    eyebrow: { he: "סעו בזמן והצילו את העתיד", en: "Travel through time and save the future" },
    short: {
      he: "סימולציית עתיד ישראלית שבה מערכת AI מנהלת מדינה, והמשתתף חוזר לנקודות הכרעה היסטוריות כדי להציל את ההווה.",
      en: "An Israeli future simulation where an AI system governs the state, and the participant returns to historical decision points to save the present.",
    },
    long: {
      he: "Safe Future מתרחש בישראל בשנת 2200, אחרי שמערכת שליטה אוטונומית בשם מש״א קרסה. המשתתף עובד במשרד לעתיד בטוח ונשלח לשנים 1950 ו-2050, שם עליו לקבל החלטות על קליטת עלייה, חלוקת משאבים, ביטחון, פרטיות וטכנולוגיה. המשחק בוחן את המתח בין יעילות, שקיפות, זכויות, מומחיות ושליטה דמוקרטית.",
      en: "Safe Future takes place in Israel in 2200, after an autonomous control system called MASHA collapses. The participant works at the Ministry for a Safe Future and is sent to 1950 and 2050 to make decisions about immigration, resource allocation, security, privacy, and technology. The game explores tensions between efficiency, transparency, rights, expertise, and democratic control.",
    },
    inquiry: {
      he: "מי צריך להכריע כאשר מערכות חיזוי ו-AI מבטיחות להציל חיים אבל מסתירות כוח מהציבור?",
      en: "Who should decide when prediction systems and AI promise to save lives but hide power from the public?",
    },
    mechanics: {
      he: ["מסע בזמן", "תרחישים היסטוריים ועתידיים", "דילמות רב-שלביות", "תגובה דינמית לבחירות"],
      en: ["Time travel", "Historical and future scenarios", "Multi-step dilemmas", "Dynamic response to choices"],
    },
    visual: "/project-assets/safe-future/office-outside.webp",
    accent: "#39d5d8",
    href: "https://safe-future.vercel.app/",
  },
  {
    id: "sanction-ladder",
    icon: Gavel,
    title: { he: "Sanction Ladder", en: "Sanction Ladder" },
    eyebrow: { he: "קבלת החלטות סיכון מול גמול", en: "Risk and reward decision-making" },
    short: {
      he: "משחק ניסויי על בחירה בין הכנה משפטית זהירה לבין ניסיון להעלות במהירות את רמת הסנקציה.",
      en: "An experimental game about choosing between careful legal preparation and quickly escalating sanction severity.",
    },
    long: {
      he: "The Sanction Ladder הוא ניסוי משחקי באנגלית סביב החלטות אכיפה, סיכון והסלמה. המשתתף מתחיל ללא סנקציות ומנסה להגיע לרמת יעד בתוך מספר תקופות זמן. בכל סיבוב עליו להחליט אם להשקיע בהכנה משפטית שמעלה סיכויי הצלחה, או לבקש מבית משפט לאשר סנקציה חמורה יותר מיד. המשחק מודד אסטרטגיות של זהירות, יעילות, סיכון ותפיסת לגיטימציה.",
      en: "The Sanction Ladder is an English-language game experiment about enforcement, risk, and escalation. The participant begins with no sanctions and tries to reach a target level within a limited number of time periods. Each round asks whether to invest in legal preparation that improves the odds of success, or ask the court to approve a stricter sanction immediately.",
    },
    inquiry: {
      he: "איך אנשים מאזנים בין רצון לפעול מהר לבין הצורך בביסוס משפטי ולגיטימציה מוסדית?",
      en: "How do people balance the desire to act quickly with the need for legal grounding and institutional legitimacy?",
    },
    mechanics: {
      he: ["סולם 0-5", "סיכויי אישור", "הכנה משפטית", "שאלוני סיכום וניסוי"],
      en: ["0-5 ladder", "Approval odds", "Legal preparation", "Experimental summary questionnaires"],
    },
    visual: "/screenshots/sanctionladder.png",
    accent: "#e95a47",
    href: "https://sanction-ladder.vercel.app/",
  },
];

export const rationalePoints: RationalePoint[] = [
  {
    icon: Landmark,
    title: { he: "דמוקרטיה כחוויה", en: "Democracy as Experience" },
    text: {
      he: "במקום להסביר מושגים מבחוץ, המשחקים מכניסים משתתפים אל תוך רגעי הכרעה שבהם מוסדות, זכויות, יעילות וזהות מתנגשים.",
      en: "Instead of explaining concepts from the outside, the games place participants inside decision moments where institutions, rights, efficiency, and identity collide.",
    },
  },
  {
    icon: BrainCircuit,
    title: { he: "רפלקציה ולא הטפה", en: "Reflection, Not Preaching" },
    text: {
      he: "הפרויקט לא מחפש תשובה נכונה אחת. הוא בונה תנאים שבהם שחקנים יכולים לראות את דפוסי ההחלטה שלהם ולדון בהם.",
      en: "The project does not look for one correct answer. It creates conditions where players can see and discuss their own decision patterns.",
    },
  },
  {
    icon: FlaskConical,
    title: { he: "מחקר, למידה ועיצוב", en: "Research, Learning, and Design" },
    text: {
      he: "כל פעילות היא גם כלי מחקרי וגם כלי פדגוגי: היא יוצרת נתונים על בחירות, אך גם מזמינה שיחה על מה שהבחירות חושפות.",
      en: "Each activity is both a research instrument and a learning tool: it creates data about choices while inviting discussion about what those choices reveal.",
    },
  },
];
