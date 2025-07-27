"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { timeZones, type TimeZone } from "@/lib/utils/converter";
import { DateTime } from "luxon";

export default function UTCConverterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>([
    { name: "UTC", code: "UTC", offset: "+00:00" },
    { name: "서울 (KST)", code: "Asia/Seoul", offset: "+09:00" }
  ]);
  const [currentTime, setCurrentTime] = useState(DateTime.now());
  const [selectedRange, setSelectedRange] = useState<{start: number, end: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [is24HourFormat, setIs24HourFormat] = useState(true);
  const [selectedDate, setSelectedDate] = useState(DateTime.now().toFormat("yyyy-MM-dd"));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredTimeZones = timeZones.filter(tz => 
    tz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHourColor = (hour: number, isCurrentHour: boolean, isInRange: boolean) => {
    if (isInRange) return "bg-orange-500 text-white border-orange-600";
    if (isCurrentHour) return "bg-blue-500 text-white";
    if (hour >= 9 && hour < 17) return "bg-blue-100 text-blue-900 hover:bg-blue-200"; // 업무시간
    if (hour >= 22 || hour < 6) return "bg-gray-700 text-white hover:bg-gray-600"; // 밤시간
    return "bg-gray-200 text-gray-700 hover:bg-gray-300"; // 일반시간
  };

  const handleMouseDown = (hour: number, timeZone: TimeZone) => {
    const baseDate = DateTime.fromISO(selectedDate);
    const zoneTime = baseDate.setZone(timeZone.code).set({ hour, minute: 0, second: 0 });
    const utcHour = zoneTime.setZone("UTC").hour;
    
    setIsDragging(true);
    setDragStart(utcHour);
    setSelectedRange({ start: utcHour, end: utcHour });
  };

  const handleMouseEnter = (hour: number, timeZone: TimeZone) => {
    if (isDragging && dragStart !== null) {
      const baseDate = DateTime.fromISO(selectedDate);
      const zoneTime = baseDate.setZone(timeZone.code).set({ hour, minute: 0, second: 0 });
      const utcHour = zoneTime.setZone("UTC").hour;
      
      const start = Math.min(dragStart, utcHour);
      const end = Math.max(dragStart, utcHour);
      setSelectedRange({ start, end });
    }
  };

  const handleClick = (hour: number, timeZone: TimeZone) => {
    if (!isDragging) {
      const baseDate = DateTime.fromISO(selectedDate);
      const zoneTime = baseDate.setZone(timeZone.code).set({ hour, minute: 0, second: 0 });
      const utcHour = zoneTime.setZone("UTC").hour;
      setSelectedRange({ start: utcHour, end: utcHour });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setDragStart(null);
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const isHourInRange = (hour: number, timeZone: TimeZone) => {
    if (!selectedRange) return false;
    
    const baseDate = DateTime.fromISO(selectedDate);
    const zoneTime = baseDate.setZone(timeZone.code).set({ hour, minute: 0, second: 0 });
    const utcHour = zoneTime.setZone("UTC").hour;
    
    return utcHour >= selectedRange.start && utcHour <= selectedRange.end;
  };

  const TimelineBar = ({ timeZone }: { timeZone: TimeZone }) => {
    // 선택된 날짜의 현재 시간을 계산
    const selectedDateTime = DateTime.fromISO(selectedDate).setZone(timeZone.code);
    const zoneTime = selectedDateTime.set({ 
      hour: currentTime.hour, 
      minute: currentTime.minute, 
      second: currentTime.second 
    });
    const currentHour = zoneTime.hour;
    
    return (
      <div className="grid grid-cols-[200px_1fr_40px] gap-4 items-center mb-4">
        {/* 시간대 정보 - 확장된 너비 */}
        <div className="text-sm">
          <div className="font-medium text-base mb-1">{timeZone.name}</div>
          
          {/* 현재 시간 */}
          <div className="text-gray-600 mb-1">
            <span className="text-xs">현재: </span>
            <span className="font-mono">
              {is24HourFormat ? zoneTime.toFormat("HH:mm") : zoneTime.toFormat("h:mm a")}
            </span>
          </div>
          
          {/* 선택된 시간 범위 */}
          {selectedRange && (
            <div className="text-orange-600 text-xs mb-1">
              <span>선택: </span>
              <span className="font-mono">
                {selectedRange.start === selectedRange.end 
                  ? (() => {
                      const selectedTime = selectedDateTime.setZone("UTC").set({ hour: selectedRange.start }).setZone(timeZone.code);
                      return is24HourFormat ? selectedTime.toFormat("HH:mm") : selectedTime.toFormat("h:mm a");
                    })()
                  : (() => {
                      const startTime = selectedDateTime.setZone("UTC").set({ hour: selectedRange.start }).setZone(timeZone.code);
                      const endTime = selectedDateTime.setZone("UTC").set({ hour: selectedRange.end }).setZone(timeZone.code);
                      return is24HourFormat 
                        ? `${startTime.toFormat("HH:mm")}–${endTime.toFormat("HH:mm")}`
                        : `${startTime.toFormat("h:mm a")}–${endTime.toFormat("h:mm a")}`;
                    })()
                }
              </span>
            </div>
          )}
          
          {/* 날짜 정보 (시간대별 날짜 차이 표시) */}
          <div className="text-xs text-gray-500">
            {zoneTime.toFormat("EEE, MMM d", { locale: 'en' })}
            {zoneTime.day !== currentTime.day && (
              <span className="text-orange-500 ml-1">
                ({zoneTime.day > currentTime.day ? '+1일' : '-1일'})
              </span>
            )}
          </div>
        </div>
        
        {/* 24시간 그리드 - 고정 너비 */}
        <div className="grid gap-0 select-none" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
          {Array.from({ length: 24 }, (_, hour) => {
            const isCurrentHour = hour === currentHour;
            const isInRange = isHourInRange(hour, timeZone);
            const timeAtHour = selectedDateTime.set({ hour, minute: 0, second: 0 });
            
            // 12시간 모드에서의 표시 형식
            const displayHour = is24HourFormat 
              ? hour 
              : (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour);
            const period = is24HourFormat ? '' : (hour < 12 ? 'AM' : 'PM');
            
            return (
              <div
                key={hour}
                className={`h-12 border border-gray-300 flex flex-col items-center justify-center text-xs cursor-pointer transition-colors ${getHourColor(hour, isCurrentHour, isInRange)}`}
                title={is24HourFormat 
                  ? `${timeAtHour.toFormat("HH:mm")} - ${timeAtHour.toFormat("dd/MM")}`
                  : `${timeAtHour.toFormat("h:mm a")} - ${timeAtHour.toFormat("dd/MM")}`
                }
                onClick={() => handleClick(hour, timeZone)}
                onMouseDown={() => handleMouseDown(hour, timeZone)}
                onMouseEnter={() => handleMouseEnter(hour, timeZone)}
                onMouseUp={handleMouseUp}
              >
                <div className="font-medium">
                  {displayHour}
                </div>
                {!is24HourFormat && (
                  <div className="text-xs opacity-75">
                    {period}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 삭제 버튼 */}
        <div className="flex justify-end">
          {timeZone.code !== "UTC" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeTimeZone(timeZone.code)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const addTimeZone = (timeZone: TimeZone) => {
    if (!selectedTimeZones.find(tz => tz.code === timeZone.code)) {
      setSelectedTimeZones(prev => [...prev, timeZone]);
    }
    setSearchQuery("");
  };

  const removeTimeZone = (timeZoneCode: string) => {
    setSelectedTimeZones(prev => prev.filter(tz => tz.code !== timeZoneCode));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">World Time Converter</h1>

      {/* 날짜 선택 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>날짜 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label htmlFor="date-picker" className="text-sm font-medium">
              날짜:
            </Label>
            <Input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(DateTime.now().toFormat("yyyy-MM-dd"))}
            >
              오늘
            </Button>
            <div className="text-sm text-muted-foreground">
              선택된 날짜: {DateTime.fromISO(selectedDate).toFormat("yyyy년 MM월 dd일 (EEE)", { locale: 'ko' })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 시간대 검색/추가 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>시간대 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              placeholder="시간대 검색 (예: 도쿄, 뉴욕, Asia/Tokyo)"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
            {searchQuery && filteredTimeZones.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-background border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                {filteredTimeZones.map((tz: TimeZone) => (
                  <div
                    key={tz.code}
                    className="p-2 hover:bg-muted cursor-pointer"
                    onClick={() => addTimeZone(tz)}
                  >
                    <div className="font-medium">{tz.name}</div>
                    <div className="text-sm text-muted-foreground">{tz.code} ({tz.offset})</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 선택된 시간 범위 요약 */}
      {selectedRange && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>선택된 시간 범위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedTimeZones.map((tz: TimeZone) => {
                const baseDate = DateTime.fromISO(selectedDate);
                const startTime = baseDate.setZone("UTC").set({ hour: selectedRange.start, minute: 0, second: 0 }).setZone(tz.code);
                const endTime = baseDate.setZone("UTC").set({ hour: selectedRange.end, minute: 0, second: 0 }).setZone(tz.code);
                
                return (
                  <div key={tz.code} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{tz.name}</div>
                      <div className="text-xs text-muted-foreground">{tz.code}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">
                        {selectedRange.start === selectedRange.end 
                          ? (is24HourFormat ? startTime.toFormat("HH:mm") : startTime.toFormat("h:mm a"))
                          : (is24HourFormat 
                              ? `${startTime.toFormat("HH:mm")}–${endTime.toFormat("HH:mm")}`
                              : `${startTime.toFormat("h:mm a")}–${endTime.toFormat("h:mm a")}`
                            )
                        }
                      </div>
                      {startTime.day !== endTime.day && selectedRange.start !== selectedRange.end && (
                        <div className="text-xs text-orange-600">
                          다음날까지
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 24시간 타임라인 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            World Time Zones
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="time-format"
                  checked={is24HourFormat}
                  onCheckedChange={setIs24HourFormat}
                />
                <Label htmlFor="time-format" className="text-sm">
                  {is24HourFormat ? "24시간" : "12시간"}
                </Label>
              </div>
              <div className="text-sm font-normal text-muted-foreground">
                현재: {is24HourFormat 
                  ? currentTime.toFormat("yyyy-MM-dd HH:mm:ss") 
                  : currentTime.toFormat("yyyy-MM-dd h:mm:ss a")
                } UTC
                {selectedRange && (
                  <div className="text-orange-600 font-medium">
                    선택: {selectedRange.start === selectedRange.end 
                      ? `${selectedRange.start.toString().padStart(2, '0')}:00 UTC`
                      : `${selectedRange.start.toString().padStart(2, '0')}:00–${selectedRange.end.toString().padStart(2, '0')}:00 UTC`
                    }
                  </div>
                )}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {selectedTimeZones.map((tz: TimeZone) => (
              <TimelineBar key={tz.code} timeZone={tz} />
            ))}
          </div>
          
          {/* 시간 레이블 */}
          <div className="grid grid-cols-[200px_1fr_40px] gap-4 mt-4 text-xs text-muted-foreground">
            <div></div>
            <div className="grid gap-0" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {Array.from({ length: 24 }, (_, hour) => {
                if (hour % 6 === 0) {
                  const displayHour = is24HourFormat 
                    ? hour 
                    : (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour);
                  const period = is24HourFormat ? ':00' : (hour < 12 ? 'AM' : 'PM');
                  
                  return (
                    <div key={hour} className="text-center">
                      {is24HourFormat ? `${hour}:00` : `${displayHour}${period}`}
                    </div>
                  );
                }
                return <div key={hour}></div>;
              })}
            </div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
