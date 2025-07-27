// app/tools/page.tsx
'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const tools = [
  { name: "글자 수 체크기", path: "/tools/wordcount", description: "실시간 글자 수 제한기" },
  { name: "UTC 변환기", path: "/tools/utc-converter", description: "UTC ↔ KST 시간 변환" },
  { name: "JSON → CSV", path: "/tools/json-to-csv", description: "JSON을 CSV로 변환" },
  { name: "맞춤법 검사기", path: "/tools/spellcheck", description: "API 연동으로 맞춤법 확인" },
]

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold">🧰 유틸리티 도구</h1>
      <p className="text-muted-foreground">문서 작업, 시간 계산 등 실용 도구 모음</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link key={tool.path} href={tool.path}>
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{tool.name}</h2>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
