import './index.css'

export default function Sidebar() {
  const labels = ['Label', 'Input', 'Button']
  return (
    <div className='drawer lg:drawer-open absolute w-auto right-0'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col items-center justify-center'>
        <label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>
          Open drawer
        </label>
      </div>
      <div className='drawer-side z-50'>
        <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
        <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-y-4'>
          {labels.map((item, i) => (
            <li>
              <a
                className='text-black font-bold bg-white hover:text-white'
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', item)
                }}
                key={i}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
