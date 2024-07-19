import './index.css'
import LabelItem from './Card'
import { useEffect, useState } from 'react'
import ModifyElemDialog from './Diaglog'
import { v4 as uuidv4 } from 'uuid'

export interface CardType {
  id: string
  text: string
  x: number
  y: number
}

export default function Container() {
  const [cards, SetCards] = useState<CardType[]>([])
  const [showDialogBox, setShowDialogyBox] = useState(false)
  const [dialogId, setDialogId] = useState('')

  useEffect(() => {
    const labels = localStorage.getItem('labelItems')
    if (labels) {
      SetCards(JSON.parse(labels) as CardType[])
    }
  }, [])

  const onChangeDialog = (id: string) => {
    setShowDialogyBox(true)
    setDialogId(id)
  }

  const onSave = (data: CardType) => {
    const localData = cards.map((item) => {
      if (item.id == data.id) return data
      return item
    })
    SetCards(localData)
    localStorage.setItem('labelItems', JSON.stringify(localData))
    setShowDialogyBox(false)
    setDialogId('')
  }

  const onModifyCord = () => {
    const allCards = document.querySelectorAll('.draggable-card') as NodeListOf<HTMLDivElement>
    const modifiedCards = Array.from(allCards).map((card) => {
      const x = card.offsetLeft
      const y = card.offsetTop
      return { x, y, text: card.innerText, id: card.id }
    })
    localStorage.setItem('labelItems', JSON.stringify(modifiedCards))
    SetCards(modifiedCards)
  }

  const onDropItem = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain');
    const newItem = [...cards, {
      id: uuidv4(),
      text: data,
      x: e.clientX,
      y: e.clientY
    }]
    localStorage.setItem('labelItems', JSON.stringify(newItem))
    SetCards(newItem)
  }

  return (
    <>
      <ModifyElemDialog isOpen={showDialogBox} id={dialogId} onSave={onSave} />
      <div id='container' onDrop={onDropItem} onDragOver={e => e.preventDefault()}>
        {cards.map((item) => (
          <LabelItem key={item.id} labelItem={item} onChangeDialog={onChangeDialog} onModifyCord={onModifyCord} />
        ))}
      </div>
    </>
  )
}
