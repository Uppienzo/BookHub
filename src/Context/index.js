import React from 'react'

const Context = React.createContext({
  activeRoute: 'HOME',
  onChangeRoute: () => {},
})

export default Context
