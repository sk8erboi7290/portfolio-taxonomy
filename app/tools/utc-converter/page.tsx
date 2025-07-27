"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { convertKSTtoUTC, convertUTCtoKST } from "@/lib/utils/converter";

export default function UTCConverterPage() {
  const [kstTime, setKstTime] = useState("");
  const [utcTime, setUtcTime] = useState("");
  const [kstError, setKstError] = useState("");
  const [utcError, setUtcError] = useState("");

  const handleKSTChange = (value: string) => {
    setKstTime(value);
    if (value.trim() === "") {
      setUtcTime("");
      setKstError("");
      return;
    }
    try {
      const normalized = value.replace(" ", "T");
      const converted = convertKSTtoUTC(normalized);
      setUtcTime(converted);
      setKstError("");
    } catch {
      setKstError("⚠️ 한국 시간 형식이 올바르지 않습니다.");
      setUtcTime("");
    }
  };

  const handleUTCChange = (value: string) => {
    setUtcTime(value);
    if (value.trim() === "") {
      setKstTime("");
      setUtcError("");
      return;
    }
    try {
      const normalized = value.replace(" ", "T");
      const converted = convertUTCtoKST(normalized);
      setKstTime(converted);
      setUtcError("");
    } catch {
      setUtcError("⚠️ UTC 시간 형식이 올바르지 않습니다.");
      setKstTime("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">KST ↔ UTC 변환기</h1>

      <Card className="mb-4">
        <CardContent className="space-y-2 pt-6">
          <Label htmlFor="kst">한국 시간 (KST)</Label>
          <p className="text-sm text-muted-foreground">예: 2025-07-27 15:00 또는 2025-07-27T15:00</p>
          <Input
            id="kst"
            placeholder="예: 2025-07-27T15:00"
            value={kstTime}
            onChange={(e) => handleKSTChange(e.target.value)}
          />
          {kstError && <p className="text-sm text-red-500">{kstError}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 pt-6">
          <Label htmlFor="utc">UTC 시간</Label>
          <p className="text-sm text-muted-foreground">예: 2025-07-27 06:00 또는 2025-07-27T06:00</p>
          <Input
            id="utc"
            placeholder="예: 2025-07-27T06:00"
            value={utcTime}
            onChange={(e) => handleUTCChange(e.target.value)}
          />
          {utcError && <p className="text-sm text-red-500">{utcError}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
