"use client";

import { motion } from "framer-motion";
import { CalendarRange, CircleCheckBig, FileBarChart, FileSignature, FolderOpen, KeyRound, Receipt, RefreshCw, Wallet, X } from "lucide-react";
import type { ReactNode } from "react";
import { useDeck } from "@/components/deck/context";
import { Card, DarkCard, Ev, GLMark, Hl, IconCircle, PlusList, Reveal, SlideRoot } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";

/* ------------------------------------------------------------------ */
/* 08-1 계약 조건                                                         */
/* ------------------------------------------------------------------ */

function BigTerm({ icon, label, value, note }: { icon: typeof Wallet; label: string; value: string; note: string }) {
  return (
    <Card interactive className="flex flex-col px-[34px] py-[26px]">
      <div className="flex items-center gap-[12px]">
        <IconCircle icon={icon} size={50} tone="cobalt" />
        <span className="text-[18px] font-bold text-cobalt">{label}</span>
      </div>
      <div className="mt-[16px] font-display text-[46px] font-extrabold leading-[1.1] tracking-[-0.04em] text-ink">{value}</div>
      <div className="mt-[8px] text-[21px] font-semibold text-ink-2">{note}</div>
    </Card>
  );
}

function SmallTerm({ icon, label, children, note }: { icon: typeof Wallet; label: string; children: ReactNode; note?: ReactNode }) {
  return (
    <Card className="flex flex-col justify-center px-[30px] py-[20px]">
      <div className="flex items-center gap-[12px]">
        <IconCircle icon={icon} size={42} tone="soft" />
        <span className="text-[18px] font-bold text-cobalt">{label}</span>
      </div>
      <div className="mt-[12px] text-[21.5px] font-bold leading-[1.4] text-ink">{children}</div>
      {note && <div className="mt-[6px] text-[18.5px] text-ink-2">{note}</div>}
    </Card>
  );
}

