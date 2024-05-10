import "../../styles/Portfolio-LeftMenuContent.css";
import { useState, useRef, useEffect } from "react";



export default function AddSectionContent({handlePortfolioContentChange}) {
    const [selectedButton, setSelectedButton] = useState(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const imageRef = useRef(null);


  
    useEffect(() => {
      const createNewPortfolioContent = () => {
          handlePortfolioContentChange({
            component: {
              type: selectedButton.replace("_button", ""),
              position: { x: imagePosition.x, y: imagePosition.y },
            },
          });
      };

      if (isMouseDown) {
        const onMouseMove = (e) => {
          setImagePosition({ // this centers the image on the mouse
            x: e.pageX - imageSize.width / 2,
            y: e.pageY - imageSize.height / 2
          });
        };
        const onMouseUp = () => {
          setIsMouseDown(false);
          createNewPortfolioContent();
          setSelectedButton(null);
          document.body.style.userSelect = ""; // Re-enable text selection
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
        document.body.style.userSelect = "none"; // ;Disable text selection
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => { // this will only be called when the component unmounts or isMouseDown or imageSize changes
          document.body.style.userSelect = ""; // Re-enable text selection
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
      }
    }, [isMouseDown, setIsMouseDown, imageSize, selectedButton, handlePortfolioContentChange, imagePosition])
  
    const buttonDown = (e) => {
        const button = e.target;
        setSelectedButton(button.id);
        setIsMouseDown(true);
        const buttonRect = button.getBoundingClientRect();
        setImageSize({
          width: buttonRect.width,
          height: buttonRect.height
        });
        // Reset image position when a button is clicked
        setImagePosition({
            x: e.pageX - buttonRect.width / 2,
            y: e.pageY - buttonRect.height / 2
        });
    };
    
    return (
    <>
        <div id="introduction_button"className="portfolio-LeftMenuBox" onMouseDown={buttonDown}>
            Introduction 
        </div>
        <div id="projects_button" className="portfolio-LeftMenuBox" onMouseDown={buttonDown}>
            Projects
        </div>
        <div id="contact_button" className="portfolio-LeftMenuBox" onMouseDown={buttonDown}>
            Contact
        </div>
        <div id="jupyter_button" className="portfolio-LeftMenuBox" onMouseDown={buttonDown}>
            Jupyter Notebook
        </div>
        {selectedButton && isMouseDown && (
        <div
          ref={imageRef}
          className="portfolio-LeftMenuBox"
          style={{
            position: "absolute",
            top: imagePosition.y,
            left: imagePosition.x,
            width: imageSize.width,
            height: imageSize.height,
            opacity: "0.5", /* 50% transparency */
            boxShadow: "none",
            borderRadius: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedButton.replace("_button", "")}
        </div>
        )}
    </>
    )


}