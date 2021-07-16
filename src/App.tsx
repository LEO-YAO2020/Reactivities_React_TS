import Axios from 'axios';
import { Header,List } from 'semantic-ui-react'
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [activities,setActivities] =  useState([])
  useEffect(()=>{
    Axios.get('http://localhost:5000/api/activities').then(
      res=>{
        setActivities(res.data)
      }
    )
  },[])
  return (
    <div className="App">
      <Header as="h2" icon='users' content='Reactivities'/>
      <List>
        {activities.map((act:any)=>(
          <List.Item key={act.id}>
            {act.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
