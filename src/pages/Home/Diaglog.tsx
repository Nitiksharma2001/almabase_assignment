import { ChangeEvent, Ref, useState } from 'react'
import { LabelType } from './Container'

export default function ModifyElemDialog({ dialogRef }: React.MutableRefObject<LabelType>) {
  return (
    <dialog id='open_card' className='modal'>
      <div className='modal-box flex flex-col gap-y-8'>
        <h3 className='font-bold text-lg'>Edit Label</h3>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            name='label'
            placeholder='This is a label'
            className='input input-bordered w-full'
          />
          <input type='text' placeholder='X' name='x' className='input input-bordered w-full' />
          <input type='text' placeholder='Y' name='y' className='input input-bordered w-full' />
        </div>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>Save</button>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
