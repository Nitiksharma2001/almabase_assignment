import { ChangeEvent, useState } from "react"
import { LabelType } from "./Container"

interface DialogType {
  isOpen: boolean, 
  data?: LabelType, 
  onSave: (data: LabelType) => void
}

export default function ModifyElemDialog({isOpen, data, onSave}: DialogType) {
  if(!isOpen || !data ) return 
  const [labelData, setLabelData] = useState(data)

  const onChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setLabelData({...labelData, [e.target.name]: e.target.value})
  }

  return (
    <dialog id='open_card' className='modal' open={isOpen}>
      <div className='modal-box flex flex-col gap-y-8'>
        <h3 className='font-bold text-lg'>Edit Label</h3>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            name='label'
            value={labelData.label}
            onChange={onChangeData}
            placeholder='This is a label'
            className='input input-bordered w-full'
          />
          <input type='text' placeholder='X' name='x' onChange={onChangeData} value={labelData.x} className='input input-bordered w-full' />
          <input type='text' placeholder='Y' name='y' onChange={onChangeData} value={labelData.y} className='input input-bordered w-full' />
        </div>
        <div className='modal-action'>
          <form method='dialog flex gap-2'>
            <button className='btn' onClick={() => onSave(labelData)}>Save</button>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
