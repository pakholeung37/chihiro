import { FocusEventHandler, useCallback } from 'react'
import cx from 'clsx'
import { Input } from '@/components/ui/input'

export function GojunoItem(props: {
  title?: string
  answer?: string | string[]
  status?: 'correct' | 'wrong'
  onChange?: () => void
  onCorrect?: () => void
  onWrong?: () => void
}) {
  const onInput = useCallback(() => {
    props.onChange?.()
  }, [props])

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      let result: boolean
      if (Array.isArray(props.answer)) {
        result = props.answer.includes(e.target.value)
      } else {
        result = props.answer === e.target.value
      }
      if (result) {
        props.onCorrect?.()
      } else {
        props.onWrong?.()
      }
    },
    [props],
  )
  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={cx('text-8xl', {
          'text-green-500': props.status === 'correct',
          'text-red-500': props.status === 'wrong',
        })}
      >
        {props.title}
      </span>
      <div className="mt-4">
        <Input onInput={onInput} onBlur={onBlur} />
      </div>
    </div>
  )
}
