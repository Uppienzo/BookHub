import './index.css'

const Shelf = props => {
  const {details, activeShelf, shiftShelf} = props
  const {id, value, label} = details
  const isActive = activeShelf === value
  const activeClassName = isActive ? 'active-shelf' : ''

  return (
    <li className="self-item">
      <button
        type="button"
        value={value}
        className={`shelf-button ${activeClassName}`}
        onClick={() => shiftShelf(id)}
      >
        {label}
      </button>
    </li>
  )
}

export default Shelf
