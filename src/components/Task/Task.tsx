import { RiDeleteBin6Line } from 'react-icons/ri'
import styles from './task.module.css'

interface TaskProps {
    content: string;
}

export function Task({content}: TaskProps){
    return (
        <form>
            <label className={styles.form} htmlFor="taskSelected">
                <input className={styles.input} type="radio" id="taskSelected" value=""/>
                <p className={styles.description}>{content}</p>
                <button className={styles.trashButton} type="submit">
                    <RiDeleteBin6Line/>
                </button>
            </label>
        </form>
    )
}