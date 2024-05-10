import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

export default function Introduction({component}) {
    const [text, setText] = useState(component.text);
    // const handleTextChange = (e) => {
    //     setText(e.target.value);
    // }



    return (
        <div id='portfolio-introduction' style={component.styles}>
            <h1>Introduction</h1>
            {/* <p>{text}</p> */}
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue={text}
                value={text}
                variant="outlined"
                fullWidth
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    )
}