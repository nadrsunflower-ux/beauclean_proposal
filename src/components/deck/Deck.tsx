"use client";

import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { EASE, cx } from "@/components/ui/primitives";
import { SLIDES, slideIndexById } from "@/slides";
import { SECTIONS, headerLabel, type SectionId } from "@/slides/sections";
import { Backdrop, CONTENT_BOX, Footer, Header, STAGE_H, STAGE_W } from "./Chrome";
import { DeckContext, type DeckApi } from "./context";
import { SlideCanvas } from "./SlideCanvas";

const TOTAL = SLIDES.length;

/** 장마다 첫·끝 쪽 번호 */
const SECTION_PAGES = SLIDES.reduce<DeckApi["pages"]>((acc, s, i) => {
  if (!s.section) return acc;
  const cur = acc[s.section];
  acc[s.section] = cur ? [cur[0], i + 1] : [i + 1, i + 1];
  return acc;
}, {});
const clamp = (n: number) => Math.min(Math.max(n, 0), TOTAL - 1);

/* 화면 크기에 맞춘 배율 — 1920×1080 캔버스를 통째로 줄이거나 키운다 */
const subscribeResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const getScale = () => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
const getServerScale = () => 1;

/* 서버 렌더에서는 빈 화면, 브라우저에서만 슬라이드를 그린다 (배율·주소의 장 번호를 알아야 하므로) */
const noopSubscribe = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

function readHashIndex() {
  if (typeof window === "undefined") return 0;
  const n = parseInt(window.location.hash.replace("#", ""), 10);
  return Number.isFinite(n) ? clamp(n - 1) : 0;
}

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 64 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -64, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }),
};

const OVERVIEW_SCALE = 1 / 6;

