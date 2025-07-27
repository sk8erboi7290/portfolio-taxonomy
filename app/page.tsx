'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  { name: "👤 소개 (About)", path: "/about", description: "나에 대한 소개와 연락처" },
  { name: "📄 이력서 (Resume)", path: "/resume", description: "PDF 이력서 + 경력 요약" },
  { name: "🧰 도구 모음 (Tools)", path: "/tools", description: "글자 수, 변환기 등 유틸리티 도구" },
  { name: "🚀 프로젝트 (Projects)", path: "/projects", description: "실험적 도구 & UI 포트폴리오" },
  { name: "📚 블로그 (Blog)", path: "/blog", description: "기술 / 회고 / 개인 글 모음" },
]

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 space-y-8">
      <h1 className="text-4xl font-bold">🧱 개인 포트폴리오 사이트</h1>
      <p className="text-muted-foreground text-lg">
        아래 섹션을 통해 경력, 도구, 블로그 등 다양한 콘텐츠를 확인할 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link key={section.path} href={section.path}>
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{section.name}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
