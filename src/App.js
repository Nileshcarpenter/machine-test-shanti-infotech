import React, { useEffect, useState } from 'react'
import { Dialog } from '@blueprintjs/core';
import {RegisterUser } from './action/action'
import { useHistory } from 'react-router-dom'
import toaster from './toaster';

const AddUser = () => {
    const [form, setForm] = useState({ name: '', email: '',password:'',dob:'',designation:'' })
    const history = useHistory()
    const inputHandler = (e) => {
        const { value, name } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    const formSubmit = async (e) => {
      e.preventDefault()
      let res=await RegisterUser(form)
      if(res.success){
        toaster.show({message:"your registration successfully done",intent:'success'})
        history.push('/')
      }
      }

    useEffect(()=>{
        
    },[])
    return (
                <div className="container-mx">
                    
            <div className="main-body" style={{marginTop:"50px",textAlign:"center"}}>
                    <div className="col-md-9">
                        <div className="card mb-3">
                            <h4 className="heading">User Registration</h4>
                            <div className="card-body">
                                <form autoComplete="off" onSubmit={formSubmit}>
                                    <div className="row">

                                        <div className="col-sm-6 text-secondary">
                                            <h6 className="mb-3">Name</h6>
                                            <input name="name" placeholder="First Name" type="text" onChange={inputHandler} value={form.name} className="form-control" required/>
                                        </div>
                                        <div className="col-sm-6 text-secondary">
                                            <h6 className="mb-3">Email</h6>
                                            <input name="email" placeholder="Email" type="email" onChange={inputHandler} value={form.email} className="form-control" required/>
                                        </div>
                                        <div className="col-sm-6 text-secondary">
                                            <h6 className="mb-3">Password</h6>
                                            <input name="password" placeholder="Password" type="password" onChange={inputHandler} value={form.password} className="form-control" required/>
                                        </div>
                                        <div className="col-sm-6 text-secondary">
                                            <h6 className="mb-3">Date of Birth</h6>
                                            <input name="dob" placeholder="Password" type="date" onChange={inputHandler} value={form.dob} className="form-control" required/>
                                        </div>
                                        <div className="col-sm-6 text-secondary">
                                            <h6 className="mb-3">Designation</h6>
                                            <input name="designation" placeholder="Designation" type="text" onChange={inputHandler} value={form.designation} className="form-control" required/>
                                        </div>
                                        <div className="col-md-12"><button className="submit_btn text-center" type='submit'>Submit</button></div>
                               </div>
                                </form>
                                {/* <hr />
               <br/>
               <div className="row">
                    <div className="col-md-12"><button className="submit_btn text-center">Submit</button></div>
                  </div> */}
                            </div>
                        </div>
                   
                </div>
            </div>

        </div>

            
        
    )
}
export default AddUser