export default function Deck() {
  const isClient = useSyncExternalStore(noopSubscribe, getIsClient, getIsServer);
  const scale = useSyncExternalStore(subscribeResize, getScale, getServerScale);
  const [{ index, dir }, setNav] = useState(() => ({ index: readHashIndex(), dir: 0 }));
  const [overview, setOverview] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const focusByPointer = useRef(false);

  /* 마지막 포커스가 마우스·터치에서 왔는지 기억한다 */
  useEffect(() => {
    const onPointer = () => {
      focusByPointer.current = true;
    };
    document.addEventListener("pointerdown", onPointer, true);
    return () => document.removeEventListener("pointerdown", onPointer, true);
  }, []);

  const go = useCallback((target: number) => {
    setNav((prev) => {
      const next = clamp(target);
      return next === prev.index ? prev : { index: next, dir: next > prev.index ? 1 : -1 };
    });
  }, []);

  const step = useCallback((delta: number) => {
    setNav((prev) => {
      const next = clamp(prev.index + delta);
      return next === prev.index ? prev : { index: next, dir: Math.sign(delta) };
    });
  }, []);

  const goSection = useCallback(
    (id: SectionId) => go(SLIDES.findIndex((s) => s.section === id)),
    [go],
  );

  const toggleFullscreen = useCallback(() => {
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => void;
    };
    const root = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => void };
    if (document.fullscreenElement || doc.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else doc.webkitExitFullscreen?.();
    } else if (root.requestFullscreen) {
      root.requestFullscreen().catch(() => {});
    } else {
      root.webkitRequestFullscreen?.();
    }
  }, []);

  /* 주소창의 #번호와 현재 장을 맞춘다 (새로고침해도 같은 장) */
  useEffect(() => {
    const hash = `#${index + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  }, [index]);

  useEffect(() => {
    const onHash = () => {
      const target = readHashIndex();
      go(target);
      /* 범위를 벗어난 번호(#99 등)는 실제로 보이는 장 번호로 고쳐 둔다 */
      if (window.location.hash !== `#${target + 1}`) window.history.replaceState(null, "", `#${target + 1}`);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [go]);

  /* 키보드 — 문서 전체에 건다 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? "")) return;
      if (e.key === "Tab") focusByPointer.current = false;
      /* Tab으로 고른 버튼일 때만 Space·Enter를 버튼에 넘긴다. 마우스로 누른 뒤 남은 포커스에서는 장을 넘긴다. */
      const isButton = !!target && (target.tagName === "BUTTON" || target.tagName === "A" || target.getAttribute("role") === "button");
      const onButton = isButton && !focusByPointer.current;

      if (overview) {
        if (e.key === "Escape" || e.key === "g" || e.key === "G") {
          e.preventDefault();
          setOverview(false);
        }
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          step(-1);
          break;
        case " ":
        case "Enter":
          if (onButton) return;
          e.preventDefault();
          step(e.shiftKey ? -1 : 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(TOTAL - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "g":
        case "G":
          e.preventDefault();
          setOverview(true);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, step, overview, toggleFullscreen]);

  const api = useMemo<DeckApi>(
    () => ({ go, goTo: (id: string) => go(slideIndexById(id)), pages: SECTION_PAGES, total: TOTAL, isStatic: false }),
    [go],
  );
  const staticApi = useMemo<DeckApi>(() => ({ ...api, isStatic: true }), [api]);

  const slide = SLIDES[index];
  const SlideComponent = slide.Component;

  return (
    <DeckContext.Provider value={api}>
      <MotionConfig reducedMotion="user">
        <main
          className="fixed inset-0 overflow-hidden bg-[#e9e8dc]"
          onPointerDown={(e) => {
            if (e.pointerType !== "touch") return;
            if ((e.target as HTMLElement).closest("[data-no-swipe]")) return;
            touchStart.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || e.pointerType !== "touch") return;
            const dx = e.clientX - start.x;
            const dy = e.clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
          }}
        >
          {isClient && (
            <div
              className="stage absolute left-1/2 top-1/2 overflow-hidden"
              style={{
                width: STAGE_W,
                height: STAGE_H,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
            >
              <Backdrop />
              <Header label={headerLabel(slide)} index={index} total={TOTAL} />

              <div className="absolute overflow-hidden" style={CONTENT_BOX}>
                <AnimatePresence custom={dir}>
                  <motion.section
                    key={slide.id}
                    aria-label={`${index + 1}장. ${slide.title}`}
                    className="absolute inset-0"
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <SlideComponent />
                  </motion.section>
                </AnimatePresence>
              </div>

              <Footer
                section={slide.section}
                onSection={goSection}
                index={index}
                total={TOTAL}
                onPrev={() => step(-1)}
                onNext={() => step(1)}
                onOverview={() => setOverview(true)}
                onFullscreen={toggleFullscreen}
              />
            </div>
          )}

          <AnimatePresence>
            {overview && (
              <motion.div
                key="overview"
                className="fixed inset-0 z-50 overflow-y-auto bg-[#26272a]/88 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mx-auto max-w-[1720px] px-[32px] pb-[48px] pt-[28px]">
                  <div className="mb-[22px] flex items-center justify-between text-white">
                    <div className="flex items-baseline gap-[12px]">
                      <span className="text-[22px] font-bold">전체 보기</span>
                      <span className="text-[15px] text-white/60">{TOTAL}장 · 클릭하면 그 장으로 이동합니다</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOverview(false)}
                      className="flex cursor-pointer items-center gap-[6px] rounded-full bg-white/10 px-[14px] py-[8px] text-[14px] font-semibold hover:bg-white/20"
                    >
                      <X className="size-[16px]" /> 닫기 (Esc)
                    </button>
                  </div>
                  <DeckContext.Provider value={staticApi}>
                    <div
                      className="grid justify-center gap-x-[22px] gap-y-[26px]"
                      style={{ gridTemplateColumns: `repeat(auto-fill, ${STAGE_W * OVERVIEW_SCALE}px)` }}
                    >
                      {SLIDES.map((s, i) => {
                        const sectionNo = s.section ? SECTIONS.find((x) => x.id === s.section)?.no : null;
                        const pick = () => {
                          go(i);
                          setOverview(false);
                        };
                        return (
                          <div
                            key={s.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`${i + 1}장으로 이동: ${s.title}`}
                            onClick={pick}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                pick();
                              }
                            }}
                            className="group cursor-pointer text-left outline-none"
                          >
                            <div
                              className={cx(
                                "relative overflow-hidden rounded-[10px] ring-2 transition-all",
                                i === index ? "ring-azure" : "ring-transparent group-hover:ring-white/60",
                              )}
                              style={{ width: STAGE_W * OVERVIEW_SCALE, height: STAGE_H * OVERVIEW_SCALE }}
                            >
                              <div
                                className="pointer-events-none origin-top-left"
                                style={{ transform: `scale(${OVERVIEW_SCALE})` }}
                                inert
                              >
                                <SlideCanvas index={i} />
                              </div>
                            </div>
                            <div className="mt-[8px] flex gap-[8px] text-[13px] leading-[1.4] text-white/80">
                              <span className="num font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                              <span className="truncate">
                                {sectionNo ? `${sectionNo} · ` : ""}
                                {s.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </DeckContext.Provider>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </MotionConfig>
    </DeckContext.Provider>
  );
}
