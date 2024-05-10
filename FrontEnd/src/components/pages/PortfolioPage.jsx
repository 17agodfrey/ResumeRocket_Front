import "../../styles/PortfolioPage.css";
// import LeftBarPortfolio from "../LeftBarPortfolio.jsx";
import { Button } from '@mui/material/';
import openAI_Icon from '../../assets/openAI.jpg';
import linkIcon from '../../assets/link.png';
import SaveIcon from '@mui/icons-material/Save'; // Import the Save icon component
import penToSquareIcon from '../../assets/pen-to-square-solid.svg';
import arrangeIcon from '../../assets/arrange.png';
import templatesIcon from '../../assets/templates.png';
import { useState, useEffect } from 'react';
import AddSectionContent from "../portfolio-menu_content/AddSectionContent";
import LayoutsContent from "../portfolio-menu_content/LayoutsContent";
import PortfolioContent from "../PortfolioContent";
import * as ph from "../../utils/portfolioHelpers"
import { useApi } from "../../hooks";

function LeftMenu({handleLayoutSelected, handlePortfolioContentChange, handleSavePortfolioContent}) {

    const [showPopout, setShowPopout] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null);

    const menuButtonClicked = (buttonID) => {

        if(buttonID === "save") {
            handleSavePortfolioContent();
            return;
        }

        if (buttonID === "add" || buttonID === "layouts") {
            if(showPopout){
                if(selectedButton === buttonID){
                    setShowPopout(false);
                    setSelectedButton(null);
                    return;
                }
                setSelectedButton(buttonID);
                return;
            }
            setShowPopout(!showPopout); // Toggle the showPopout state
            // if (showPopout) {
            //     setShowPopout(false);
            // } else {    
            //     setShowPopout(true);
            // }
        }


        setSelectedButton(buttonID);
    }



    return (
        <>
            <div id="portfolio-left_menu_buttons_container">
                <Button onClick={() => menuButtonClicked("add")} id="add_section_button" className="portfolio-left_button" sx={{ color:'black', textTransform:'none', padding: '0'}}>
                    <img src={penToSquareIcon} alt="Add section" />
                    <p>Add section</p>
                </Button>
                <Button onClick={() => menuButtonClicked("arrange")} id="arrange_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={arrangeIcon} alt="Rearange" />
                    <p>Rearange</p>
                </Button>
                <Button onClick={() => menuButtonClicked("layouts")} id="layouts_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={templatesIcon} alt="Layouts" />
                    <p>Layouts</p>
                </Button>
                <Button onClick={() => menuButtonClicked("ai")} id="ai_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={openAI_Icon} alt="OpenAI" />
                    <p>AI assistant</p>
                </Button>
                <Button onClick={() => menuButtonClicked("link")} id="share_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <img src={linkIcon} alt="Share" />
                    <p>Share</p>
                </Button>
                <Button onClick={() => menuButtonClicked("save")} id="save_button" className="portfolio-left_button" sx={{color:'black', textTransform:'none', padding: '0'}}>
                    <SaveIcon />
                    <p>Save</p>
                </Button>
            </div>
            {showPopout && selectedButton === "add" && (
            <div id="portfolio-popout_section" >
                <AddSectionContent 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                />
            </div>
            )}
            {showPopout && selectedButton === "layouts" && (
            <div id="portfolio-popout_section" >
                <LayoutsContent 
                    handleLayoutSelected={handleLayoutSelected} 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                />
            </div>
            )}
        </>
    )
}



export default function PortfolioPage() {
    const api = useApi();

    const [selectedLayout, setSelectedLayout] = useState(null);
    const handleLayoutSelected = (layout) => {
        setSelectedLayout(layout);
    };

    const [portfolioContent, setPortfolioContent] = useState({});
    const handleSavePortfolioContent = () => {
        const content = portfolioContent
        // console.log("final content from handlePortfolioContentChange, stringified:", JSON.stringify(content))
        api.post(
            "/portfolio", 
            {"content": JSON.stringify(content)}
        ).then(response => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log("data from handlePortfolioContentChange:", data)
                    // setPortfolioContent(data.result.content);
                    alert("Portfolio saved successfully!"); // Show an alert
                });
            } else {
                console.error("Failed to update portfolio content:", response);
            }
        })        
    }
    // I think there's a better way to do this, with the .then callback and whatnot
    // (Austin)-> see pony express chats page for example, or devexpo listing users 
    useEffect(() => {
        const fetchPortfolioContent = async () => {
            try {
                const response = await api.get("/portfolio/details");
                if (response.ok) {
                    response.json().then((data) => {
                        console.log("data from fetchPortfolioContent:", data)
                        console.log("data.result.content:", JSON.parse(data.result.content))
                        setPortfolioContent(JSON.parse(data.result.content));
                    });
                } else {
                    console.error("Failed to fetch portfolio content:", response);
                }
            } catch (error) {
                console.error("Failed to fetch portfolio content:", error);
            }
        };

        fetchPortfolioContent();
    }, []); // Empty dependency array to only run once on mount


    const handlePortfolioContentChange = (content) => {
        content = ph.formatNewContent(portfolioContent, content);
        // console.log("new content from handlePortfolioContentChange:", content)
        // console.log("old content from handlePortfolioContentChange:", portfolioContent)
        // content = {
        //     ...portfolioContent,
        //     ...content
        // }
        // console.log("final content from handlePortfolioContentChange:", content)
        // // console.log("final content from handlePortfolioContentChange, stringified:", JSON.stringify(content))
        // api.post(
        //     "/portfolio", 
        //     {"content": JSON.stringify(content)}
        // ).then(response => {
        //     if (response.ok) {
        //         response.json().then((data) => {
        //             console.log("data from handlePortfolioContentChange:", data)
        //             // setPortfolioContent(data.result.content);
        //         });
        //     } else {
        //         console.error("Failed to update portfolio content:", response);
        //     }
        // })

        setPortfolioContent(prevContent => {
            // content = ph.formatNewContent(prevContent, content);
            // console.log("from portfolio page, new content:", content)
            // console.log("from portfolio page, prev content:", prevContent)
            return {
                ...prevContent,
                ...content
            };
        });
    };
    

    // console.log(selectedLayout)
    // console.log(newPortfolioContent)
    // console.log(portfolioContent)
    
    return (
        <div id='PortfolioPage_content'>
            <div id='portfolio_left_menu_section'>
                <LeftMenu 
                    handleLayoutSelected={handleLayoutSelected} 
                    handlePortfolioContentChange={handlePortfolioContentChange}
                    handleSavePortfolioContent={handleSavePortfolioContent}
                />
            </div>
            <div id="portfolio-backdrop">
                <div id="portfolio-actual">
                    <PortfolioContent 
                        portfolioContent={portfolioContent}
                    />
                </div>
            </div>
        </div>
    )
}