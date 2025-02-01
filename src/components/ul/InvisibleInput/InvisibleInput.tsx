import { Input, InputProps } from "antd"
import styles from './invisibleInput.module.scss'
import classNames from 'classnames';


const InvisibleInput = ({ className, ...props }: InputProps) => {

    return <Input className={classNames(styles.invisibleInput, className)} {...props} />

}

export default InvisibleInput