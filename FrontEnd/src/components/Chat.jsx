import React, { useState,  } from 'react';
import { TextField } from "@mui/material"

export default function Chat() {
    const [inputText, setInputText] = useState('');
    // const [response, setResponse] = useState('');
    const [messages, setMessages] = useState([{ai: "As a AI Language Model, I can provide you feed back on your resume."}]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const newMessage = inputText.trim();
            if (newMessage !== '') {
                setMessages([...messages, {user: newMessage}, {ai: "Great Question! Here is how....."}]);
                setInputText('');
            }
        }
    };

    return (
        <div id="chat_outermost">
            <h1>AI assistant</h1>
            <div id="chat_messages_container">
                {messages.map((message, index) => (
                    <React.Fragment key={index}>
                        {message.user && (
                            <div className="UserMessageRow">
                                <div className="UserMessage">{message.user}</div>
                            </div>
                        )}
                        {message.ai && (
                            <div className="AiMessageRow">
                                <div className="AiMessage">{message.ai}</div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div id="chat_input_container">
                <TextField
                    id="chat_input"
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={1}  // Set the initial number of rows
                    maxRows={5}  // Set the maximum number of rows
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                        fontSize: ".5em",
                        "& textarea": {
                            scrollbarWidth: "thin",
                            "&::-webkit-scrollbar": {
                                width: "6px",
                                height: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(192, 192, 192, 0.5)", // Light grey with 50% opacity
                                borderRadius: "3px",
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}
