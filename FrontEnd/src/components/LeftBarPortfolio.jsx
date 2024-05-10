import {Card, Button} from '@mui/material/';
import openAI_Icon from '../assets/openAI.jpg';
import linkIcon from '../assets/link.png';
import penToSquareIcon from '../assets/pen-to-square-solid.svg';
import arrangeIcon from '../assets/arrange.png';
import templatesIcon from '../assets/templates.png';



import '../styles/LeftBarPortfolio.css'



export default function LeftBarPortfolio() {
    return (
        <Card className='leftBarPortfolio' sx={{
            width: 'fit-content',
            }}
        >
            <Button
                variant='text'
                startIcon={<img src={penToSquareIcon} alt="Add section" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                Add section
            </Button>
            <Button
                variant='text'
                startIcon={<img src={arrangeIcon} alt="Rearange" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                Rearange                
            </Button>
            <Button
                variant='text'
                startIcon={<img src={templatesIcon} alt="Templates" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid black',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                Templates
            </Button>                                    
            <Button
                variant='text'
                startIcon={<img src={openAI_Icon} alt="AI assistant" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderBottom: '1px solid black',
                    color: 'black',
                    textTransform: 'none',
                }}
            >
                AI assistant
            </Button>
            <Button
                variant='text'
                startIcon={<img src={linkIcon} alt="Share" />}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '10px 15px',
                    color: 'black',
                    textTransform: 'none',
                }}                
            >
                Share
            </Button>
        </Card>
    )
}