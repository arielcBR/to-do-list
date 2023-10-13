import { FiPlusCircle } from 'react-icons/fi'
import logo from '../assets/logo.png'
import empty from '../assets/empty.svg'
import styles from './home.module.css'

import { Task } from '../components/Task/Task'

export function Home(){


return (
    <div>
        <header>
            <img src={logo} alt="logo to-do list" />
        </header>

        <div className={styles.container}>
            <main>
                <form>
                    <input type="text" placeholder='Adicione uma nova tarefa'/>

                    <button type="submit">   
                        Criar
                        <FiPlusCircle/>
                    </button>
                </form>

                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <div className={styles.tasksCreated}>
                            <p>Tarefas criadas</p>
                            <p>0</p>
                        </div>

                        <div className={styles.tasksFinished}>
                            <p>Concluídas</p>
                            <p>0</p>
                        </div>
                    </div>

                    <div className={styles.tableBody}>
                        <Task content={'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.'}/>
                        {/* <div className={styles.wrapperEmptyState}>
                            <img src={empty}/>
                            <div>
                                <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                                <p>Crie tarefas e organize seus itens a fazer</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </main>

        </div>
    </div>
    );
}