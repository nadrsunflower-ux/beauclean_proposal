"use client";

import { SLIDES } from "@/slides";
import { headerLabel } from "@/slides/sections";
import { Backdrop, CONTENT_BOX, Footer, Header, STAGE_H, STAGE_W } from "./Chrome";

/** 한 장을 애니메이션 없이 1920×1080 그대로 그린다 (전체 보기용). DeckContext의 isStatic=true 안에서 쓴다. */
export function SlideCanvas({ index }: { index: number }) {
  const slide = SLIDES[index];
  const { Component } = slide;
  return (
    <div className="stage relative overflow-hidden" style={{ width: STAGE_W, height: STAGE_H }}>
      <Backdrop />
      <Header label={headerLabel(slide)} index={index} total={SLIDES.length} isStatic />
      <div className="absolute overflow-hidden" style={CONTENT_BOX}>
        <Component />
      </div>
      <Footer section={slide.section} index={index} total={SLIDES.length} isStatic />
    </div>
  );
}
