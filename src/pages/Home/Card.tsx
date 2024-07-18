import { useEffect } from 'react'
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

  useEffect(() => {
    const card = document.getElementById(labelItem.id) as HTMLDivElement

    card.addEventListener('mousedown', mouseDown)

    function mouseDown(e: globalThis.MouseEvent) {
      startX = e.clientX
      startY = e.clientY
  
      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
    }
  
    function mouseMove(e: globalThis.MouseEvent) {
      newX = startX - e.clientX
      newY = startY - e.clientY
  
      startX = e.clientX
      startY = e.clientY
  
      card.style.top = card.offsetTop - newY + 'px'
      card.style.left = card.offsetLeft - newX + 'px'
    }
    
    function mouseUp() {
      // onModifyCord(labelItem.id, card.offsetLeft - newX, card.offsetTop - newY)
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }
  }, [])  

  return (
    <div
      id={labelItem.id}
      onDoubleClick={() => {
        onChangeDialog(labelItem.id)
      }}
      className='div_label'
      style={{
        top: newY + 'px',
        left: newX + 'px'
      }}
    >
      <MdOutlineDragIndicator />
      <p style={{userSelect: 'none'}}>{labelItem.label}</p>
    </div>
  )
}
