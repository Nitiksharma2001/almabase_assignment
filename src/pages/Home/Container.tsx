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
    setLabelItems((labelItems) =>
      labelItems.map((item) => {
        if (item.id == data.id) return data
        return item
      })
    )
    setShowDialogyBox(false)
    setDialogData(undefined)
  }

  const onModifyCord = (id: string, x: number, y: number) => {
    const localData = labelItems.map((item) => {
      if (item.id == id) return {
        ...item, x, y
      }
      return item
    })
    localStorage.setItem('labelItems', JSON.stringify(localData))
    setLabelItems(localData)
  }
  return (
    <div>
      <ModifyElemDialog isOpen={showDialogBox} data={dialogData} onSave={onSave} />
      <div id='container'>
        {labelItems.map((item) => (
          <LabelItem key={item.id} labelItem={item} onChangeDialog={onChangeDialog} onModifyCord={onModifyCord}/>
        ))}
      </div>
    </div>
  )
}
