import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';
import logo from '../assets/logo.png'
import empty from '../assets/empty.svg'
import styles from './home.module.css'

import { Task } from '../components/Task/Task'

interface Task {
    content: string;
    id: string;
    isChecked: boolean;
}

export function Home(){
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [newTask, setNewTask] = useState("");
    const [createdTasksCounter, setCreatedTasksCounter] = useState(0);
    const FinishedTasksCounter = tasks.reduce((acum, task) =>{
            if(task.isChecked)
                acum++;
            return acum;
        }, 0);
    

    const isNewTaskEmpty = !newTask.length;

    function handleNewTask(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity("");
        setNewTask(event.target.value);
    }
    
    function handleCreateNewTask(event: FormEvent){
        event.preventDefault();
        const taskValidation = newTask.trim();
        
        if(taskValidation.length) {
            setTasks([...tasks, {
                id: uuidv4(),
                isChecked: false,
                content: newTask
            }]);
            setCreatedTasksCounter(tasks.length + 1);
            setNewTask("");
        }
    }

    function handleDeleteTask(taskToDelete: string){
        const newTasksWithoutDeletedOne = tasks.filter(task => taskToDelete != task.id);
        setTasks(newTasksWithoutDeletedOne);
    }

    function handleOnCheckedChange(id: string, checked: boolean){
        const newTasks = tasks.map(task => {
            if(task.id == id)
                return {
                    ...task,
                    isChecked: checked
                };
            return task;
        })
        setTasks(newTasks);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity("Este campo é obrigatório!");
    }

    console.log(tasks);
    
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
                            <p>{FinishedTasksCounter}</p>
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
                            </div>
                        )  
                        : 
                        (
                            tasks.map(task => (
                                <Task 
                                    key={task.id}
                                    id={task.id}
                                    content={task.content}
                                    onDelete={handleDeleteTask}
                                    onChange={handleOnCheckedChange}
                                />
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