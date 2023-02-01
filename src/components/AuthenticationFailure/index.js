import './index.css'

const FailureView = props => {
  const {reload} = props
  const onClickReload = () => {
    reload()
  }
  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dh38irai9/image/upload/v1675135731/Group_7522_1_oebrqd.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={onClickReload}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
