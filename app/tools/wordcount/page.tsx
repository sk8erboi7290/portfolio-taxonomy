'use client'

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"

export default function WordCountTool() {
  const [text, setText] = useState("")
  const maxLength = 100

  const charCount = text.length
  const isOver = charCount > maxLength

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold">✍️ 글자 수 체크기</h1>
      <p className="text-muted-foreground">
        최대 <strong>{maxLength}</strong>자까지 입력할 수 있습니다.
      </p>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 텍스트를 입력하세요..."
        className={isOver ? "border-red-500" : ""}
      />

      <div className={`text-right text-sm font-medium ${isOver ? "text-red-500" : "text-muted-foreground"}`}>
        {charCount} / {maxLength}자
        {isOver && (
          <div className="flex items-center mt-1 text-red-500">
            <AlertCircle className="w-4 h-4 mr-1" />
            글자 수 제한을 초과했습니다!
          </div>
        )}
      </div>
    </div>
  )
}

