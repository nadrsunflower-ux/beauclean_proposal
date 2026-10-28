import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

/* 큰 제목·숫자용 라틴 디스플레이 서체 (한글은 Pretendard로 넘어간다) */
const funnel = localFont({
  src: "./fonts/FunnelDisplay.woff2",
  variable: "--font-funnel",
  weight: "300 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GL AI 스튜디오 × 뷰클린 | 스마트스토어 매출 성장 제안",
  description:
    "리뷰 1만 4천여 건과 관심고객 1만 7천여 명을 쿠팡·새 검색어·더 큰 장바구니로 넓히는 6개월 계획",
};

export const viewport: Viewport = {
  themeColor: "#fbfaf0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${funnel.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
