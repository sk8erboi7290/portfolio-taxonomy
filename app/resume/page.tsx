// app/resume/page.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 space-y-8">
      <h1 className="text-4xl font-bold">이력서 (Resume)</h1>
      <p className="text-muted-foreground text-lg">
        15년차 게임 운영 및 QA 전문가. 실용성과 팀워크 중심의 실무 내공을 쌓아왔습니다.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <a href="/resume/skano1_resume.pdf" target="_blank">📄 PDF 다운로드</a>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://github.com/skano1" target="_blank">GitHub</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="mailto:skano1@email.com">Email</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="https://linktr.ee/skano1" target="_blank">Linktree</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-2">경력 요약</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>넥슨네트웍스, 라인게임즈, 엘리트게임즈 등 총 15년 경력</li>
            <li>게임 운영, QA, 외주 프로젝트 관리 및 서비스 표준화 경험</li>
            <li>최근엔 개인 도구 개발 및 GPT 연동 프로젝트 다수 수행</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
