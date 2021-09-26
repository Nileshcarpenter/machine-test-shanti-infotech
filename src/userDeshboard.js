import React, { Component, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { addTask, getTaskList,editTaskdata,deleteTaskdata } from './action/action'
import { useHistory } from 'react-router-dom'
import toaster from './toaster';
const Todo = () => {
    const [state, setState] = useState({ name: '', taskId: '' })
    const [lists, setLists] = useState([])
    const [edit_task,seteditTask]=useState('')
    const [editId,seteditId]=useState([])
    const history = useHistory()
  
    const onChangeTask = (e) => {
        const { name, value } = e.target
        setState((old) => {
            return { ...old, ['task']: value }
        })
    };

    const addTasks = async () => {
        let res = await addTask({ task: state.task })
        if (res.success===true) {
            getTaskLists()
           }
        
    };

    const edit = object => {
        seteditId(object.taskId)
      seteditTask(object.name)
    
  };

    const editTask = (idx, name) => evt => {
        const formData = lists.map((list, id) => {
            if (idx !== id) return list;
            return { ...list, [name]: ((evt) ? evt.target.value : "") };
        });
        setLists(formData);
        //console.log(formData).
    }

    const saveEditTask = async (object) => {
    //console.log(object)
        let res=await editTaskdata(object)
     if(res.success){
        toaster.show({ message: "Data updated", intent: "success" })
        getTaskLists()
     }
        
    };

    const deleteTask = async(object) => {
        await deleteTaskdata({taskId:object.taskId})
        getTaskLists()
    };

    const getTaskLists = async () => {
        let res = await getTaskList()
        if (res.success) {
            setLists(res.response.List)
        }

    }

    const doneTask = async (row) => {
            let value=row.completed===1?0:1
            let res = await editTaskdata({ deleted: row.deleted, name: row.name, completed: value, taskId: row.taskId })
            if (res.success) {
                toaster.show({ message: value===1?"Status Marked Completed":"Status Marked In-Progress", intent: "success" })
                getTaskLists()
            }
        

    }

    const signout = () => {
        localStorage.clear()
        history.push('/')
        window.location.reload()
    }

    useEffect(() => {
        getTaskLists()
    }, [])

    return (
        <div><button style={{ width:'300px' ,marginLeft:99}} onClick={signout}>Logout</button>
        <button style={{ width:'300px' ,marginLeft:99}} onClick={e=>history.push('/drag-drop')}>Go to Drag and Drop</button>
        <div style={{ textAlign: 'center' }}>
            <div>
                <h2>ToDo List</h2>
            </div>

            <div>
                <TextField
                    id="standard-basic"
                    autoComplete="off"
                    value={state.task}
                    onChange={e => onChangeTask(e)}
                    placeholder="Add TO DO"
                />
                <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={state.task == ''}
                    onClick={e => addTasks()}
                >
                    Add
                </Button>
            </div>

            {lists.length > 0
                ? <div>
                    <table className="centerTable" style={{ marginTop: 20 ,marginLeft:0}}>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {lists.map((object, i) => {
                            return (
                                <tbody>
                                    <tr>
                                    <td>
                          { editId===object.taskId
                            ? <TextField
                                id="standard-basic"
                                value={object.name}
                                onChange={editTask (i, 'name')}
                              />
                            : object.is_done
                                ? <s>{object.name}</s>
                                : <span>{object.name}</span>}
                        </td>
                        
                                        <td>
                                            {editId===object.taskId
                                                ? <div>
                                                    <Button
                                                        className="button_style"
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        disabled={object.taskId == ''}
                                                        onClick={e => saveEditTask(object)}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        className="button_style"
                                                        variant="outlined"
                                                        color=""
                                                        size="small"
                                                        onClick={e => edit(object)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                                : <div>
                                                    <Button
                                                        className="button_style"
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        onClick={e => edit(object)}
                                                    >
                                                        Edit
                                                    </Button>
                                                     <Button
                                                            className="button_style"
                                                            variant="outlined"
                                                            color="secondary"
                                                            size="small"
                                                            onClick={e => doneTask(object)}
                                                        >
                                                            Mark
                                                        </Button> 
                                                    <Button
                                                        className="button_style"
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={e => deleteTask(object)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>}
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
                : <h2>Nothing to do!</h2>}
        </div>
        </div>
    );

}
export default Todo