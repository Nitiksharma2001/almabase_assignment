import Container from './Container'
import Sidebar from './Sidebar'

export default function Main() {
  return (
    <main className='h-full'>
      <Sidebar />
      <Container />
    </main>
  )
}
