import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {

    setVisible(!visible)

  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })



  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='showBtn' onClick={toggleVisibility}>{props.buttonShow}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button className='hideBtn' onClick={toggleVisibility}>{props.buttonHide }</button>
      </div>
    </div>
  )

})

Togglable.propTypes = {
  buttonShow: PropTypes.string.isRequired,
  buttonHide: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable