import { useState } from 'react'
import { GojunoItem } from '@/pages/index/gojuon-item'
import { gojuon, GojuonItemType } from '@/pages/index/gojuon'

const QUIZ_NUMBER = 100
export function Index() {
  const [result, setResult] = useState<(boolean | undefined)[]>(
    Array.from({ length: QUIZ_NUMBER }).map(() => undefined),
  )
  const [quizNumber] = useState(
    Array.from({ length: QUIZ_NUMBER }).map(() => {
      let item: GojuonItemType | undefined
      let quizNumbers: number = 0
      while (!item) {
        quizNumbers = Math.floor(Math.random() * 1000)
        if (gojuon[quizNumbers % gojuon.length].hira) {
          item = gojuon[quizNumbers % gojuon.length]
        }
      }
      return quizNumbers % gojuon.length
    }),
  )
  return (
    <div>
      <div className="flex flex-wrap gap-8">
        {quizNumber.map((num, index) => {
          const item = gojuon[num]
          return (
            <GojunoItem
              key={index}
              title={item.hira}
              answer={item.roma}
              status={
                result[index]
                  ? 'correct'
                  : result[index] === false
                  ? 'wrong'
                  : undefined
              }
              onCorrect={() => {
                result[index] = true
                setResult([...result])
              }}
              onWrong={() => {
                result[index] = false
                setResult([...result])
              }}
            />
          )
        })}
      </div>
      <div className="result">
        {result.reduce((acc, cur) => {
          if (cur === true) {
            return acc + 1
          }
          return acc
        }, 0)}
        /{QUIZ_NUMBER}
      </div>
    </div>
  )
}