export function TermsContract() {
  return (
    <SlideLayout
      section="terms"
      eyebrow="계약 조건"
      title={
        <>
          <Hl>월 단위</Hl> 계약, 최소 기간도 위약금도 없습니다
        </>
      }
      sub="결과를 보고 다음 달을 정하는 구조입니다"
    >
      <div className="flex h-full flex-col gap-[18px]">
        <div className="grid grid-cols-3 gap-[22px]">
          <BigTerm icon={CalendarRange} label="계약 단위" value="월 단위" note="최소 계약 기간 없음" />
          <BigTerm icon={FileSignature} label="해지" value="1개월 전 통보" note="위약금 없음" />
          <BigTerm icon={Receipt} label="부가세" value="모든 금액 별도" note="제안가 기준" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-[18px]">
          <SmallTerm icon={Wallet} label="실비" note="광고비는 뷰클린 계정에서 직접 결제">
            광고비·제품비·배송비·리뷰 이벤트 비용은 대행료와 별도
          </SmallTerm>
          <SmallTerm icon={FolderOpen} label="결과물">
            영상 원본·리포트는 뷰클린 소유
          </SmallTerm>
          <DarkCard title="승인" className="row-span-1" bodyClassName="flex flex-col justify-center">
            <p className="text-[21px] font-bold leading-[1.45]">게시·메시지 발송·가격·쿠폰·행사 신청·광고 예산 변경</p>
            <p className="mt-[6px] flex items-center gap-[8px] text-[18.5px] text-azure-2">
              <CircleCheckBig className="size-[19px]" strokeWidth={2.3} />
              매번 뷰클린 확인 후 실행
            </p>
          </DarkCard>
          <SmallTerm icon={RefreshCw} label="패키지 변경">
            다음 달부터 적용
          </SmallTerm>
          <SmallTerm icon={KeyRound} label="권한">
            계약이 끝나는 날 받은 권한을 모두 돌려드립니다
          </SmallTerm>
          <SmallTerm icon={FileBarChart} label="리포트" note="주간 매주 월요일 (그로스부터)">
            월간 매월 첫 주 (전 패키지)
          </SmallTerm>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 08-2 하지 않는 일 — 빨간 신호                                           */
/* ------------------------------------------------------------------ */

const DONTS: Array<{ dont: string; why: string }> = [
  { dont: "슬롯·리워드 트래픽으로 순위 올리기", why: "적발되면 스토어 전체 순위 페널티, 같은 기간 쇼핑검색광고 노출 불가" },
  { dont: "가구매·지인 리뷰", why: "허위 후기에 업무방해 벌금 500만 원 확정(2022), 민사 손해 1,500만 원 인정(2023) 사례" },
  { dont: "협찬 표시 없는 게시물", why: "2024년 한 해 온라인 광고 시정 26,033건, 그중 뒷광고 의심 22,011건" },
];

export function TermsDonts() {
  return (
    <SlideLayout
      section="terms"
      eyebrow="하지 않는 일"
      title={
        <>
          GL AI 스튜디오가 <Hl>하지 않는 일</Hl>
        </>
      }
      sub="하지 않는 이유는 모두 확인된 사실입니다"
      foot={
        <>
          이 제안서의 숫자는 2026-10-28에 화면으로 관찰한 값과 네이버·쿠팡 공식 발표, 공개된 판매자 사례입니다. 뷰클린 내부 자료로 확인한 값이 아니며, 자료를
          받은 뒤 실제 값으로 다시 계산합니다.
        </>
      }
    >
      <div className="flex h-full flex-col gap-[14px]">
        {DONTS.map((d) => (
          <Card key={d.dont} interactive className="grid flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] items-center gap-[32px] px-[34px]">
            <div className="flex items-center gap-[20px]">
              <span className="grid size-[54px] shrink-0 place-items-center rounded-full bg-stop text-white">
                <X className="size-[28px]" strokeWidth={3} />
              </span>
              <span className="text-[24px] font-bold leading-[1.4] text-ink">{d.dont}</span>
            </div>
            <div className="flex items-center gap-[16px] rounded-[18px] bg-cream-2 px-[24px] py-[16px]">
              <span className="shrink-0 rounded-full bg-char px-[12px] py-[3px] text-[14px] font-bold text-white">이유</span>
              <p className="text-[19.5px] leading-[1.5] text-ink">
                {d.why} <Ev k="확인" />
              </p>
            </div>
          </Card>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 마무리 — 제안서의 실제 요청을 큰 글자로                                   */
/* ------------------------------------------------------------------ */

export function Closing() {
  const { isStatic, goTo } = useDeck();
  return (
    <SlideRoot className="flex gap-[56px] px-[64px] pb-[34px] pt-[40px]">
      <div className="flex min-w-0 flex-1 flex-col">
        <Reveal className="flex items-center gap-[12px] text-[17px] font-semibold text-ink-3">
          <span className="font-display text-[18px] font-bold text-cobalt">09</span>
          <span className="h-[2px] w-[28px] bg-azure" />
          마무리
        </Reveal>
        <Reveal className="mt-[20px]">
          <h2 className="font-display text-[112px] font-extrabold leading-[1.02] tracking-[-0.055em] text-cobalt">
            시작은
            <br />
            원가표 한 장과
            <br />
            권한 초대 30분
          </h2>
        </Reveal>
        <Reveal className="mt-[30px] max-w-[980px] text-[25px] leading-[1.6] text-ink-2">
          뷰클린은 <b className="text-ink">리뷰 1만 4천여 건</b>과 <b className="text-ink">관심고객 1만 7천여 명</b>이라는, 처음부터 만들기 어려운 자산을 이미 갖고
          있습니다. GL AI 스튜디오는 이 자산을 쿠팡, 출산·원장님 같은 새 검색어, 더 큰 묶음 구성, 영상과 인플루언서로 넓히는 일을 매주 정해진 수량으로 해
          나가겠습니다.
        </Reveal>
        <Reveal className="mt-auto flex items-center gap-[16px]">
          <GLMark className="size-[34px] text-cobalt" />
          <span className="text-[19px] font-extrabold tracking-[0.24em] text-ink">GL AI STUDIO</span>
          <span className="h-[18px] w-px bg-rule" />
          <span className="text-[18px] font-semibold text-ink-2">GL AI 스튜디오 · 커머스 성장팀</span>
        </Reveal>
      </div>

      <div className="relative flex w-[600px] shrink-0 flex-col justify-center gap-[22px]">
        <DarkCard title="GL AI 스튜디오의 약속" bodyClassName="pb-[26px]">
          <PlusList
            dark
            itemClassName="text-[22px]"
            items={[
              "매달, 그로스부터는 매주 월요일에도 숫자로 보고합니다.",
              "광고비만이 아니라 대행료까지 넣은 수익률을 함께 적습니다.",
              "월 단위로 계약하고, 결과로 다음 달을 정합니다.",
            ]}
          />
        </DarkCard>
        <Reveal className="rounded-[24px] bg-azure px-[30px] py-[24px] text-char">
          <div className="text-[18px] font-bold">6개월 목표</div>
          <div className="mt-[4px] font-display text-[52px] font-extrabold leading-none tracking-[-0.045em]">
            기본 1.6배 <span className="text-[32px] text-char/60">·</span> 도전 2배
          </div>
        </Reveal>
        <Reveal>
          <motion.button
            type="button"
            onClick={() => goTo("start-1")}
            className="flex w-full cursor-pointer items-center justify-between rounded-[24px] bg-white px-[30px] py-[22px] text-left ring-[1.5px] ring-line"
            whileHover={isStatic ? undefined : { y: -4 }}
          >
            <span>
              <span className="block text-[16px] font-bold text-ink-3">다시 보기</span>
              <span className="text-[22px] font-bold text-ink">시작하려면 필요한 것 (권한 · 자료)</span>
            </span>
            <span className="font-display text-[30px] font-bold text-cobalt">→</span>
          </motion.button>
        </Reveal>
      </div>
    </SlideRoot>
  );
}
