import React, { Component, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { userList, updateUserStatus, RegisterUser,deleteUser } from './action/action'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useHistory } from 'react-router-dom'
import toaster from './toaster';
import Modal from 'react-modal';

const AdminDeshboard = () => {
    const [lists, setLists] = useState([])
    const [adduserModel, setadduserModel] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '', dob: '', designation: '' })
    const history = useHistory()

    const getUserList = async () => {
        let res = await userList()
        if (res.success) {
            setLists(res.response)
        }

    }
    const inputHandler = (e) => {
        const { value, name } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    const statustoggle = async (e, row) => {
        if (e.target && e.target.checked == true) {
            let res = await updateUserStatus({ userId: row.userId, status: e.target.checked })
            if (res.success) {
                toaster.show({ message: "User Activated", intent: "success" })
            }
        } else {
            let res = await updateUserStatus({ userId: row.userId, status: e.target.checked })
            if (res.success) {
                toaster.show({ message: "User DeActivated", intent: "success" })
            }
        }
        getUserList()

    }

    const indexValue = (cell, row, index) => {
        return parseInt(index) + 1
    }

    const signout = () => {
        localStorage.clear()
        history.push('/')
        window.location.reload()
    }

  const deleteUsers=async(Id)=>{
   let res=await deleteUser({userId:Id})
    if(res.success){
        toaster.show({message:res.message,intent:"success"})
        getUserList()
    }
  }

    const ActionUser = (cell, row) => {
        return (<span>
            <button className='btn btn-primary' onClick={() => history.push('/user-tasks/' + row.userId)} ><i class="fa fa-eye">view</i></button>
            <button className='btn btn-primary' onClick={(e) =>deleteUsers(row.userId)} ><i class="fa fa-eye">Delete</i></button>
        </span>
        )
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


    const AddUser = async (e) => {
        e.preventDefault()
        let res = await RegisterUser(form)
        if (res.success) {
            toaster.show({ message: "your added successfully", intent: 'success' })
            getUserList()
            setadduserModel(false)
        }

    }


    const setstatus = (cell, row) => {
        //return <div>{row.status==true?<label><i class="fal fa-toggle-on"></i></label>:<label><i class="fal fa-toggle-off"></i></label>}</div>
        return <div style={{ textAlign: "center", display: "inline-block" }}>
            <label class="switch">
                <strong style={{ position: 'absolute', color: 'white', marginTop: '-30px', marginLeft: '-10px', textAlign: 'center', fontWeight: '100' }}></strong>
                <input type="checkbox" onClick={e => statustoggle(e, row)} checked={row.activeStatus} />
                <span className="slider round"></span>
            </label>
        </div>
    }



    const columns = [
        {
            text: 'NO.', formatter: indexValue, headerStyle: () => {
                return
            }
        },

        {
            text: 'User Name', dataField: 'name', headerStyle: () => {
                return
            }
        },
        {
            text: 'Email', dataField: 'email', headerStyle: () => {
                return
            }
        },
        {
            text: 'Date of Birth', dataField: 'dob', headerStyle: () => {
                return
            }
        },
        {
            text: 'Designation', dataField: 'designation', headerStyle: () => {
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
        getUserList()
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <button style={{ width: '600px' }} onClick={signout}>Logout</button>
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-9 mb-4 mx-auto">
                        <div className="col-md-12"><button className="add_blog btn btn-primary" onClick={e => setadduserModel(true)}><i class="fa fa-plus" aria-hidden="true"></i>
                            Add User</button></div>
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
                isOpen={adduserModel}
                onRequestClose={e => setadduserModel(false)}
                //canOutsideClickClose={false}
                style={customStyles}
                transparent={true}
                ariaHideApp={false}
            >
                <div className="col-md-12">
                    <div className="card mb-3">
                        <h4 className="heading">Add Task</h4>
                        <div className="card-body">
                            <button className="btn btn-primary btn-sm float-right" style={{ width: "30px", position: "absolute", right: '5px', top: '5px', zIndex: '5' }} onClick={e => setadduserModel(false)}>X</button>
                            <form autoComplete="off" onSubmit={AddUser}>
                                <div className="row">

                                    <div className="col-sm-6 text-secondary">
                                        <h6 className="mb-3">Name</h6>
                                        <input name="name" placeholder="First Name" type="text" onChange={inputHandler} value={form.name} className="form-control" required />
                                    </div>
                                    <div className="col-sm-6 text-secondary">
                                        <h6 className="mb-3">Email</h6>
                                        <input name="email" placeholder="Email" type="email" onChange={inputHandler} value={form.email} className="form-control" required />
                                    </div>
                                    <div className="col-sm-6 text-secondary">
                                        <h6 className="mb-3">Password</h6>
                                        <input name="password" placeholder="Password" type="password" onChange={inputHandler} value={form.password} className="form-control" required />
                                    </div>
                                    <div className="col-sm-6 text-secondary">
                                        <h6 className="mb-3">Date of Birth</h6>
                                        <input name="dob" placeholder="Password" type="date" onChange={inputHandler} value={form.dob} className="form-control" required />
                                    </div>
                                    <div className="col-sm-6 text-secondary">
                                        <h6 className="mb-3">Designation</h6>
                                        <input name="designation" placeholder="Designation" type="text" onChange={inputHandler} value={form.designation} className="form-control" required />
                                    </div>
                                    <div className="col-md-12"><button className="submit_btn text-center" type='submit'>Submit</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );

}
export default AdminDeshboard