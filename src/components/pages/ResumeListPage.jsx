import "../../styles/ResumeListPage.css";
import {Card, CardContent, Typography, TextField, Menu, MenuItem, Button} from '@mui/material/';
import { Link } from 'react-router-dom';
import addIcon from '../../assets/add.png';
import { useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useApi } from "../../hooks";
import { ClipLoader } from 'react-spinners'; 


export default function ResumeListPage() {

    const navigate = useNavigate(); // note, there is another thing called redirect that is supposdely better for loaders
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openSavedResumes, setOpenSavedResumes] = useState(false);

    const [data, setData] = useState([]); // Store fetched data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const api = useApi();

    const [isValidForm, setIsValidForm] = useState(false);
    const [isValidFile, setIsValidFile] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadResumeButtonContent, setUploadResumeButtonContent] = useState('Choose Resume')
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [listingURL, setListingURL] = useState('');

    const validateUrl = (url) => {
        const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        return re.test(String(url).toLowerCase());
    };

    // Function to handle email input changes
    const handleUrlChange = (event) => {
        const newUrl = event.target.value;
        setListingURL(newUrl);
        setIsValidUrl(validateUrl(newUrl));

        if(isValidUrl && isValidFile)
        {
            setIsValidForm(true)
        }
        else
        {
            setIsValidForm(false)
        }
    };

    const handleFileChange = (file) =>
    {
        setFile(file)
        setIsValidFile(true);

        if(isValidUrl && isValidFile)
        {
            setIsValidForm(true)
        }
        else
        {
            setIsValidForm(false)
        }
    }


    const handleSubmit = (event) => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('Data', JSON.stringify({ Url: listingURL }));

        setIsLoading(true);
        console.log('formData', formData)
        api.postFileForm("/job/postings", formData)
        .then(response => {
            loadJobs();
          })
    }

    const loadJobs = () => {
        setIsLoading(true)

        api.get("/job/postings")
        .then(response => response.json())
        .then(data => {
            setData(data.result);
            setIsLoading(false);

            setUploadResumeButtonContent('Choose Resume')
            setListingURL('')
            setFile(null)
            setIsValidUrl(false)
            setIsValidFile(false);
            setIsValidForm(false);
        })
        .catch(error => {
            console.error("Failed to fetch data:", error);
            setError(error.message);
            setIsLoading(false);
        });
    }

    const handleChooseResumeButtonClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleChooseResumeClose = (action) => {

        switch (action) {
            case 'from saved resumes':
                // Handle "From saved resumes" action
                setOpenSavedResumes(true);
                break;
            case 'upload resume': {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx,.txt';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    handleFileChange(file)
                    setUploadResumeButtonContent(file.name)
                    console.log('Uploaded file:', file);
                };
                input.click();
                setAnchorEl(null);
                break;
            
            }
            default:
                setAnchorEl(null);
                break;
        }
    };

    const handleCreateResumeButtonClick = () => {
        // validate the listing URL
        // validate that they have choosen a resume option

        // if valid, navigate to create resume page
        console.log('Create Resume button clicked')
        return navigate('/create-resume');

    }

    useEffect(() => {
        loadJobs()
    }, []); 

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader size={150} color={"#123abc"} loading={isLoading} />
        </div>;
    };

    if (error) return <div>Error: {error}</div>;

    const resumes = [
        {
            id: 1,
            name: 'Resume A',
            content: 'Content of Resume A'
        },
        {
            id: 2,
            name: 'Resume B',
            content: 'Content of Resume B'
        },
        {
            id: 3,
            name: 'Resume C',
            content: 'Content of Resume C'
        },
        {
            id: 4,
            name: 'Resume D',
            content: 'Content of Resume D'
        }
    ];

    return (
        <div id='ResumeList_content'>
            <div id="resume_entry_list">
                <div id="resume_entry_list_header">
                    <h2>Applied date</h2>
                    <h2>Company</h2>
                    <h2>Position</h2>
                    <h2>Status</h2>
                    <h2>Resume</h2>
                </div>
                {data.map((result) => (
                    <Card key={result.id} style={{ cursor: 'pointer' }}>
                        <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 1fr)',
                            }}
                        >
                            <Typography align='center'>{new Date(result.applyDate).toLocaleDateString()}</Typography>
                            <Typography align='center'>{result.companyName}</Typography>
                            <Typography align='center'>{result.position}</Typography>
                            <Typography align='center'>{result.status}</Typography>
                            <Link to={`/create-resume/${result.resumeID}`}  align='center'>
                                { result.resumeContent['FileName']}
                            </Link>
                        </CardContent>
                    </Card>
                ))}
                
                <Card sx={{marginTop:'3em'}}> 
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'end',
                            gap: '30px'
                        }}
                    >
                        <Typography 
                        display='flex' 
                        flexDirection='row'
                        marginLeft='10px'
                        >
                            <Button
                                id="create_resume_button"
                                sx={{padding:'0', gap:'5px'}}
                                onClick={handleCreateResumeButtonClick}
                            >
                                <img id='create_resume_button' src={addIcon} alt="create resume from job listing button" style={{ width: 20, height: 20 }} />   
                                Create Resume
                            </Button>

                        </Typography>
                        <div style={{ display:'flex', flexDirection:'column', justifyContent:'end'}}>
                            <Button
                                id="choose_resume_button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleChooseResumeButtonClick}
                                sx={{padding:'0'}}
                            >
                                {uploadResumeButtonContent}
                            </Button>   
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleChooseResumeClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >        
                                {!openSavedResumes &&
                                <>
                                    <MenuItem onClick={() => handleChooseResumeClose('from saved resumes')}>From saved resumes</MenuItem>
                                    <MenuItem onClick={() => handleChooseResumeClose('upload resume')}>Upload resume</MenuItem>
                                </>
                                }

                                {openSavedResumes &&
                                <>
                                    <MenuItem onClick={() => setOpenSavedResumes(false)}>
                                        <ArrowBackIcon />
                                    </MenuItem>
                                    {resumes.map((resume) => (
                                        <MenuItem key={resume.id} onClick={() => handleChooseResumeClose('resume selected')}>{resume.name}</MenuItem>
                                    ))}
                                </>
                                }
                            </Menu>                                             
                        </div>
                        <TextField
                        label="Enter job listing URL"
                        variant="standard"
                        onInput={handleUrlChange}
                        onPaste={handleUrlChange}
                        marginTop='0px'
                        sx={{width: '40%'}}
                        />  

                        <Button
                            disabled={!isValidForm}
                            id="Submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button> 
                    </CardContent>
  
                </Card>            
            </div>
        </div>
    )
}