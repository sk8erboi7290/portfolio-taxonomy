"use client"; // ✅ 이 줄을 추가해야 onClick이 허용됩니다

import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">안녕하세요!</h1>
      <h2 className="text-xl text-muted-foreground mb-6">
        실무 중심의 운영 전문가입니다.
      </h2>
      <p className="mb-6 leading-relaxed text-lg">
        15년 간 게임 운영, QA, 외주 PM 업무를 수행하며 서비스 품질과 운영 효율을 동시에 추구해왔습니다.
        최근에는 개인 도구 개발과 포트폴리오 웹사이트 구축을 병행하며, 실용적인 자동화에도 큰 관심을 두고 있습니다.
      </p>

      <div className="flex flex-col gap-2 mb-6 text-blue-600 underline">
        <a href="https://github.com/skano1" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="/resume" className="hover:opacity-80">이력서 보기</a>
        <a href="/projects" className="hover:opacity-80">진행한 프로젝트</a>
      </div>

      <Button variant="outline" onClick={() => window.location.href = "/tools"}>
        내가 만든 도구 보러가기
      </Button>
    </div>
  );
}
