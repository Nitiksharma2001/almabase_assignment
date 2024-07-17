import { MouseEvent, useEffect, useRef } from 'react'
import './index.css'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { LabelType } from './Container'

export default function LabelItem({
  labelItem,
  onChangeDialog,
  onModifyCord,
}: {
  labelItem: LabelType
  onChangeDialog: (id: string) => void
  onModifyCord: (id: string, x: number, y: number) => void
}) {
  let newX = labelItem.x
  let newY = labelItem.y
  let startX = 0
  let startY = 0

  const labelRef = useRef<HTMLDivElement>(null)
  const isSelected = useRef<boolean>(false)

  function mouseDown(e: MouseEvent) {
    startX = e.clientX
    startY = e.clientY

    isSelected.current = true
  }

  function mouseMove(e: MouseEvent) {
    const box = labelRef.current

    if (!isSelected.current) return
    if (!box) return

    newX = startX - e.clientX
    newY = startY - e.clientY

    startX = e.clientX
    startY = e.clientY

    box.style.top = box.offsetTop - newY + 'px'
    box.style.left = box.offsetLeft - newX + 'px'
  }

  function mouseUp() {
    const box = labelRef.current
    if (!box) return
    isSelected.current = false
    onModifyCord(labelItem.id, box.offsetLeft - newX, box.offsetTop - newY)
  }

  useEffect(() => {
    const box = labelRef.current
    if (!box) return

    box.style.top =  newY + 'px'
    box.style.left =  newX + 'px'
  }, [])
  return (
    <div
      id={labelItem.id}
      onDoubleClick={() => {
        onChangeDialog(labelItem.id)
      }}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
      ref={labelRef}
      className='div_label'
    >
      <MdOutlineDragIndicator />
      <p>{labelItem.label}</p>
    </div>
  )
}
