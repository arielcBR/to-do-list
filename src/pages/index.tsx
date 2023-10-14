import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';
import logo from '../assets/logo.png'
import empty from '../assets/empty.svg'
import styles from './home.module.css'

import { Task } from '../components/Task/Task'


export function Home(){
    const [tasks, setTasks] = useState<Array<string>>([]);
    const [newTask, setNewTask] = useState("");
    const [createdTasksCounter, setCreatedTasksCounter] = useState(0);
    // const [finishedTasksCounter, setFinishedTasksCounter] = useState(0);

    const isNewTaskEmpty = !newTask.length;

    function handleNewTask(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity("");
        setNewTask(event.target.value);
    }
    
    function handleCreateNewTask(event: FormEvent){
        event.preventDefault();
        const taskValidation = newTask.trim();
        
        if(taskValidation.length) {
            setTasks([...tasks, newTask]);
            setCreatedTasksCounter(tasks.length + 1);
            setNewTask("");
        }
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity("Este campo é obrigatório!");
    }



return (
    <div>
        <header>
            <img src={logo} alt="logo to-do list" />
        </header>

        <div className={styles.container}>
            <main>
                <form onSubmit={handleCreateNewTask}>
                    <input 
                        type="text" 
                        placeholder='Adicione uma nova tarefa'
                        value={newTask}
                        onChange={handleNewTask}
                        onInvalid={handleNewTaskInvalid}
                        required
                    />

                    <button type="submit" disabled={isNewTaskEmpty}>   
                        Criar
                        <FiPlusCircle/>
                    </button>
                </form>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <div className={styles.tasksCreated}>
                            <p>Tarefas criadas</p>
                            <p>{createdTasksCounter}</p>
                        </div>

                        <div className={styles.tasksFinished}>
                            <p>Concluídas</p>
                            <p>0</p>
                        </div>
                    </div>

                    <div className={styles.tableBody}>
                    {!tasks.length
                        ? 
                        (
                            <div className={styles.wrapperEmptyState}>
                                <img src={empty}/>
                                <div>
                                    <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                                    <p>Crie tarefas e organize seus itens a fazer</p>
                                </div>
                            </div>)  
                        : 
                        (
                            tasks.map(task => (
                                <Task key={uuidv4()} content={task}/>
                            ))
                        )
                    }
                        
                    </div>
                </div>
            </main>

        </div>
    </div>
    );
}