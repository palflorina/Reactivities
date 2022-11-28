import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity []>([]);
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] =useState(false);

  useEffect(() => {
    axios.get<Activity []>('http://localhost:5000/api/activities').then(response =>{
      
      setActivities(response.data);
    })
  },[])
  function handleSelectActivity ( id: string)
  {
    setSelectedActivity(activities.find(x => x.id === id));
  }
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id ? handleSelectActivity(id) :handleCancelSelectActivity();
    setEditMode(true);

  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity : Activity)
  {
    activity.id?
     setActivities([...activities.filter(x => x.id !== activity.id), activity]): // if we have an activity id we loop over all the activities and filter out the activity we are updating and replacing with the activity passsed into the function
     setActivities([...activities, {...activity, id: uuid()}]) // in case we don't have an activity id, add a new activity to the activities array

     setEditMode(false);
     setSelectedActivity(activity);

  }

  function handleDeleteActivity(id : string){
    setActivities([...activities.filter(x => x.id !== id)])
  }
  return (
    < > //fragment or div so that we can return multiple elements
     <NavBar openForm ={handleFormOpen}/>
       <Container style = {{marginTop : '7em'}}>
        <ActivityDashboard 
            activities ={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
