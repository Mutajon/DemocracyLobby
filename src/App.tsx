import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Globe2,
  Mail,
  Menu,
  PencilLine,
  RotateCcw,
  X,
} from "lucide-react";
import { LanguageProvider } from "@/context/LanguageContext";
import { useLangs } from "@/hooks/useLangs";
import { games, rationalePoints, teamKeys, uiText, type GameId, type LocalizedText } from "@/data/portfolio";

type SectionId = "top" | "rationale" | "games" | "team";
type NavSectionId = Exclude<SectionId, "top">;
type TextOverrides = Record<string, string>;
type DevMode = "text" | "delete" | null;
interface DevEdits {
  textOverrides: TextOverrides;
  deletedIds: string[];
}

const sectionIds: NavSectionId[] = ["rationale", "games", "team"];
const devEditsPath = "/dev-edits.json";
const devEditsSavePath = "/__dev-edits";

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function normalizeDeletedIds(ids: string[]) {
  return Array.from(new Set(ids.map((id) => id.replace(/^(he|en)\./, "text."))));
}

function readLocalDevEdits(): DevEdits {
  try {
    return {
      textOverrides: JSON.parse(localStorage.getItem("portfolioTextOverrides") ?? "{}") as TextOverrides,
      deletedIds: normalizeDeletedIds(JSON.parse(localStorage.getItem("portfolioDeletedElements") ?? "[]") as string[]),
    };
  } catch {
    return { textOverrides: {}, deletedIds: [] };
  }
}

function cacheDevEdits(edits: DevEdits) {
  localStorage.setItem("portfolioTextOverrides", JSON.stringify(edits.textOverrides));
  localStorage.setItem("portfolioDeletedElements", JSON.stringify(edits.deletedIds));
}

function saveDevEdits(edits: DevEdits) {
  cacheDevEdits(edits);

  if (!["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)) return;

  fetch(devEditsSavePath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  }).catch((error) => {
    console.warn("Could not write dev edits to source file.", error);
  });
}

function useDevStorage() {
  const [edits, setEdits] = useState<DevEdits>(() => readLocalDevEdits());

  useEffect(() => {
    let cancelled = false;

    fetch(devEditsPath, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: Partial<DevEdits> | null) => {
        if (cancelled || !payload) return;

        setEdits(() => {
          const next = {
            textOverrides: payload.textOverrides ?? {},
            deletedIds: normalizeDeletedIds(payload.deletedIds ?? []),
          };
          cacheDevEdits(next);
          return next;
        });
      })
      .catch(() => {
        // The file-backed dev edits layer is optional in static previews.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateText = (key: string, value: string) => {
    setEdits((current) => {
      const next = { ...current, textOverrides: { ...current.textOverrides, [key]: value } };
      saveDevEdits(next);
      return next;
    });
  };

  const deleteElement = (key: string) => {
    setEdits((current) => {
      if (current.deletedIds.includes(key)) return current;
      const next = { ...current, deletedIds: normalizeDeletedIds([...current.deletedIds, key]) };
      saveDevEdits(next);
      return next;
    });
  };

  const restoreDeleted = () => {
    setEdits((current) => {
      const next = { ...current, deletedIds: [] };
      saveDevEdits(next);
      return next;
    });
  };

  const restoreText = () => {
    setEdits((current) => {
      const next = { ...current, textOverrides: {} };
      saveDevEdits(next);
      return next;
    });
  };

  return {
    deletedIds: edits.deletedIds,
    deleteElement,
    overrides: edits.textOverrides,
    restoreDeleted,
    restoreText,
    updateText,
  };
}

interface EditableTextProps {
  children: string;
  deletedIds: string[];
  deleteElement: (key: string) => void;
  devMode: DevMode;
  id: string;
  openEditor: (key: string, value: string) => void;
  overrides: TextOverrides;
}

function EditableText({ children, deletedIds, deleteElement, devMode, id, openEditor, overrides }: EditableTextProps) {
  const value = overrides[id] ?? children;
  const deleteId = id.replace(/^(he|en)\./, "text.");

  if (deletedIds.includes(deleteId)) return null;

  if (devMode === "text") {
    return (
      <span
        className="editable-text"
        role="button"
        tabIndex={0}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          openEditor(id, value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            openEditor(id, value);
          }
        }}
      >
        {value}
      </span>
    );
  }

  if (devMode === "delete") {
    return (
      <span
        className="deletable-element"
        role="button"
        tabIndex={0}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          deleteElement(deleteId);
        }}
      >
        {value}
      </span>
    );
  }

  return <>{value}</>;
}

