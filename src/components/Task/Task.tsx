import { RiDeleteBin6Line } from 'react-icons/ri'
import styles from './task.module.css'
import { FormEvent } from 'react';

interface TaskProps {
    id: string;
    content: string;
    onDelete: (id: string) => void; 
    onChange: (id: string, checked: boolean) => void; 
}

export function Task({content, onDelete, onChange, id}: TaskProps){
  
    function handleDeleteTask(event: FormEvent){
        event.preventDefault();
    }

    return (
        <form onSubmit={handleDeleteTask}>
            <label className={styles.form} htmlFor={id}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={id} 
                    onChange={(event)=> onChange(id, event.target.checked)}
                    value=""/>
                <p className={styles.description}>{content}</p>
                <button 
                    className={styles.trashButton} 
                    type="submit"
                    onClick={() => onDelete(id)}
                >
                    <RiDeleteBin6Line/>
                </button>
            </label>
        </form>
    )
}