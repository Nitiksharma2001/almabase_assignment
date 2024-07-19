import { ChangeEvent, useEffect, useState } from "react"
import { CardType } from "./Container"

export interface DialogType {
  isOpen: boolean
  id: string | null
  onSave: (data: CardType) => void
}

export default function ModifyElemDialog({ isOpen, id, onSave }: DialogType) {
  const [data, setData] = useState<CardType | null>(null)

  useEffect(() => {
    if (!id) return

    const card = document.getElementById(id) as HTMLDivElement
    setData({
      id,
      text: card.innerText,
      x: card.offsetLeft,
      y: card.offsetTop
    })

  }, [id])

  const onChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    if (data) {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  if (!isOpen || !data || !id) return

  return (
    <dialog id='open_card' className='modal' open={isOpen}>
      <div className='modal-box flex flex-col gap-y-8'>
        <h3 className='font-bold text-lg'>Edit Label</h3>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            name='text'
            value={data.text}
            onChange={onChangeData}
            placeholder='This is a label'
            className='input input-bordered w-full'
          />
          <input type='text' placeholder='X' name='x' onChange={onChangeData} value={data.x} className='input input-bordered w-full' />
          <input type='text' placeholder='Y' name='y' onChange={onChangeData} value={data.y} className='input input-bordered w-full' />
        </div>
        <div className='modal-action'>
          <form method='dialog flex gap-2'>
            <button className='btn' onClick={() => onSave(data)}>Save</button>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
