import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities :Activity[]; // for passing down a variable to the function below
    selectedActivity : Activity | undefined;
    selectActivity: (id: string) => void; // takes id as input and selects void
    cancelSelectActivity:() => void; // takes no parameters and returns void
    editMode :boolean;
    openForm:(id: string) => void;
    closeForm:() => void;    
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities,selectedActivity, 
    selectActivity, cancelSelectActivity, editMode,
    openForm, closeForm, createOrEdit, deleteActivity}: Props){
    return(
        <Grid>
        <Grid.Column width='10' >
            {/* <List>
                {props.activities.map(activity => (
                <List.Item key={activity.id}>
                    {activity.title}
                    </List.Item>
                ))}
            
            </List> */}

            <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}/>
        </Grid.Column>
        <Grid.Column width={6}>
            {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}    
                    openForm={openForm}                
                />
            }          
          {editMode &&
            <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
        </Grid.Column>
        </Grid>
    )
}