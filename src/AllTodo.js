import React from 'react'
import ReactDOM from "react-dom";
import { useState, useEffect} from "react";
import { Route, Routes, Link } from 'react-router-dom';
import { useContext } from 'react';
import TodoContext from './TodoContext';

function AllTodos() {
    const a = useContext(TodoContext)
    console.log(a.name)
    const [newitem, setNewitem] = useState();
    const [list, setList] = useState([{task: "asd", done: "no", priority: "Low", due: "2023-07-31 09:00", id:0}, {task: "tas", done: "no", priority: "High", due: "2023-08-31 10:00", id:1}]);
    const [editfield, setEditfield] = useState("");
    const [editid, setEditid] = useState(-1);
    const [priorityinput, setPriorityinput] = useState();
    const [dateinput, setDateinput] = useState();
    const [timeinput, setTimeinput] = useState()
    const [htllist, setHtllist] = useState();
    const [lthlist, setLthlist] = useState();
    const [ntflist, setNtflist] = useState();
    const [ftnlist, setFtnlist] = useState();
    const [sortpicker, setSortpicker] = useState();
    const [lastid, setLastid] = useState(0);
    const [plist, setPlist] = useState([]);
    const [olist, setOlist] = useState([]);
    const [clist, setClist] = useState([]);

    useEffect(()=>{
      let new_list=list;
      console.log(new_list)
      setHtllist(new_list.slice().sort((a, b) => a.priority.localeCompare(b.priority)));
      setLthlist(new_list.slice().sort((a, b) => b.priority.localeCompare(a.priority)));
      setNtflist(new_list.slice().sort((a, b) => b.due.localeCompare(a.due)));
      setFtnlist(new_list.slice().sort((a, b) => a.due.localeCompare(b.due)));
      let currentDate = new Date();
      let currentYear = (currentDate.getFullYear()).toString();
      let currentMonth = (currentDate.getMonth() + 1).toString(); // Months are 0-based, so we add 1 to get the actual month (1 - 12)
      let currentDay = (currentDate.getDate()).toString();
      let currentHour = (currentDate.getHours()).toString();
      let currentMinute = (currentDate.getMinutes()).toString();
      if(currentMonth.length==1)  {currentMonth="0"+currentMonth;console.log(currentMonth);}
      if(currentDay.length==1)  {currentDay="0"+currentDay;console.log(currentDay);}
      const current=currentYear+"-"+currentMonth+"-"+currentDay+" "+currentHour+":"+currentMinute;
      console.log(current)
      setPlist(list.filter((ele)=>{
        return ele.due>current && ele.done=="no";
      }))
      setOlist(list.filter((ele)=>{
        return ele.due<current && ele.done=="no";
      }))
      setClist(list.filter((ele)=>{
        return ele.done=="yes";
      }))
    }, [list])

    useEffect(()=>{
      if(sortpicker=="htl"){setList(htllist);console.log(htllist)}
      if(sortpicker=="lth"){setList(lthlist)}
      if(sortpicker=="ntf"){setList(ntflist)}
      if(sortpicker=="ftn"){setList(ftnlist)}
    }, [sortpicker])

    useEffect(()=>{
      setLastid(list.length);
    },[])

    const donehandler = (id) => {
      let new_list=list;
      for(let i=0; i<new_list.length; i=i+1) {
        if(new_list[i].id==id) {
          new_list[i].done=new_list[i].done=="no" ? "yes" : "no"
        }
      }
      setList([...new_list])
    }


    const ListComponent = ({task, done, priority, due, id}) => {
      return (
        <>

          <div className="todo_item">
          <div className={done}>{task}</div>
          {done=="no" ? <button onClick={()=>donehandler(id)}>Mark done</button> : <button onClick={()=>donehandler(id)}>Mark undone</button>}
          <button onClick={()=>{
            setEditfield(task)
            setEditid(id);
            console.log(editid)
            console.log(htllist)
          }}>Edit</button>
          <button onClick={()=>{
            let new_list=list.filter((ele)=>{
              return ele.id!=id
            });
            setList([...new_list])
            console.log(new_list)
          }}>Delete</button>
          <div>{priority}</div>
          <div>{due}</div>
          </div>
        </>
      )
    }

    return (
      <>
      <h1>TODO LIST</h1>
      <div className="header">
      <div>
      <div className={editid==-1 ? "invis" : "vis"}>
      <input value={editfield} onChange={(e)=>setEditfield(e.target.value)}/>
      <button onClick={()=>{
        let new_list=list;
        //new_list[editid].task=editfield
        for(let i=0; i<new_list.length; i=i+1) {
          if(new_list[i].id==editid) {
            new_list[i].task=editfield
          }
        }
        console.log(new_list)
        setList([...new_list])
        setEditid(-1)
      }}>Edit</button>
      </div>
      <input value={newitem} onChange={(e)=>setNewitem(e.target.value)}/>
      <select value={priorityinput} onChange={(e)=>setPriorityinput(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
      </select>
      <input
            type="date"
            id="datePicker"
            value={dateinput}
            onChange={(e)=>setDateinput(e.target.value)}
      />
      <input
            type="time"
            id="timePicker"
            value={timeinput}
            onChange={(e)=>setTimeinput(e.target.value)}
      />
      <button onClick={()=>{
        let x=lastid;
        x++;
        {if(timeinput.length==9) {
          timeinput=timeinput.slice(0, 8)+"0"+timeinput.slice(8)
        }}
        setList((prev)=>{return [...prev, {task: newitem, done: "no", priority: priorityinput, due: `${dateinput} ${timeinput}`, id: lastid}]});
        setNewitem("")
        console.log(dateinput);
        setLastid(x);
      }}>Add</button>
      </div>
      <div className="filter">
      <select value={sortpicker} onChange={(e)=>setSortpicker(e.target.value)}>
          <option value="">Sort by</option>
          <option value="lth">Priority: Low to High</option>
          <option value="htl">Priority: High to Low</option>
          <option value="ntf">Due: Near to Far</option>
          <option value="ftn">Due: Far to Near</option>
          <option value="overdue">Overdue Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="complete">Completed Tasks</option>
      </select>
      </div>
      </div>
      <div className="activity">
      <div className={sortpicker=='complete' ? "vis" :"invis"}>
          <h2>Completed Tasks</h2>
          {clist.length==0 ? <h3>None</h3> :
          <div>
          {
          [...clist].map((list_item, i) => (
            <ListComponent key={i} {...list_item}/>
          ))
          }
          </div>
          }
        </div>
        <div className={sortpicker=='pending' ? "vis" :"invis"}>
          <h2>Pending Tasks</h2>
          {plist.length==0 ? <h3>None</h3> :
          <div>
          {
          [...plist].map((list_item, i) => (
            <ListComponent key={i} {...list_item}/>
          ))
          }
          </div>
          }
        </div>
        <div className={sortpicker=='overdue' ? "vis" :"invis"}>
          <h2>Overdue Tasks</h2>
          {olist.length==0 ? <h3>None</h3> :
          <div>
          {
          [...olist].map((list_item, i) => (
            <ListComponent key={i} {...list_item}/>
          ))
          }
          </div>
          }
        </div>
      </div>
      <h2>List</h2>
      <div className="todo_container">
      {/*{list.map((e, i)=>(
          <div className="todo_item">
          <div className={e.done}>{e.task}</div>
          {e.done=="no" ? <button onClick={()=>donehandler(i)}>Mark done</button> : <button onClick={()=>donehandler(i)}>Mark undone</button>}
          <button onClick={()=>{
            setEditfield(e.task)
            setEditid(i);
          }}>Edit</button>
          <button onClick={()=>{
            let new_list=list;
            new_list.splice(i,1)
            console.log(new_list)
            setList([...new_list])
          }}>Delete</button>
          <div>{e.priority}</div>
          <div>{e.due}</div>
          </div>
        ))}*/}
        {
          [...list].map((list_item, i) => (
            <ListComponent key={i} {...list_item}/>
          ))
        }
      </div>
      </>
    );
}

export default AllTodos
