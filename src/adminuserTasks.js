import React, { Component, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { addTask,editTaskdata, getTaskList } from './action/action'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useHistory } from 'react-router-dom'
import toaster from './toaster';
import { useParams } from 'react-router-dom'
import Modal from 'react-modal';

const UserTasks = () => {
    const { id } = useParams()
    const [lists, setLists] = useState([])
    const [check, setcheck] = useState(false)
    const [TaskModel, setTaskModel] = useState(false)
    const [form,setForm]=useState({name:'',userId:id})
    const history = useHistory()

    const getTaskLists = async () => {
        let res = await getTaskList({ userId: id })
        if (res.success) {
            setLists(res.response.List)
        }

    }

    const indexValue = (cell, row, index) => {
        return parseInt(index) + 1
    }

    const signout = () => {
        localStorage.clear()
        history.push('/')
        window.location.reload()
    }
  
    const AddTask=async(e)=>{
        e.preventDefault()
        let res=await addTask(form)
        if(res.success){
            toaster.show({message:res.message,intent:'success'})
            getTaskLists()
            setTaskModel(false)
        }
    }
    const changeStatus = async (e, row) => {
        if (e.target && e.target.checked == true) {
            let res = await editTaskdata({ deleted: row.deleted, name: row.name, completed: 1, taskId: row.taskId })
            if (res.success) {
                toaster.show({ message: "Status Marked Completed", intent: "success" })
            }
        } else {
            let res = await editTaskdata({ deleted: row.deleted, name: row.name, completed: 0, taskId: row.taskId })
            if (res.success) {
                toaster.show({ message: "Status Marked In-Progress", intent: "success" })
            }
        }
        getTaskLists()

    }

    const inputHandler = (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    const ActionUser = (cell, row) => {
        let checked = row.completed === 1 ? true : false
        return (<div style={{ textAlign: "center", display: "inline-block" }}>
            <label class="switch">
                <strong style={{ position: 'absolute', color: 'white', marginTop: '-30px', marginLeft: '-10px', textAlign: 'center', fontWeight: '100' }}></strong>
                <input type="checkbox" onClick={e => changeStatus(e, row)} checked={checked} />
                <span className="slider round"></span>
            </label>
        </div>
        )
    }

    const setstatus = (cell, row) => {
        //return <div>{row.status==true?<label><i class="fal fa-toggle-on"></i></label>:<label><i class="fal fa-toggle-off"></i></label>}</div>
        return row.completed === 1 ? 'Completed' : "In progress"
    }

    const customStyles = {
        content: {
            top: '50%',
            height: '600px',
            background: 'transprant',
            border: 'none',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const BackSide=()=>{
        window.history.back()
    }


    const columns = [
        {
            text: 'NO.', formatter: indexValue, headerStyle: () => {
                return
            }
        },

        {
            text: 'Task', dataField: 'name', headerStyle: () => {
                return
            }
        },
        {
            text: 'Status', formatter: setstatus, headerStyle: () => {
                return
            }
        },
        {
            text: 'Action', formatter: ActionUser, headerStyle: () => {
                return
            }
        },


    ];
    const { SearchBar } = Search;

    useEffect(() => {
        getTaskLists()
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <button style={{ width: '300px' }} onClick={signout}>Logout</button>
            <button style={{ width: '300px' }} onClick={e=>BackSide()}>Back</button>
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-9 mb-4 mx-auto">
                        <div className="col-md-12"><button className="add_blog btn btn-primary" onClick={e=>setTaskModel(true)}><i class="fa fa-plus" aria-hidden="true"></i>
                            Add Task</button></div>
                        <div className="card mb-3" style={{ marginTop: "50px" }}>
                            <div className="card-body" >
                                <div className="text-center mt-2 ">
                                </div>
                                <ToolkitProvider
                                    keyField="id"
                                    data={lists}
                                    columns={columns}
                                    search
                                >
                                    {
                                        props => (
                                            <div>
                                                <SearchBar {...props.searchProps} />
                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )
                                    }
                                </ToolkitProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={TaskModel}
                onRequestClose={e => setTaskModel(false)}
                //canOutsideClickClose={false}
                style={customStyles}
                transparent={true}
                ariaHideApp={false}
            >
                <div className="col-md-12">
                    <div className="card mb-3">
                        <h4 className="heading">Add Task</h4>
                        <div className="card-body">
                            <button className="btn btn-primary btn-sm float-right" style={{ width: "30px", position: "absolute", right: '5px', top: '5px', zIndex: '5' }} onClick={e => setTaskModel(false)}>X</button>
                            <form onSubmit={AddTask}>
                                <div className='row'>
                                <div className="col-md-12">
                                    <h6>Task</h6>
                                    <div className="custom-file mb-3">
                                        <input type="text" placeholder="Task Name" onChange={inputHandler} name="task" value={form.blogName} className="form-control" />
                                    </div>
                                </div>
                                <button type='submit' className="submit_btn text-center">Submit</button>
              </div>
          </form>
                    </div>
                </div>
        </div>
    </Modal>
        </div >
        
    );

}
export default UserTasks