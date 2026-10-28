"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, Bell, Handshake, Link2, MessageCircle, Package, Search, Sparkles, Star, Store } from "lucide-react";
import { useState, type ReactNode } from "react";
import { CompareBars } from "@/components/charts/charts";
import { Toggle } from "@/components/ui/interactive";
import { Card, Chip, CountUp, EASE, Ev, Folder, Hl, IconCircle, Opp, StatCircle, cx } from "@/components/ui/primitives";
import { SlideLayout } from "@/components/ui/SlideLayout";

/* ------------------------------------------------------------------ */
/* 01-1 이미 가진 자산 — 두 숫자가 주인공                                   */
/* ------------------------------------------------------------------ */

export function OppAssets() {
  const panty = 5523;
  const towel = 9328;
  const total = panty + towel;
  return (
    <SlideLayout
      section="opportunity"
      eyebrow="이미 가진 자산"
      title={
        <>
          뷰클린은 이미 <Hl>상품력과 고객 신뢰</Hl>를 갖고 있습니다
        </>
      }
      sub="처음부터 만들기 어려운 두 가지 자산"
      foot={
        <>
          출처: 네이버 쇼핑 검색·스토어 화면, 쿠팡 상품 화면 관찰(2026-10-28) <Ev k="확인" />
        </>
      }
    >
      <div className="grid h-full grid-cols-2 gap-[28px]">
        <Card className="flex flex-col justify-between px-[40px] pb-[30px] pt-[32px]">
          <div className="flex items-center gap-[36px]">
            <StatCircle size={270} value={<CountUp value={14851} />} label="확인된 리뷰 (건)" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[12px]">
                <IconCircle icon={Star} size={46} tone="soft" />
                <span className="text-[28px] font-bold text-ink">리뷰</span>
              </div>
              <Chip tone="azure" className="mt-[14px] text-[19px]">
                <Star className="size-[17px] fill-cobalt" />
                평점 4.64~4.96
              </Chip>
              <p className="mt-[16px] text-[20px] leading-[1.55] text-ink-2">
                여성 일회용 팬티 <b className="text-ink">한 상품만 4,418건</b>, 평점 <b className="text-ink">4.89</b>
              </p>
            </div>
          </div>
          <div>
            <div className="text-[17px] font-bold text-ink-3">리뷰 구성</div>
            <div className="mt-[8px] flex h-[56px] gap-[3px] overflow-hidden rounded-[14px]">
              {[
                { label: "팬티", value: panty, bg: "bg-azure-3", fg: "text-char" },
                { label: "타올", value: towel, bg: "bg-azure", fg: "text-char" },
              ].map((seg, i) => (
                <motion.div
                  key={seg.label}
                  className={cx("flex items-center gap-[10px] px-[18px]", seg.bg, seg.fg)}
                  style={{ width: `${(seg.value / total) * 100}%`, originX: 0 }}
                  variants={{
                    hidden: { scaleX: 0 },
                    show: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.55 + i * 0.15 } },
                  }}
                >
                  <span className="text-[18px] font-semibold">{seg.label}</span>
                  <span className="font-display text-[24px] font-bold">{seg.value.toLocaleString("ko-KR")}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <Opp>새 채널·새 상품에 그대로 옮겨 쓸 수 있는 신뢰 자산</Opp>
        </Card>

        <Card className="flex flex-col justify-between px-[40px] pb-[30px] pt-[32px]">
          <div className="flex items-center gap-[36px]">
            <StatCircle size={270} tone="sky" value={<CountUp value={17114} />} label="스토어 관심고객 (명)" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[12px]">
                <IconCircle icon={Bell} size={46} tone="soft" />
                <span className="text-[28px] font-bold text-ink">관심고객(알림받기)</span>
              </div>
              <Chip tone="azure" className="mt-[14px] text-[19px]">
                <Store className="size-[17px]" strokeWidth={2.4} />
                9년 차 프리미엄 등급 스토어
              </Chip>
              <p className="mt-[16px] text-[20px] leading-[1.55] text-ink-2">
                알림받기 고객 수만큼 <b className="text-ink">매달 마케팅 메시지를 무료로</b> 보낼 수 있습니다.
              </p>
            </div>
          </div>
          <div>
            <div className="text-[17px] font-bold text-ink-3">관심고객에게 할 수 있는 일</div>
            <div className="mt-[8px] flex items-center gap-[10px] rounded-[18px] bg-cream-2 px-[22px] py-[14px]">
              {[
                { icon: Bell, top: "관심고객", bottom: "17,114명" },
                { icon: MessageCircle, top: "마케팅 메시지", bottom: "매달 발송" },
                { icon: Sparkles, top: "발송 비용", bottom: "무료" },
              ].map((x, i) => (
                <div key={x.top} className="flex flex-1 items-center gap-[12px]">
                  {i > 0 && <ArrowRight className="size-[22px] shrink-0 text-ink-4" strokeWidth={2.6} />}
                  <IconCircle icon={x.icon} size={44} tone="white" />
                  <div>
                    <div className="text-[15px] font-semibold text-ink-3">{x.top}</div>
                    <div className="text-[22px] font-bold text-ink">{x.bottom}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Opp>메시지·쿠폰으로 만드는 재구매 매출</Opp>
        </Card>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 01-2 더 넓힐 곳 — 세 방향을 각각 폴더로                                  */
/* ------------------------------------------------------------------ */

function ExpandFolder({
  tab,
  icon,
  title,
  stat,
  unit,
  statLabel,
  visual,
  text,
  opp,
}: {
  tab: string;
  icon: typeof Star;
  title: string;
  stat: string;
  unit?: string;
  statLabel: string;
  visual: ReactNode;
  text: ReactNode;
  opp: ReactNode;
}) {
  return (
    <Folder tabs={[{ label: tab }]} tabWidth={250} tone="azure" className="h-full" bodyClassName="flex flex-col p-[14px]">
      <div className="flex flex-1 flex-col rounded-[20px] bg-white px-[28px] pb-[22px] pt-[24px]">
        <div className="flex items-center gap-[12px]">
          <IconCircle icon={icon} size={48} tone="soft" />
          <span className="text-[27px] font-bold text-ink">{title}</span>
        </div>
        <div className="mt-[18px] flex items-baseline gap-[6px]">
          <span className="font-display text-[66px] font-extrabold leading-none tracking-[-0.045em] text-ink">{stat}</span>
          {unit && <span className="text-[26px] font-bold text-ink-2">{unit}</span>}
        </div>
        <div className="mt-[8px] text-[18.5px] font-semibold text-ink-3">{statLabel}</div>
        <div className="mt-[24px]">{visual}</div>
        <p className="mt-[20px] text-[20.5px] leading-[1.6] text-ink-2">{text}</p>
        <Opp className="mt-auto">{opp}</Opp>
      </div>
    </Folder>
  );
}

export function OppExpand() {
  return (
    <SlideLayout
      section="opportunity"
      eyebrow="더 넓힐 곳"
      title={
        <>
          남은 일은 그 신뢰를 <Hl>더 많은 채널, 더 많은 검색어</Hl>로 넓히는 것입니다
        </>
      }
      foot={
        <>
          경쟁 리뷰 수는 출산·산모 검색어 1면 기준 <Ev k="확인" /> · 구성 비교는 GL 조사 범위 안의 판매자 기준 <Ev k="확인" />
        </>
      }
    >
      <div className="grid h-full grid-cols-3 gap-[24px]">
        <ExpandFolder
          tab="새 채널"
          icon={Package}
          title="쿠팡"
          stat="9~26"
          unit="개"
          statLabel="쿠팡 상품 리뷰"
          visual={
            <CompareBars
              max={4418}
              rows={[
                { label: "네이버 대표 상품", value: 4418, display: "4,418건", tone: "light" },
                { label: "쿠팡 상품", value: 26, display: "9~26개", tone: "focus" },
              ]}
            />
          }
          text="네이버 대표 상품과 비교하면 이제 막 시작하는 단계입니다."
          opp="가장 크게 자랄 수 있는 채널. 리뷰 100개 쌓기부터 시작합니다"
        />
        <ExpandFolder
          tab="새 검색어"
          icon={Search}
          title="출산·산모 검색어"
          stat="25~272"
          unit="개"
          statLabel="검색 1면 경쟁 상품의 리뷰 수"
          visual={
            <CompareBars
              max={4418}
              rows={[
                { label: "뷰클린 여성 일회용 팬티", value: 4418, display: "4,418건", tone: "focus" },
                { label: "1면 경쟁 상품", value: 272, display: "25~272개", tone: "context" },
              ]}
            />
          }
          text={<>&lsquo;산모 일회용 팬티&rsquo; 같은 검색어 1면에 있는 상품들의 리뷰 수입니다.</>}
          opp="리뷰 수에서 이미 앞선 상태로 이 검색어 경쟁을 시작"
        />
        <ExpandFolder
          tab="새 고객"
          icon={Store}
          title="원장님(B2B)"
          stat="10규격+2라인"
          statLabel="타올 10규격 · 팬티 남녀 · 파마보"
          visual={
            <div className="rounded-[18px] bg-cream-2 px-[18px] py-[16px]">
              <div className="text-[16px] font-semibold text-ink-3">피부관리실·네일샵 원장님들은 이렇게 검색합니다</div>
              <div className="mt-[12px] flex gap-[10px]">
                {["네일재료", "왁싱재료"].map((q) => (
                  <span key={q} className="flex flex-1 items-center gap-[8px] rounded-full bg-white px-[16px] py-[10px] text-[21px] font-bold text-ink ring-[1.5px] ring-ink">
                    <Search className="size-[19px] text-cobalt" strokeWidth={2.6} />
                    {q}
                  </span>
                ))}
              </div>
            </div>
          }
          text="이 구성을 모두 가진 판매자는 이번 조사 범위에서 뷰클린뿐이었습니다."
          opp="원장님용 '샵 위생 세트' · 대용량 정기구독"
        />
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 01-3 지금 바로 쓸 수 있는 장치 4가지 — 위젯처럼                             */
/* ------------------------------------------------------------------ */

function Widget({
  icon,
  title,
  visual,
  children,
  evidence,
}: {
  icon: typeof Star;
  title: string;
  visual: ReactNode;
  children: ReactNode;
  evidence?: boolean;
}) {
  return (
    <Card interactive className="flex flex-col px-[28px] pb-[24px] pt-[28px]">
      <div className="flex items-center gap-[14px]">
        <IconCircle icon={icon} size={54} />
        <h3 className="text-[25px] font-bold leading-[1.3] text-ink">{title}</h3>
      </div>
      <div className="mt-[20px] flex h-[220px] flex-col justify-center rounded-[22px] bg-cream-2 px-[22px]">{visual}</div>
      <p className="mt-[20px] text-[20px] leading-[1.6] text-ink-2">{children}</p>
      {evidence && (
        <div className="mt-auto pt-[10px] text-[15px] text-ink-3">
          근거 <Ev k="확인" />
        </div>
      )}
    </Card>
  );
}

function MarketingLinkWidget() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-[14px] text-[18px] font-bold">
        <span className={on ? "text-ink-3" : "text-ink"}>일반 링크</span>
        <Toggle checked={on} onChange={setOn} label="마케팅 링크로 바꾸기" size="lg" />
        <span className={on ? "text-cobalt" : "text-ink-3"}>마케팅 링크</span>
      </div>
      <div className="mt-[14px] flex items-baseline gap-[10px]">
        <span className="text-[18px] font-semibold text-ink-3">외부 유입 주문 수수료</span>
        <motion.span
          key={on ? "on" : "off"}
          className={cx("font-display text-[78px] font-extrabold leading-none tracking-[-0.05em]", on ? "text-cobalt" : "text-ink")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {on ? "1%" : "3%"}
        </motion.span>
      </div>
      <div className="mt-[4px] text-[15px] text-ink-3">스위치를 눌러 비교해 보세요</div>
    </div>
  );
}

export function OppQuickWins() {
  return (
    <SlideLayout
      section="opportunity"
      eyebrow="지금 바로 쓸 수 있는 장치"
      title={
        <>
          지금 바로 쓸 수 있는 <Hl>장치 4가지</Hl>
        </>
      }
      sub="묶음 구성 · 마케팅 링크 · 쇼핑 커넥트 · 광고 직접 운영"
    >
      <div className="grid h-full grid-cols-4 gap-[22px]">
        <Widget
          icon={Package}
          title="묶음·무료배송 구성"
          visual={
            <div>
              <div className="text-[16px] font-bold text-ink-3">팬티 1팩 주문 1건</div>
              <div className="mt-[10px] flex h-[38px] gap-[3px] overflow-hidden rounded-[10px]">
                <div className="bg-azure" style={{ width: "69.7%" }} />
                <div className="bg-char" style={{ width: "30.3%" }} />
              </div>
              <div className="mt-[8px] flex justify-between text-[17px] font-bold">
                <span className="text-ink">상품 6,900원</span>
                <span className="text-ink-2">배송비 3,000원</span>
              </div>
              <div className="mt-[16px] flex flex-wrap gap-[6px]">
                {["2팩 무료배송", "남녀 세트", "타올+팬티"].map((t) => (
                  <Chip key={t} tone="outline" className="text-[15px]">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          }
        >
          팬티 1팩(6,900원)에 배송비 3,000원이 붙습니다. 묶음 구성을 만들면 <b className="text-ink">한 번 주문의 크기</b>가 커집니다.
        </Widget>

        <Widget icon={Link2} title="외부 유입 수수료" evidence visual={<MarketingLinkWidget />}>
          인스타·유튜브 같은 외부 채널의 스토어 링크를 <b className="text-ink">&lsquo;마케팅 링크&rsquo;</b>로 바꾸면 그 경로로 들어온 주문의 수수료가 내려갑니다.
        </Widget>

        <Widget
          icon={Handshake}
          title="쇼핑 커넥트"
          evidence
          visual={
            <div className="text-center">
              <div className="text-[30px] font-extrabold leading-[1.25] tracking-[-0.02em] text-ink">
                판매한 만큼만
                <br />
                <span className="text-cobalt">사용료</span>
              </div>
              <div className="mt-[14px] flex flex-col items-center gap-[8px]">
                <Chip tone="outline" className="text-[16px]">
                  사용료 7~50% · 판매자가 설정
                </Chip>
                <Chip tone="outline" className="text-[16px]">
                  커넥트 거래액 보통 전체의 4~15%
                </Chip>
              </div>
            </div>
          }
        >
          창작자가 링크로 판매한 만큼만 사용료를 냅니다. 네이버 집계로 커넥트 거래액은 보통 전체의 4~15%입니다.
        </Widget>

        <Widget
          icon={BadgePercent}
          title="광고 직접 운영 혜택"
          evidence
          visual={
            <div className="flex flex-col items-center">
              <span className="font-display text-[88px] font-extrabold leading-none tracking-[-0.05em] text-cobalt">5%</span>
              <span className="mt-[12px] text-center text-[17px] font-bold leading-[1.45] text-ink-2">
                매달 유상 소진액의 5%가
                <br />
                다음 달 비즈쿠폰으로 적립
              </span>
            </div>
          }
        >
          검색광고를 뷰클린 계정에서 직접 운영하면 적립됩니다. <b className="text-ink">GL은 이 혜택을 그대로 두는 방식</b>으로 운영합니다.
        </Widget>
      </div>
    </SlideLayout>
  );
}
