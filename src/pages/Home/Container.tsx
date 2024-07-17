import './index.css'
import LabelItem from './Card'
import { useEffect, useState } from 'react'
import ModifyElemDialog from './Diaglog'
import { v4 as uuidv4 } from 'uuid'

export interface LabelType {
  id: string
  label: string
  x: number
  y: number
}

export default function Container() {
  const [labelItems, setLabelItems] = useState<LabelType[]>([])

  useEffect(() => {
    const labels = localStorage.getItem('labelItems')
    if(labels){
      setLabelItems(JSON.parse(labels) as LabelType[])
    }

  }, [])

  const [showDialogBox, setShowDialogyBox] = useState(false)
  const [dialogData, setDialogData] = useState<LabelType | undefined>(undefined)

  const onChangeDialog = (id: string) => {
    setShowDialogyBox(true)
    setDialogData(labelItems.find((item) => item.id === id))
  }
  const onSave = (data: LabelType) => {
    const localData = labelItems.map((item) => {
      if (item.id == data.id) return data
      return item
    })
    setLabelItems(localData)
    localStorage.setItem('labelItems', JSON.stringify(localData))
    setShowDialogyBox(false)
    setDialogData(undefined)
  }

  const onModifyCord = (id: string, x: number, y: number) => {
    const localData = labelItems.map((item) => {
      console.log(x, y)
      if (item.id == id) return {
        ...item, x, y
      }
      return item
    })
    localStorage.setItem('labelItems', JSON.stringify(localData))
    setLabelItems(localData)
  }

  const onDropItem = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain');
    const newItem = [...labelItems, {
      id: uuidv4(),
      label: data, 
      x: e.clientX,
      y: e.clientY
    }]
    localStorage.setItem('labelItems', JSON.stringify(newItem))
    setLabelItems(newItem)
  }
  return (
    <>
      <ModifyElemDialog isOpen={showDialogBox} data={dialogData} onSave={onSave} />
      <div id='container' className='h-full w-full visible' onDrop={onDropItem} onDragOver={e => e.preventDefault()}>
        {labelItems.map((item) => (
          <LabelItem key={item.id} labelItem={item} onChangeDialog={onChangeDialog} onModifyCord={onModifyCord}/>
        ))}
      </div>
    </>
  )
}
