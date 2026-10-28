"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CornerDownRight, Repeat, RotateCcw, ShoppingBag, Users } from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";
import { ConnectRange, LeverWaterfall, ScenarioExplorer } from "@/components/charts/charts";
import { Stepper } from "@/components/ui/interactive";
import { Card, CountUp, DarkCard, EASE, Ev, Hl, NumBadge, PlusList, Reveal, cx } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";
import { LEVERS } from "./data";

/* ------------------------------------------------------------------ */
/* 02-1 6개월 시나리오                                                    */
/* ------------------------------------------------------------------ */

export function GoalScenarios() {
  return (
    <SlideLayout
      section="goal"
      eyebrow="6개월 목표 시나리오"
      title={
        <>
          6개월 뒤 월 매출 목표는 <Hl>기본 1.6배, 도전 2배</Hl>입니다
        </>
      }
      sub="현재 월 매출을 100으로 놓고, 근거가 있는 레버만 더해 본 값입니다"
      foot={
        <>
          시나리오 값은 플랫폼 발표·사례 수치를 바탕으로 GL이 둔 계획용 값입니다 <Ev k="가정" /> · 판정은 늘 네이버+쿠팡 합산 전체 매출로 하며, 실제 매출·원가 자료를
          받으면 금액으로 다시 계산합니다.
        </>
      }
    >
      <ScenarioExplorer />
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 02-2 2배의 계산 틀과 조건 — 직접 바꿔 보기                                */
/* ------------------------------------------------------------------ */

const FACTORS = [
  { name: "방문" },
  { name: "구매전환율" },
  { name: "객단가", note: "한 번 주문 금액" },
  { name: "구매 빈도" },
];

const CONDITIONS: Array<{ icon: typeof Users; text: ReactNode; visual: ReactNode }> = [
  {
    icon: ShoppingBag,
    text: (
      <>
        쿠팡 매출이 지금의 <Hl>4~5배</Hl>로 자란다
      </>
    ),
    visual: (
      <div className="flex items-end gap-[16px]">
        {[
          { label: "지금", h: 20, bg: "bg-pebble", text: "1" },
          { label: "목표", h: 84, bg: "bg-cobalt", text: "4~5배" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-[6px]">
            <span className="font-display text-[19px] font-bold text-ink">{b.text}</span>
            <span className={cx("w-[58px] rounded-t-[8px]", b.bg)} style={{ height: b.h }} />
            <span className="text-[15px] font-semibold text-ink-3">{b.label}</span>
          </div>
        ))}
        <span className="pb-[26px] text-[16px] text-ink-3">쿠팡 매출 기준</span>
      </div>
    ),
  },
  {
    icon: Users,
    text: (
      <>
        인플루언서·숏폼·쇼핑 커넥트로 난 매출이 전체의 <Hl>15% 가까이</Hl> 된다
      </>
    ),
    visual: <ConnectRange />,
  },
  {
    icon: Repeat,
    text: (
      <>
        재구매율이 높게 나와, <Hl>광고를 키워도 이익이 남는다</Hl>
      </>
    ),
    visual: (
      <div className="flex items-center gap-[10px] text-[18px] font-bold text-ink">
        {["재구매율 ↑", "광고 확대", "이익이 남음"].map((t, i) => (
          <Fragment key={t}>
            {i > 0 && <span className="text-ink-4">→</span>}
            <span className={cx("rounded-full px-[14px] py-[7px]", i === 2 ? "bg-cobalt text-white" : "bg-cream-2")}>{t}</span>
          </Fragment>
        ))}
      </div>
    ),
  },
];

export function GoalConditions() {
  const [pcts, setPcts] = useState([20, 20, 20, 20]);
  const [met, setMet] = useState([false, false, false]);
  const product = pcts.reduce((a, p) => a * (1 + p / 100), 1);
  const metCount = met.filter(Boolean).length;
  const ok = metCount >= 2;
  const isDefault = pcts.every((p) => p === 20);

  return (
    <SlideLayout
      section="goal"
      eyebrow="2배의 계산 틀과 조건"
      title={
        <>
          2배는 도전 목표이며, <Hl>조건이 있습니다</Hl>
        </>
      }
      foot={
        <>
          계산 틀의 값은 설명을 위한 것입니다. 시나리오 값은 플랫폼 발표·사례 수치를 바탕으로 GL이 둔 계획용 값입니다 <Ev k="가정" />
        </>
      }
    >
      <div className="flex h-full flex-col gap-[20px]">
        {/* 계산 틀 */}
        <Card className="flex items-center gap-[22px] px-[34px] py-[22px]">
          <div className="w-[170px] shrink-0">
            <div className="text-[17px] font-bold text-cobalt">계산 틀</div>
            <div className="mt-[4px] text-[18px] leading-[1.45] text-ink-2">네 축을 직접 바꿔 보세요</div>
            <button
              type="button"
              onClick={() => setPcts([20, 20, 20, 20])}
              disabled={isDefault}
              className="mt-[10px] inline-flex cursor-pointer items-center gap-[6px] rounded-full bg-beige px-[12px] py-[5px] text-[14px] font-bold text-ink-2 transition-opacity disabled:cursor-default disabled:opacity-40"
            >
              <RotateCcw className="size-[14px]" strokeWidth={2.6} />
              각 20%로
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center gap-[14px]">
            <span className="text-[30px] font-extrabold text-ink">매출 =</span>
            {FACTORS.map((f, i) => (
              <Fragment key={f.name}>
                {i > 0 && <span className="text-[30px] font-bold text-ink-4">×</span>}
                <div className="flex flex-col items-center gap-[10px] rounded-[22px] bg-cream-2 px-[18px] pb-[12px] pt-[14px]">
                  <div className="text-center">
                    <div className="text-[24px] font-bold text-ink">{f.name}</div>
                    <div className="h-[18px] text-[14px] font-semibold text-ink-3">{f.note}</div>
                  </div>
                  <Stepper
                    value={pcts[i]}
                    min={0}
                    max={30}
                    step={5}
                    label={`${f.name} 증가율`}
                    format={(v) => `+${v}%`}
                    onChange={(v) => setPcts((prev) => prev.map((p, j) => (j === i ? v : p)))}
                  />
                </div>
              </Fragment>
            ))}
          </div>
          <div className="card-dark flex w-[250px] shrink-0 flex-col items-center px-[20px] py-[18px]">
            <span className="text-[16px] font-semibold text-white/70">매출은</span>
            <span className="font-display text-[60px] font-extrabold leading-none tracking-[-0.045em] text-azure-2">
              <CountUp value={product} decimals={2} delay={0.4} />
              <span className="text-[30px]">배</span>
            </span>
            <span className="mt-[6px] text-[15px] text-white/70">{isDefault ? "1.2⁴ ≈ 2.07" : "네 축을 곱한 값"}</span>
          </div>
        </Card>

        {/* 조건 셋 중 둘 */}
        <div className="flex items-center gap-[16px]">
          <motion.span
            className={cx(
              "inline-flex items-center gap-[8px] rounded-full px-[18px] py-[7px] text-[19px] font-bold transition-colors",
              ok ? "bg-go text-white" : "bg-char text-white",
            )}
            layout
          >
            {ok && <Check className="size-[18px]" strokeWidth={3} />}
            맞은 조건 {metCount} / 3
          </motion.span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={ok ? "ok" : "no"}
              className="text-[25px] font-bold text-ink"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {ok ? "둘 이상 맞았습니다 — 2배에 도전할 수 있는 조건입니다" : "아래 셋 중 최소 둘이 맞아야 2배에 닿습니다"}
            </motion.span>
          </AnimatePresence>
          <span className="ml-auto text-[16px] font-semibold text-ink-3">카드를 눌러 맞은 조건을 표시해 보세요</span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[22px]">
          {CONDITIONS.map((c, i) => {
            const on = met[i];
            return (
              <Reveal key={i}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setMet((prev) => prev.map((m, j) => (j === i ? !m : m)))}
                  className={cx(
                    "flex h-full w-full cursor-pointer flex-col rounded-[24px] px-[30px] pb-[24px] pt-[24px] text-left transition-colors duration-300",
                    on ? "bg-azure-5 ring-[2.5px] ring-inset ring-azure" : "bg-white ring-[1.5px] ring-inset ring-line hover:ring-azure-3",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <NumBadge no={i + 1} size={44} tone="char" />
                    <span
                      className={cx(
                        "grid size-[40px] place-items-center rounded-full transition-colors",
                        on ? "bg-azure text-white" : "bg-pebble-2 text-ink-4",
                      )}
                    >
                      <Check className="size-[22px]" strokeWidth={3} />
                    </span>
                  </div>
                  <p className="mt-[18px] text-[26px] font-bold leading-[1.45] text-ink">{c.text}</p>
                  {i === 1 && <span className="mt-[6px] text-[17px] text-ink-3">네이버 집계 커넥트 매출 비중(보통 4~15%)의 위쪽</span>}
                  <div className="mt-auto w-full pt-[16px]">{c.visual}</div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 02-3 성장 레버 7개                                                     */
/* ------------------------------------------------------------------ */

export function GoalWaterfall() {
  return (
    <SlideLayout
      section="goal"
      eyebrow="성장 레버 7개"
      title={
        <>
          <Hl>성장 레버 7개</Hl>를 더해 현재 100을 <Hl>156</Hl>으로 만듭니다
        </>
      }
      foot={
        <>
          레버별 값은 계획용 가정 <Ev k="가정" />이며 30일마다 실측으로 바꿉니다. 품절 사이즈 재입고 효과는 규모를 몰라 합계에 넣지 않았습니다.
        </>
      }
    >
      <LeverWaterfall />
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 02-4 레버별 할 일과 근거 — 한 표로                                      */
/* ------------------------------------------------------------------ */

const LEVER_COLS = "grid-cols-[260px_minmax(0,1fr)_minmax(0,1.08fr)_200px]";

export function GoalLeverTable() {
  return (
    <SlideLayout
      section="goal"
      eyebrow="레버별 할 일과 근거"
      compact
      title={
        <>
          레버마다 <Hl>무엇을 하고, 근거는 무엇인지</Hl>
        </>
      }
      foot={
        <>
          레버별 값은 계획용 가정 <Ev k="가정" />이며 30일마다 실측으로 바꿉니다. 품절 사이즈 재입고 효과는 규모를 몰라 합계에 넣지 않았습니다.
        </>
      }
    >
      <Card className="flex h-full flex-col overflow-hidden">
        <div className={cx("grid items-center gap-[28px] bg-cream-2 px-[32px] py-[13px] text-[16px] font-bold text-ink-3", LEVER_COLS)}>
          <span>레버</span>
          <span>무엇을 하나</span>
          <span>근거</span>
          <span className="text-right">6개월 기여 (기본)</span>
        </div>
        <div className="flex flex-1 flex-col">
          {LEVERS.map((l, i) => (
            <Reveal key={l.no} y={10} className={cx("grid flex-1 items-center gap-[28px] border-b border-line px-[32px] py-[8px]", LEVER_COLS)}>
              <span className="flex items-center gap-[10px] text-[21px] font-bold text-ink">
                <NumBadge no={l.no} size={30} />
                {l.name}
              </span>
              <span className="text-[19px] leading-[1.45] text-ink">{l.what}</span>
              <span className="text-[17.5px] leading-[1.45] text-ink-2">{l.why}</span>
              <span className="flex items-center justify-end gap-[12px]">
                <span className="h-[12px] w-[100px] overflow-hidden rounded-full bg-pebble-2">
                  <motion.span
                    className="block h-full rounded-full bg-azure"
                    style={{ width: `${(l.v / 20) * 100}%`, originX: 0 }}
                    variants={{
                      hidden: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 0.6, ease: EASE, delay: 0.5 + i * 0.07 } },
                    }}
                  />
                </span>
                <span className="w-[56px] text-right font-display text-[26px] font-bold text-ink">+{l.v}</span>
              </span>
            </Reveal>
          ))}
        </div>
        <div className={cx("grid items-center gap-[28px] bg-char px-[32px] py-[15px] text-white", LEVER_COLS)}>
          <span className="col-span-3 text-[19px] font-bold">합계 — 현재 100 대비 (기본 시나리오)</span>
          <span className="text-right font-display text-[28px] font-bold">
            +56 <span className="text-azure-2">→</span> 156
          </span>
        </div>
      </Card>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 02-5 30·60·90일 점검                                                   */
/* ------------------------------------------------------------------ */

const CHECKPOINTS = [
  {
    day: 30,
    hero: "쿠팡 리뷰 50개",
    keep: ["측정 기준선 완성", "원가·재구매율 확보", "2팩 이상 주문 비중 상승", "쿠팡 리뷰 50개"],
    otherwise: "광고 증액을 미루고 원인부터 확인",
  },
  {
    day: 60,
    hero: "합산 매출 +15%",
    keep: ["구매가 잘 나는 검색어 묶음의 광고 수익률(ROAS, 광고비 대비 매출)이 손익분기 이상", "쿠팡 리뷰 100개", "두 채널 합산 매출 +15%"],
    otherwise: "약한 레버 예산을 강한 레버로 옮김",
  },
  {
    day: 90,
    hero: "합산 매출 +25~30%",
    keep: ["두 채널 합산 매출 +25~30%"],
    otherwise: "6개월 목표를 다시 잡고 근거와 함께 보고",
  },
];

export function GoalCheckpoints() {
  return (
    <SlideLayout
      section="goal"
      eyebrow="30·60·90일 점검 기준"
      title={
        <>
          <Hl>30·60·90일</Hl>마다 숫자로 점검하고 방향을 정합니다
        </>
      }
      sub="기준 숫자가 나오면 계속하고, 나오지 않으면 미리 정해 둔 대로 바꿉니다"
      foot={
        <>
          점검 기준의 % 값은 기본 시나리오 경로에서 나온 계획값입니다 <Ev k="가정" />
        </>
      }
    >
      <div className="grid h-full grid-cols-3 gap-[24px]">
        {CHECKPOINTS.map((c, i) => (
          <div key={c.day} className="flex flex-col gap-[14px]">
            <Reveal className="flex items-center gap-[18px]">
              <div className="grid size-[136px] shrink-0 place-items-center rounded-full bg-pebble">
                <div className="text-center leading-none">
                  <span className="font-display text-[58px] font-extrabold tracking-[-0.04em] text-ink">{c.day}</span>
                  <span className="text-[22px] font-bold text-ink-2">일</span>
                </div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-ink-3">핵심 숫자</div>
                <div className="font-display text-[38px] font-extrabold leading-[1.15] tracking-[-0.03em] text-cobalt">{c.hero}</div>
              </div>
              {i < CHECKPOINTS.length - 1 && <div className="ml-auto h-[2px] w-[40px] bg-ink-4" />}
            </Reveal>
            <DarkCard title="이 숫자가 나오면 계속" className="flex-1" bodyClassName="pt-[20px]">
              <PlusList dark items={c.keep} className="space-y-[18px]" itemClassName="text-[22px]" />
            </DarkCard>
            <Reveal className="rounded-[22px] bg-beige px-[26px] py-[18px]">
              <div className="flex items-center gap-[8px] text-[16px] font-bold text-ink-2">
                <CornerDownRight className="size-[18px] text-stop" strokeWidth={2.6} />안 나오면
              </div>
              <p className="mt-[4px] text-[23px] font-bold leading-[1.4] text-ink">{c.otherwise}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
