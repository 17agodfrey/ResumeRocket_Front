import "../../styles/Portfolio-LeftMenuContent.css";
import * as wPD from '../../utils/writePortfolioData';
import { useState } from "react";

export default function LayoutsContent({handleLayoutSelected, handlePortfolioContentChange}) {

    const buttonClicked = (e) => {
        const buttonID = e.target.id;
        handleLayoutSelected(buttonID);
        const layoutName = buttonID.split("_")[1];
        // wPD.updateLayout(layoutName);
        handlePortfolioContentChange({layout: layoutName});
        // wPD.updateLayout(layoutName);
        // if (rPD.getLayout() === null) {
        //     wPD.removeLayout();
        // }
    };

    return ( 
        <>
            <div id="layout_basic_button"className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                 basic
            </div>
            <div id="layout_2_button" className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                template 2
            </div>
            <div id="layout_3_button" className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                template 3
            </div>
            <div id="layout_custom_button" className="portfolio-LeftMenuBox LayoutsButton" onClick={buttonClicked}>
                custom
            </div>
        </>

    )
}