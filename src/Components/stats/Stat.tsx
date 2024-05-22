import React, { ReactNode } from 'react'

interface StatProps {
  children: ReactNode
  addClass?: string
}

const Stat: React.FC<StatProps> = ({ children, addClass }) => {
  return (
    <div
      className={`${addClass} sensor-stat relative box-border flex h-full w-full items-center justify-center overflow-auto rounded-box bg-secondary-content bg-cover p-10 text-primary shadow-md shadow-primary`}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-[#ffffff44] text-2xl text-primary-content backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}

export default Stat
