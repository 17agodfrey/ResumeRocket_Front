import "../../styles/CreateResume.css";
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LeftBarResume from '../LeftBarResume.jsx';
import { Card, CardContent, Dialog} from '@mui/material/';
import Chat from '../Chat.jsx';
import { useApi } from "../../hooks";
import Bubble from "../Effects/Bubble.jsx"

function ShareDialog(props) {

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div id='share_dialog_content'>
                <input type='text' value='https://resumerocket.com/username/resume'/>
            </div>
        </Dialog>
    )
}

ShareDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };


export default function CreateResume() {

    let { id } = useParams();
    const api = useApi();

    const [pdf, setpdf] = useState(null);
    const iframeRef = useRef(null);
    const [targetRect, setTargetRect] = useState(null);

    
    const handleResize = () => {
        if (iframeRef.current) {
          setTargetRect(iframeRef.current.getBoundingClientRect());
        }
      };
      
    const loadPage = () => 
    {
        if(id !== undefined)
        {
            api.get(`/job/postings/${id}`)
            .then(response => response.json())
            .then(data => {
                setpdf(data.result);

                setTimeout(() => {
                    handleResize();
                  }, 100); 
            })
            .catch(error => {
                console.error("Failed to fetch data:", error);
                setError(error.message);
                setIsLoading(false);
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize()
    
        return () => window.removeEventListener('resize', handleResize);
    }

    useEffect(() => {
        loadPage()
    }, []); 

    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);

    const handleShareDialogOpen = () => {
        setShareDialogOpen(true);
    }   

    const handleShareDialogClose = () => {
        setShareDialogOpen(false);
    }

    const handleChatOpen = () => {
        setChatOpen(!chatOpen);
    }

    const handleVersionHistoryOpen = () => {
        setVersionHistoryOpen(!versionHistoryOpen);
    }

    return (
        <div id='CreateResume_content' 
        className=
            {versionHistoryOpen && chatOpen ? "versionHistoryOpen_chatOpen" : 
            versionHistoryOpen ? "versionHistoryOpen" : 
            chatOpen ? "chatOpen" : ""}
        >
            <div id='left_menu_section'>
                <LeftBarResume 
                    handleShareDialogOpen={handleShareDialogOpen} 
                    handleChatOpen={handleChatOpen} 
                    handleVersionHistoryOpen={handleVersionHistoryOpen}
                />
                {chatOpen && <Chat/>}
            </div>

            <div id='resume_section'>

                {!versionHistoryOpen &&
                    <Card className="ResumeFull" sx={{}}>
                        {pdf && <CardContent>
                            <iframe id="resumePDFViewer" ref={iframeRef}
                                src={`data:application/pdf;base64,${pdf["resumeContent"]["FileBytes"]}#toolbar=0&navpanes=0`}
                                width="100%"
                                height="1058px"
                                style={{ border: 'none' }}
                                title="PDF Viewer"
                                scrolling="no"
                            />

                            { pdf["resumeContent"]["Reccomendations"].split('\n').slice(0,5).map((result, index) => (
                                <Bubble key={ pdf.ResumeId + '_index' + index} content={result} index={index+1} targetRect={iframeRef} />
                            ))}

                        </CardContent> }
                    </Card>                
                }

                {versionHistoryOpen && 
                    <>
                        <Card className="ResumeSmaller" sx={{}}>
                            <CardContent>
                                pretend this is a version history okay
                            </CardContent>
                        </Card>
                        <Card className="ResumeSmaller" sx={{}}>
                            <CardContent>
                                pretend this is a version history okay
                            </CardContent>
                        </Card>                
                    </>
                }
            </div>
            <ShareDialog open={shareDialogOpen} onClose={handleShareDialogClose}/>
            <div id="col3">
                {[...Array(6).keys()].map((num) => (
                    versionHistoryOpen && <div key={num} className="version_block">Version {num + 1}</div>
                ))}
                {versionHistoryOpen && <div className="version_block">Original</div>}
            </div>


        </div>
    )
}