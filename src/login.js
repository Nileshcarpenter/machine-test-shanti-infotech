import React, { useEffect, useState } from 'react'
import { Dialog } from '@blueprintjs/core';
import {UserLogin } from './action/action'
import { useHistory } from 'react-router-dom'
import toaster from './toaster';
const Login = () => {
    const [form, setForm] = useState({email: '',password:''})
    const history = useHistory()
    const inputHandler = (e) => {
        const { value, name } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    const formSubmit = async (e) => {
      e.preventDefault()
      let res=await UserLogin(form)
      if(res.success){
        toaster.show({message:"you successfully loged In",intent:'success'})
        localStorage.clear();
        localStorage.setItem("Token", res.response.token);
        localStorage.setItem("UserRole", res.response.userRole);
        localStorage.setItem("UserID", res.response.userId);
          if(res.response.userRole==='user' && res.response.activeStatus===true){
          history.push('/user-deshboard')
        }else if(res.response.userRole==='admin' && res.response.activeStatus===true){
            history.push('/')
            window.location.reload()
        }
    }else{
        toaster.show({message:res.message,intent:'danger'})
       
    }
      }

    useEffect(()=>{
        
    },[])
    return (
                <div className="container-mx">
            <div className="main-body" style={{marginTop:"50px",textAlign:"center"}}>
                    <div className="col-md-9">
                        <div className="card mb-3">
                            <h4 className="heading">User Login</h4>
                            <div className="card-body">
                                <form autoComplete="off" onSubmit={formSubmit}>
                                    <div className="row">
                                        <div className="col-sm-12 text-secondary">
                                            <h6 className="mb-3">Email</h6>
                                            <input name="email" placeholder="Email" type="email" onChange={inputHandler} value={form.email} className="form-control" required/>
                                        </div>
                                        <div className="col-sm-12 text-secondary">
                                            <h6 className="mb-3">Password</h6>
                                            <input name="password" placeholder="Password" type="password" onChange={inputHandler} value={form.password} className="form-control" required/>
                                        </div>
                                        <label onClick={e=>history.push('/registration')} style={{cursor:'pointer'}}>Create New Account?</label>
                             
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
export default Login