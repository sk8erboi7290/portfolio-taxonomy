// lib/utils/converter.ts
import { DateTime } from "luxon";

export function convertKSTtoUTC(kstString: string): string {
  const kst = DateTime.fromISO(kstString, { zone: "Asia/Seoul" });
  return kst.setZone("UTC").toFormat("yyyy-MM-dd HH:mm");
}

export function convertUTCtoKST(utcString: string): string {
  const utc = DateTime.fromISO(utcString, { zone: "UTC" });
  return utc.setZone("Asia/Seoul").toFormat("yyyy-MM-dd HH:mm");
}
