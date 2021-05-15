import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showaddtask, setshowaddtask] = useState(false)
  const [tasks , setTasks ] = useState([])

  useEffect(()=>{
    const getTask = async ()=>{
      const tasksfromserver = await fetchtasks()
      setTasks(tasksfromserver)
    }    

    getTask()
  },[])
 
  //fetching data
  const fetchtasks = async ()=>{
    const res = await fetch('https://fjson-server-app.herokuapp.com/tasks')
    const data = await res.json()
    //console.log(data)
    return data
  }

    //fetching singular data for reminder
    const fetchtask = async (id)=>{
      const res = await fetch(`https://fjson-server-app.herokuapp.com/tasks/${id}`)
      const data = await res.json()
      //console.log(data)
      return data
    }

//adding task
const addTask = async (task) => {
  const res = await fetch('https://fjson-server-app.herokuapp.com/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])
}


  //deleting task
  const deleteTask = async (id) => {
    await fetch(`https://fjson-server-app.herokuapp.com/tasks/${id}`,{method : 'DELETE'})
    
    setTasks(tasks.filter((task)=> task.id !==id))
  }

 //toggle task 
  const toggleReminder = async (id) => {
    const chngetogle = await fetchtask(id)
    const updatetask = {...chngetogle, reminder:!chngetogle.reminder}
    
    const res = await fetch(`https://fjson-server-app.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatetask),
    })
    const data = await res.json()
    
    setTasks(
      tasks.map((task)=>
      task.id === id ? {...task, reminder:data.reminder} :task
      )
    )  
  }

  return (
    <Router>
      <div className='container'>
        <Header onAdd={()=> setshowaddtask(!showaddtask)} butanstate={showaddtask} />
        
        <Route path='/' exact render={(props)=>(
          <>
            {showaddtask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('Nothing to show here') }
          </>
        )}  />
        <Route path='/About' component={About}/>
        <Footer />
      </div>
    </Router>  
  );
}

export default App;
