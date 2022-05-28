import './IndexComp.scss'
import classNames from 'classnames'

export const CustomButton = (props) => {
  const {children, size} = props
  return <button className={classNames('button', size)}>{children}</button>
}