async function translateText(text: string, sourceLanguage: string, targetLanguage: string) {
  const candidate = window as unknown as {
    Translator?: { create: (options: { sourceLanguage: string; targetLanguage: string }) => Promise<{ translate: (value: string) => Promise<string> }> };
    translation?: { createTranslator: (options: { sourceLanguage: string; targetLanguage: string }) => Promise<{ translate: (value: string) => Promise<string> }> };
  };

  try {
    if (candidate.Translator?.create) {
      const translator = await candidate.Translator.create({ sourceLanguage, targetLanguage });
      return translator.translate(text);
    }
    if (candidate.translation?.createTranslator) {
      const translator = await candidate.translation.createTranslator({ sourceLanguage, targetLanguage });
      return translator.translate(text);
    }
  } catch (error) {
    console.warn("Browser translation failed; preserving edited text in both languages.", error);
  }

  return text;
}

interface TextEditorModalProps {
  activeEdit: { key: string; value: string } | null;
  language: "he" | "en";
  onClose: () => void;
  overrides: TextOverrides;
  updateText: (key: string, value: string) => void;
}

function TextEditorModal({ activeEdit, language, onClose, overrides, updateText }: TextEditorModalProps) {
  const [draft, setDraft] = useState("");
  const [otherDraft, setOtherDraft] = useState("");
  const translationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const otherLanguage = language === "he" ? "en" : "he";
  const otherKey = activeEdit ? `${otherLanguage}.${activeEdit.key.split(".").slice(1).join(".")}` : "";

  useEffect(() => {
    if (!activeEdit) return;
    setDraft(overrides[activeEdit.key] ?? activeEdit.value);
    setOtherDraft(overrides[otherKey] ?? "");
    // Only reset the modal fields when a different text node is selected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEdit?.key]);

  useEffect(() => {
    return () => {
      if (translationTimer.current) clearTimeout(translationTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!activeEdit) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeEdit]);

  if (!activeEdit) return null;

  const handleChange = (value: string) => {
    setDraft(value);
    updateText(activeEdit.key, value);

    if (translationTimer.current) clearTimeout(translationTimer.current);
    translationTimer.current = setTimeout(() => {
      translateText(value, language, otherLanguage).then((translated) => {
        setOtherDraft(translated);
        updateText(otherKey, translated);
      });
    }, 350);
  };

  const handleOtherChange = (value: string) => {
    setOtherDraft(value);
    updateText(otherKey, value);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-[8px] border border-white/16 bg-[#f5f2ea] p-5 text-[#17201d] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black">Edit text</h2>
          <button className="grid size-9 place-items-center rounded-full border border-[#17201d]/15" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <label className="mt-5 block text-sm font-black uppercase text-[#17201d]/58">
          {language === "he" ? "עברית" : "English"}
        </label>
        <textarea
          className="mt-2 min-h-36 w-full resize-y rounded-[8px] border border-[#17201d]/14 bg-white p-3 leading-7 outline-none focus:border-[#9f5d39]"
          value={draft}
          onChange={(event) => handleChange(event.target.value)}
          autoFocus
        />
        <label className="mt-4 block text-sm font-black uppercase text-[#17201d]/58">
          {otherLanguage === "he" ? "עברית" : "English"}
        </label>
        <textarea
          className="mt-2 min-h-28 w-full resize-y rounded-[8px] border border-[#17201d]/14 bg-white p-3 leading-7 outline-none focus:border-[#9f5d39]"
          value={otherDraft}
          onChange={(event) => handleOtherChange(event.target.value)}
        />
        <p className="mt-3 text-sm leading-6 text-[#17201d]/62">
          Changes are saved immediately in this browser. If browser translation is unavailable, the edited text is preserved in the other language field for manual refinement.
        </p>
      </div>
    </div>
  );
}

function AppContent() {
  const { t, language, setLanguage, dir } = useLangs();
  const [activeGameId, setActiveGameId] = useState<GameId>("amazen");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLocalHost] = useState(() =>
    typeof window !== "undefined" && ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
  );
  const [devMode, setDevMode] = useState<DevMode>(null);
  const [activeEdit, setActiveEdit] = useState<{ key: string; value: string } | null>(null);
  const { deletedIds, deleteElement, overrides, restoreDeleted, restoreText, updateText } = useDevStorage();

  const activeGame = useMemo(
    () => games.find((game) => game.id === activeGameId) ?? games[0],
    [activeGameId]
  );

  const ActiveIcon = activeGame.icon;
  const textAlign = dir === "rtl" ? "text-right" : "text-left";
  const DetailsChevron = dir === "rtl" ? ChevronLeft : ChevronRight;
  const l = (copy: LocalizedText) => copy[language];
  const e = (id: string, copy: string) => (
    <EditableText
      id={`${language}.${id}`}
      deletedIds={deletedIds}
      deleteElement={deleteElement}
      devMode={devMode}
      openEditor={(key, value) => setActiveEdit({ key, value })}
      overrides={overrides}
    >
      {copy}
    </EditableText>
  );

  const sectionLinks = sectionIds.map((id) => ({
    id,
    label: uiText.nav[id][language],
  }));

  return (
    <main className={`min-h-screen overflow-x-hidden bg-[#f5f2ea] text-[#17201d] ${textAlign}`} dir={dir}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#17201d]/10 bg-[#f5f2ea]/82 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            className={`flex items-center gap-3 ${textAlign}`}
            onClick={() => scrollToSection("top")}
            aria-label={language === "he" ? "חזרה לראש העמוד" : "Back to top"}
          >
            <span>
              <span className="block text-sm font-black leading-tight">
                {e("brand.title", l(uiText.brandTitle))}
              </span>
              <span className="block text-xs text-[#17201d]/58">
                {e("brand.subtitle", l(uiText.brandSubtitle))}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                className="rounded-full px-4 py-2 text-sm font-bold text-[#17201d]/70 transition hover:bg-[#17201d]/7 hover:text-[#17201d]"
                onClick={() => scrollToSection(link.id)}
              >
                {e(`nav.${link.id}`, link.label)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-[#17201d]/15 px-3 py-2 text-sm font-bold transition hover:bg-white"
              onClick={() => setLanguage(language === "he" ? "en" : "he")}
            >
              <Globe2 size={16} />
              {l(uiText.language)}
            </button>
            <button
              className="grid size-10 place-items-center rounded-full border border-[#17201d]/15 md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={language === "he" ? "תפריט" : "Menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#17201d]/10 bg-[#f5f2ea] px-4 py-3 md:hidden">
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                className={`block w-full rounded-lg px-3 py-3 text-sm font-bold ${textAlign}`}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(link.id);
                }}
              >
                {e(`mobileNav.${link.id}`, link.label)}
              </button>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="relative min-h-[92svh] overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src="/background2.webp" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#101714]/66" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f5f2ea] to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(92svh-4rem)] w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="reveal max-w-3xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#f7d96b]" />
              {e("hero.badge", l(uiText.heroBadge))}
            </div>
            <h1 className="text-balance text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              {e("hero.title", l(uiText.heroTitle))}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
              {e("hero.description", l(uiText.heroDescription))}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f7d96b] px-6 py-4 text-base font-black text-[#17201d] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5"
                onClick={() => scrollToSection("games")}
              >
                {e("hero.gamesButton", l(uiText.heroGamesButton))}
                <DetailsChevron size={20} />
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full border border-white/26 bg-white/10 px-6 py-4 text-base font-black text-white backdrop-blur-md transition hover:bg-white/16"
                onClick={() => scrollToSection("rationale")}
              >
                {e("hero.rationaleButton", l(uiText.heroRationaleButton))}
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:translate-y-8">
            {games.map((game, index) => {
              const Icon = game.icon;
              const elementId = `element.heroCard.${game.id}`;
              if (deletedIds.includes(elementId)) return null;
              return (
                <button
                  key={game.id}
                  className={`reveal group relative min-h-52 overflow-hidden rounded-[8px] border border-white/18 p-5 text-start text-white shadow-2xl transition hover:-translate-y-1 ${devMode === "delete" ? "deletable-element" : ""}`}
                  onClick={(event) => {
                    if (devMode === "delete") {
                      event.preventDefault();
                      deleteElement(elementId);
                      return;
                    }
                    setActiveGameId(game.id);
                    scrollToSection("games");
                  }}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <img src={game.visual} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/38 to-black/15" />
                  <div className="relative flex h-full flex-col justify-between">
                    <Icon className="mb-12" size={26} style={{ color: game.accent }} />
                    <span>
                      <span className="block text-xs font-black uppercase tracking-widest text-white/62">
                        {e(`game.${game.id}.eyebrow.hero`, l(game.eyebrow))}
                      </span>
                      <span className="mt-1 block text-2xl font-black">
                        {e(`game.${game.id}.title.hero`, l(game.title))}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="rationale" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal max-w-3xl">
            <p className="text-sm font-black text-[#9f5d39]">
              {e("rationale.kicker", l(uiText.rationaleKicker))}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              {e("rationale.title", l(uiText.rationaleTitle))}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {rationalePoints.map((point, index) => {
              const Icon = point.icon;
              const elementId = `element.rationale.${index}`;
              if (deletedIds.includes(elementId)) return null;
              return (
                <article
                  key={l(point.title)}
                  className={`reveal rounded-[8px] border border-[#17201d]/12 bg-white/70 p-6 shadow-sm ${devMode === "delete" ? "deletable-element" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={(event) => {
                    if (devMode !== "delete") return;
                    event.preventDefault();
                    deleteElement(elementId);
                  }}
                >
                  <Icon className="text-[#9f5d39]" size={28} />
                  <h3 className="mt-7 text-2xl font-black">{e(`rationale.${index}.title`, l(point.title))}</h3>
                  <p className="mt-3 leading-7 text-[#17201d]/72">{e(`rationale.${index}.text`, l(point.text))}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="games" className="scroll-mt-20 bg-[#17201d] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black text-[#f7d96b]">{e("games.kicker", l(uiText.gamesKicker))}</p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">{e("games.title", l(uiText.gamesTitle))}</h2>
            </div>
            <p className="max-w-xl leading-7 text-white/70">{e("games.intro", l(uiText.gamesIntro))}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3">
              {games.map((game, index) => {
                const Icon = game.icon;
                const isActive = game.id === activeGame.id;
                const elementId = `element.gameRow.${game.id}`;
                if (deletedIds.includes(elementId)) return null;
                return (
                  <article
                    key={game.id}
                    className={`reveal rounded-[8px] border p-4 text-start transition ${
                      isActive
                        ? "selected-game-tab border-[#f7d96b]/55 shadow-[0_22px_70px_rgba(74,35,126,0.38)]"
                        : "border-white/10 bg-white/5 hover:bg-white/9"
                    } ${devMode === "delete" ? "deletable-element" : ""}`}
                    style={{ animationDelay: `${index * 70}ms` }}
                    onClick={(event) => {
                      if (devMode !== "delete") return;
                      event.preventDefault();
                      deleteElement(elementId);
                    }}
                  >
                    <button
                      className="flex w-full items-start gap-4 text-start"
                      onClick={(event) => {
                        if (devMode === "delete") {
                          event.preventDefault();
                          return;
                        }
                        setActiveGameId(game.id);
                      }}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-black/20" aria-hidden="true">
                        <Icon size={22} style={{ color: game.accent }} />
                      </span>
                      <span>
                        <span className={`block text-xl font-black transition-colors ${isActive ? "text-[#f7d96b]" : "text-white"}`}>
                          {e(`game.${game.id}.title.hero`, l(game.title))}
                        </span>
                        <span className={`mt-1 block leading-6 transition-colors ${isActive ? "text-[#f7d96b]/82" : "text-white/65"}`}>
                          {e(`game.${game.id}.eyebrow.hero`, l(game.eyebrow))}
                        </span>
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>

            {!deletedIds.includes("element.gameDetails") && <article
              key={activeGame.id}
              className={`reveal drawer-card overflow-hidden rounded-[8px] border border-white/14 bg-white/[0.06] ${devMode === "delete" ? "deletable-element" : ""}`}
              onClick={(event) => {
                if (devMode !== "delete") return;
                event.preventDefault();
                deleteElement("element.gameDetails");
              }}
            >
              <div className="relative min-h-[320px]">
                <img src={activeGame.visual} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17201d] via-[#17201d]/46 to-transparent" />
                <div className="absolute bottom-0 start-0 p-6 sm:p-8">
                  <div className="mb-4 grid size-14 place-items-center rounded-[8px] bg-black/34 backdrop-blur">
                    <ActiveIcon size={28} style={{ color: activeGame.accent }} />
                  </div>
                  <p className="text-sm font-black text-white/64">
                    {e(`game.${activeGame.id}.eyebrow.details`, l(activeGame.eyebrow))}
                  </p>
                  <h3 className="mt-1 text-4xl font-black">{e(`game.${activeGame.id}.title.details`, l(activeGame.title))}</h3>
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <p className="text-lg leading-8 text-white/78">{e(`game.${activeGame.id}.long`, l(activeGame.long))}</p>
                  <div className="mt-7 rounded-[8px] border border-white/12 bg-black/16 p-5">
                    <p className="text-sm font-black text-[#f7d96b]">{e("games.inquiryLabel", l(uiText.inquiryLabel))}</p>
                    <p className="mt-2 text-xl font-bold leading-8">{e(`game.${activeGame.id}.inquiry`, l(activeGame.inquiry))}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-black text-white/56">{e("games.mechanicsLabel", l(uiText.mechanicsLabel))}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeGame.mechanics[language].map((item, index) => (
                      <span
                        key={`${activeGame.id}-${item}`}
                        className="rounded-full border border-white/14 bg-white/8 px-3 py-2 text-sm font-bold"
                      >
                        {e(`game.${activeGame.id}.mechanic.${index}`, item)}
                      </span>
                    ))}
                  </div>
                  <a
                    className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-black transition ${
                      activeGame.href
                        ? "bg-[#f7d96b] text-[#17201d] hover:-translate-y-0.5"
                        : "cursor-not-allowed bg-white/10 text-white/48"
                    }`}
                    href={activeGame.href ?? undefined}
                    target={activeGame.href ? "_blank" : undefined}
                    rel={activeGame.href ? "noopener noreferrer" : undefined}
                    aria-disabled={!activeGame.href}
                    onClick={(event) => {
                      if (!activeGame.href) event.preventDefault();
                    }}
                  >
                    {e(activeGame.href ? "games.playGame" : "games.linkPending", l(activeGame.href ? uiText.playGame : uiText.linkPending))}
                    {activeGame.href && <ArrowUpRight size={18} />}
                  </a>
                </div>
              </div>
            </article>}
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black text-[#9f5d39]">{e("team.kicker", l(uiText.teamKicker))}</p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">{e("team.title", t("panels.about.team_title"))}</h2>
            </div>
            <a
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#17201d]/14 bg-white px-5 py-3 font-black"
              href="mailto:jonathanbd@gmail.com"
            >
              <Mail size={18} />
              jonathanbd@gmail.com
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamKeys.map((key, index) => {
              const elementId = `element.team.${key}`;
              if (deletedIds.includes(elementId)) return null;
              return (
                <article
                  key={key}
                  className={`reveal rounded-[8px] border border-[#17201d]/10 bg-white p-5 shadow-sm ${devMode === "delete" ? "deletable-element" : ""}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                  onClick={(event) => {
                    if (devMode !== "delete") return;
                    event.preventDefault();
                    deleteElement(elementId);
                  }}
                >
                  <img
                    src={`/credits/${key}.jpg`}
                    alt={t(`splash.credits.people.${key}.name`)}
                    className="aspect-square w-full rounded-[8px] object-cover"
                  />
                  <h3 className="mt-4 text-xl font-black">{e(`team.${key}.name`, t(`splash.credits.people.${key}.name`))}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#17201d]/66">
                    {e(`team.${key}.role`, t(`splash.credits.people.${key}.role`))}
                  </p>
                </article>
              );
            })}
          </div>

          {!deletedIds.includes("element.funding") && <div
            className={`reveal mt-10 flex flex-col items-center gap-5 rounded-[8px] border border-[#17201d]/10 bg-[#fff8df] p-6 text-center sm:flex-row sm:text-start ${devMode === "delete" ? "deletable-element" : ""}`}
            onClick={(event) => {
              if (devMode !== "delete") return;
              event.preventDefault();
              deleteElement("element.funding");
            }}
          >
            <img src="/pumby.png" alt="PUMBY" className="h-20 w-auto rounded-[8px]" />
            <p className="text-lg font-bold leading-8 text-[#17201d]/74">
              {e("team.funding", t("panels.about.funding"))}
              <a className="text-[#8d4f31] underline" href="https://pumby.org/" target="_blank" rel="noreferrer">
                {e("team.fundingLink", t("panels.about.funding_link"))}
              </a>
            </p>
          </div>}
        </div>
      </section>

      {isLocalHost && (
        <div
          className={`fixed bottom-4 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-full border border-[#17201d]/12 bg-[#17201d] p-2 text-sm font-black text-white shadow-2xl ${
            dir === "rtl" ? "left-4" : "right-4"
          }`}
        >
          <button
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/10 ${devMode === "text" ? "bg-[#f7d96b] text-[#17201d]" : ""}`}
            onClick={() => setDevMode((value) => (value === "text" ? null : "text"))}
          >
            <PencilLine size={16} />
            {l(devMode === "text" ? uiText.devDone : uiText.devEdit)}
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/10 ${devMode === "delete" ? "bg-[#f7d96b] text-[#17201d]" : ""}`}
            onClick={() => setDevMode((value) => (value === "delete" ? null : "delete"))}
          >
            <EyeOff size={16} />
            {language === "he" ? "מחיקת אלמנטים" : "Delete elements"}
          </button>
          {deletedIds.length > 0 && (
            <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/10" onClick={restoreDeleted}>
              <RotateCcw size={16} />
              {language === "he" ? "שחזור" : "Restore"}
            </button>
          )}
          {Object.keys(overrides).length > 0 && (
            <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-white/10" onClick={restoreText}>
              <RotateCcw size={16} />
              {language === "he" ? "איפוס טקסט" : "Reset text"}
            </button>
          )}
        </div>
      )}
      <TextEditorModal activeEdit={activeEdit} language={language} onClose={() => setActiveEdit(null)} overrides={overrides} updateText={updateText} />
    </main>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
