import { Contents, Cover, ExecSummary } from "./intro";
import { OppAssets, OppExpand, OppQuickWins } from "./s01-opportunity";
import { GoalCheckpoints, GoalConditions, GoalLeverTable, GoalScenarios, GoalWaterfall } from "./s02-goal";
import {
  WorkCoupang,
  WorkNaverAds,
  WorkOverview,
  WorkReviewReport,
  WorkSeeding,
  WorkShortform,
  WorkSmartstore,
} from "./s03-work";
import { OpsDates, OpsFirstMonth, OpsWeekly } from "./s04-ops";
import { ReportCollect, ReportDashboard, ReportDocs, ReportPrinciples, ReportRoas } from "./s05-report";
import { PricingCompare, PricingPackages, PricingUnits } from "./s06-pricing";
import { StartMaterials, StartPermissions } from "./s07-start";
import { Closing, TermsContract, TermsDonts } from "./s08-terms";
import type { SlideDef } from "./sections";

/** 장 순서. 각 장의 첫 슬라이드 id는 `${section}-1` 규칙을 따른다 (목차에서 이동할 때 사용). */
export const SLIDES: SlideDef[] = [
  { id: "cover", title: "표지", Component: Cover },
  { id: "summary", title: "한 장 요약", Component: ExecSummary },
  { id: "contents", title: "목차", Component: Contents },

  { id: "opportunity-1", section: "opportunity", title: "이미 가진 자산", Component: OppAssets },
  { id: "opportunity-2", section: "opportunity", title: "더 넓힐 곳", Component: OppExpand },
  { id: "opportunity-3", section: "opportunity", title: "지금 바로 쓸 수 있는 장치", Component: OppQuickWins },

  { id: "goal-1", section: "goal", title: "6개월 목표 시나리오", Component: GoalScenarios },
  { id: "goal-2", section: "goal", title: "2배의 계산 틀과 조건", Component: GoalConditions },
  { id: "goal-3", section: "goal", title: "성장 레버 7개", Component: GoalWaterfall },
  { id: "goal-4", section: "goal", title: "레버별 할 일과 근거", Component: GoalLeverTable },
  { id: "goal-5", section: "goal", title: "30·60·90일 점검 기준", Component: GoalCheckpoints },

  { id: "work-1", section: "work", title: "서비스 7개 한눈에", Component: WorkOverview },
  { id: "work-2", section: "work", title: "① AI 숏폼 콘텐츠", Component: WorkShortform },
  { id: "work-3", section: "work", title: "② 인플루언서 시딩", Component: WorkSeeding },
  { id: "work-4", section: "work", title: "③ 네이버 광고 운영", Component: WorkNaverAds },
  { id: "work-5", section: "work", title: "④ 쿠팡 운영·광고", Component: WorkCoupang },
  { id: "work-6", section: "work", title: "⑤ 스마트스토어 최적화", Component: WorkSmartstore },
  { id: "work-7", section: "work", title: "⑥ 리뷰·재구매 · ⑦ 주간 리포트", Component: WorkReviewReport },

  { id: "ops-1", section: "ops", title: "요일별 루틴", Component: OpsWeekly },
  { id: "ops-2", section: "ops", title: "첫 4주 일정", Component: OpsFirstMonth },
  { id: "ops-3", section: "ops", title: "다가오는 날짜", Component: OpsDates },

  { id: "report-1", section: "report", title: "매일·매주·매월 모으는 숫자", Component: ReportCollect },
  { id: "report-2", section: "report", title: "측정 원칙 4가지", Component: ReportPrinciples },
  { id: "report-3", section: "report", title: "수익률 두 줄 보고", Component: ReportRoas },
  { id: "report-4", section: "report", title: "주간·월간 리포트", Component: ReportDocs },
  { id: "report-5", section: "report", title: "공유 대시보드", Component: ReportDashboard },

  { id: "pricing-1", section: "pricing", title: "단품 가격", Component: PricingUnits },
  { id: "pricing-2", section: "pricing", title: "패키지 3단", Component: PricingPackages },
  { id: "pricing-3", section: "pricing", title: "패키지 구성 비교", Component: PricingCompare },

  { id: "start-1", section: "start", title: "권한", Component: StartPermissions },
  { id: "start-2", section: "start", title: "자료 · 협찬 제품", Component: StartMaterials },

  { id: "terms-1", section: "terms", title: "계약 조건", Component: TermsContract },
  { id: "terms-2", section: "terms", title: "하지 않는 일", Component: TermsDonts },
  { id: "closing", title: "마무리", Component: Closing },
];

export const slideIndexById = (id: string) => Math.max(0, SLIDES.findIndex((s) => s.id === id));
