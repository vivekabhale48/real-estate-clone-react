import React from 'react'

const Spinner = () => {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
      <div>
        <img className='spinner' src="/assets/spinner.svg" alt="Spinner" />
      </div>
    </div>
  )
}

export default Spinner