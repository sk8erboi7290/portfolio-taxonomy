// lib/utils/converter.ts
import { DateTime } from "luxon";

export interface TimeZone {
  name: string;
  code: string;
  offset: string;
}

export const timeZones: TimeZone[] = [
  { name: "UTC", code: "UTC", offset: "+00:00" },
  
  // 아시아-태평양
  { name: "서울 (KST)", code: "Asia/Seoul", offset: "+09:00" },
  { name: "도쿄 (JST)", code: "Asia/Tokyo", offset: "+09:00" },
  { name: "상하이 (CST)", code: "Asia/Shanghai", offset: "+08:00" },
  { name: "베이징 (CST)", code: "Asia/Shanghai", offset: "+08:00" },
  { name: "홍콩 (HKT)", code: "Asia/Hong_Kong", offset: "+08:00" },
  { name: "타이베이 (CST)", code: "Asia/Taipei", offset: "+08:00" },
  { name: "싱가포르 (SGT)", code: "Asia/Singapore", offset: "+08:00" },
  { name: "마닐라 (PHT)", code: "Asia/Manila", offset: "+08:00" },
  { name: "방콕 (ICT)", code: "Asia/Bangkok", offset: "+07:00" },
  { name: "자카르타 (WIB)", code: "Asia/Jakarta", offset: "+07:00" },
  { name: "호치민 (ICT)", code: "Asia/Ho_Chi_Minh", offset: "+07:00" },
  { name: "양곤 (MMT)", code: "Asia/Yangon", offset: "+06:30" },
  { name: "뭄바이 (IST)", code: "Asia/Kolkata", offset: "+05:30" },
  { name: "델리 (IST)", code: "Asia/Kolkata", offset: "+05:30" },
  { name: "시드니 (AEST/AEDT)", code: "Australia/Sydney", offset: "+10:00/+11:00" },
  { name: "멜버른 (AEST/AEDT)", code: "Australia/Melbourne", offset: "+10:00/+11:00" },
  
  // 유럽
  { name: "런던 (GMT/BST)", code: "Europe/London", offset: "+00:00/+01:00" },
  { name: "파리 (CET/CEST)", code: "Europe/Paris", offset: "+01:00/+02:00" },
  { name: "베를린 (CET/CEST)", code: "Europe/Berlin", offset: "+01:00/+02:00" },
  { name: "로마 (CET/CEST)", code: "Europe/Rome", offset: "+01:00/+02:00" },
  { name: "마드리드 (CET/CEST)", code: "Europe/Madrid", offset: "+01:00/+02:00" },
  { name: "암스테르담 (CET/CEST)", code: "Europe/Amsterdam", offset: "+01:00/+02:00" },
  { name: "모스크바 (MSK)", code: "Europe/Moscow", offset: "+03:00" },
  
  // 아메리카
  { name: "뉴욕 (EST/EDT)", code: "America/New_York", offset: "-05:00/-04:00" },
  { name: "로스앤젤레스 (PST/PDT)", code: "America/Los_Angeles", offset: "-08:00/-07:00" },
  { name: "시카고 (CST/CDT)", code: "America/Chicago", offset: "-06:00/-05:00" },
  { name: "덴버 (MST/MDT)", code: "America/Denver", offset: "-07:00/-06:00" },
  { name: "토론토 (EST/EDT)", code: "America/Toronto", offset: "-05:00/-04:00" },
  { name: "벤쿠버 (PST/PDT)", code: "America/Vancouver", offset: "-08:00/-07:00" },
  { name: "멕시코시티 (CST/CDT)", code: "America/Mexico_City", offset: "-06:00/-05:00" },
  { name: "상파울루 (BRT)", code: "America/Sao_Paulo", offset: "-03:00" },
  
  // 중동/아프리카
  { name: "두바이 (GST)", code: "Asia/Dubai", offset: "+04:00" },
  { name: "이스탄불 (TRT)", code: "Europe/Istanbul", offset: "+03:00" },
  { name: "카이로 (EET)", code: "Africa/Cairo", offset: "+02:00" },
  { name: "케이프타운 (SAST)", code: "Africa/Johannesburg", offset: "+02:00" },
];

export function convertKSTtoUTC(kstString: string): string {
  const kst = DateTime.fromISO(kstString, { zone: "Asia/Seoul" });
  return kst.setZone("UTC").toFormat("yyyy-MM-dd HH:mm");
}

export function convertUTCtoKST(utcString: string): string {
  const utc = DateTime.fromISO(utcString, { zone: "UTC" });
  return utc.setZone("Asia/Seoul").toFormat("yyyy-MM-dd HH:mm");
}

export function convertToTimeZone(dateString: string, fromZone: string, toZone: string): string {
  const dt = DateTime.fromISO(dateString, { zone: fromZone });
  return dt.setZone(toZone).toFormat("yyyy-MM-dd HH:mm");
}

export function getCurrentTimeInZone(zone: string): string {
  return DateTime.now().setZone(zone).toFormat("yyyy-MM-dd HH:mm:ss");
}

export function getTimeInAllZones(dateString: string, fromZone: string = "UTC") {
  const baseDt = DateTime.fromISO(dateString, { zone: fromZone });
  return timeZones.map(tz => ({
    ...tz,
    time: baseDt.setZone(tz.code).toFormat("yyyy-MM-dd HH:mm"),
    dayOffset: baseDt.setZone(tz.code).day - baseDt.day,
  }));
}
