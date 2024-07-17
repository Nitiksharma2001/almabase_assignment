import './index.css'
import LabelItem from './Card'
import { useRef, useState } from 'react'
import ModifyElemDialog from './Diaglog'
import { v4 as uuidv4 } from 'uuid'

export interface LabelType {
  id: string
  label: string
  x: number
  y: number
}

export default function Container() {
  const [labelItems, setLabelItems] = useState([
    {
      id: uuidv4(),
      label: 'label 1',
      x: 0,
      y: 0,
    },
    {
      id: uuidv4(),
      label: 'label 2',
      x: 0,
      y: 0,
    },
    {
      id: uuidv4(),
      label: 'label 3',
      x: 0,
      y: 0,
    },
  ])
  const dialogRef = useRef<LabelType>({
    id: '',
    label: '',
    x: 0,
    y: 0,
  })

  
  return (
    <>
      <ModifyElemDialog  />
      <div id='container'>
        {labelItems.map((item) => (
          <LabelItem key={item.id} labelItem={item} />
        ))}
      </div>
    </>
  )
}
