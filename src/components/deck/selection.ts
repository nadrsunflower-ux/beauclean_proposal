"use client";

import { useSyncExternalStore } from "react";
import type { PackageId } from "@/slides/data";

/*
 * 장을 넘겨도 유지되는 '고른 패키지'.
 * 패키지 3단 → 구성 비교 → 필요한 권한 장이 같은 선택을 함께 쓴다.
 */
let current: PackageId = "full";
const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const setPackage = (next: PackageId) => {
  if (next === current) return;
  current = next;
  listeners.forEach((l) => l());
};

export function usePackage(): [PackageId, (next: PackageId) => void] {
  const value = useSyncExternalStore(subscribe, () => current, () => "full" as PackageId);
  return [value, setPackage];
}
