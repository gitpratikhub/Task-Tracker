import { useState } from 'react'

const Addtask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!text) {
          alert(`Thats What She Said : 'Nothing'`)
          return
        }
        
        onAdd({ text, day, reminder })
        setText('')
        setDay('')
        setReminder(false)

      }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day</label>
                <input type='text' placeholder='Add Day and Time' value={day} onChange={(e)=>setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Important Tag</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>
            <input type='submit' value='save' className='btn btn-block ' />
        </form>
    )
}

export default Addtask
