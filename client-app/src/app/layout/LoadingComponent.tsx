import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";


interface Props{
    inverted?: boolean; // ? is for optional
    content: string;
}
export default function LoadingComponent({inverted = true, content ='Loading...'}: Props){
    return(
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>

    )
}