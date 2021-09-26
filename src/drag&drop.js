import React, { Component } from 'react';
import './App.css';
import {getTaskList,editTaskdata} from './action/action'
import toaster from './toaster';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: []
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = async(ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       let tasks = this.state.tasks.filter((task)=>parseInt(task.taskId)===parseInt(id))
       //console.log('888888888',tasks)
       let res=await editTaskdata({name:tasks[0].name,completed:cat,taskId:tasks[0].taskId,deleted:tasks[0].deleted})
       if(res.success){
          toaster.show({ message: "Task dropped", intent: "success" })
       }
       this.getTaskLists()
    //    this.setState({
    //        ...this.state,
    //        tasks
    //    });
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

     getTaskLists = async () => {
        let res = await getTaskList()
        let array=[]
        if (res.success) {
            for(let x in res.response.List){
               let obj={}
               obj.name=res.response.List[x].name
               obj.completed=res.response.List[x].completed===0?'todo':'done'
               obj.taskId=res.response.List[x].taskId
               obj.deleted=res.response.List[x].deleted
               array.push(obj)
            }
            this.setState({tasks:array})
            //setLists(res.response.List)
        }

    }
    
     signout = () => {
        localStorage.clear()
        this.props.history.push('/')
        window.location.reload()
    }
    Backside=()=>{
    window.history.back()
    }

    componentDidMount(){
        this.getTaskLists()
    }

    render() {
        var tasks = {
            todo: [],
            done: []
        }
   
      //  console.log(tasks)

    this.state.tasks.forEach ((t) => {
        tasks[t.completed].push(
            <div key={t.name} 
                onDragStart = {(e) => this.onDragStart(e, t.taskId)}
                draggable
                className="draggable"
                >
                {t.name}
            </div>
        );
    });

        return (
            <div><button style={{ width:'300px' ,marginLeft:99}} onClick={this.signout}>Logout</button>
            <button style={{ width:'300px' ,marginLeft:99}} onClick={this.Backside}>Back to See List</button>
            <div className="container-drag">
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div className="todo"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, 0)}}>
                    <span className="task-header">To-Do List</span>
                    {tasks.todo}
                </div>
                <div className="droppable" 
                    onDrop={(e)=>this.onDrop(e, 1)}
                    onDragOver={(ev)=>this.onDragOver(ev)}>
                    <span className="task-header">COMPLETED</span>
                    {tasks.done}
                </div>
              </div>
            </div>
        );
    }
}