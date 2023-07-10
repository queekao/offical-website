import React, { createContext } from 'react'
import { ModalType } from '../types'
import { Props } from '../types'

export const ModelContext = createContext<ModalType>({
  isModalOpen: false,
  setModalOpen: () => {}
})
// this <Props> is for defining the type of component
export const ModelContextProvider: React.FC<Props> = ({ children }) => {
  const contextValue: any = {}

  return (
    <ModelContext.Provider value={contextValue}>
      {children}
    </ModelContext.Provider>
  )
}
