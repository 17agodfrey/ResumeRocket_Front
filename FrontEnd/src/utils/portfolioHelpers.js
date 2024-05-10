import { useApi } from "../hooks";

export function formatNewContent(portfolioContent, content) {   
    if(content.layout){
        const newContent = formatLayoutContent(portfolioContent, content);
        console.log("layout newContent: ", newContent)
        return newContent;
    }
    if(content.component){
        const newContent = formatComponentsContent(portfolioContent, content);
        console.log("component newContent: ", newContent)
        return newContent;
    }
}

function formatLayoutContent(portfolioContent, content) {
    if (content.layout === "basic") {
        content = 
        {
            ...content,
            section1: {
                components: []
            }
        }
    }
    else {
        content = 
        {
            ...content,
            section1: {
                components: [],
                // startx: 0,
                // endx: 50,
            },
            section2: {
                components: [],
                // startx: 0,
                // endx: 50,
            }
        }
    }
    return content;
}

function formatComponentsContent(portfolioContent, content) {
    let components = null;
    const section = determineSection(portfolioContent, content);
    console.log("section: ", section)
    if (section === 'section1') {
        console.log('components section1');
        components = portfolioContent.section1.components;
    } else if (section === 'section2') {
        console.log('components section2');
        components = portfolioContent.section2.components;
    } else if (section === 'section3') {
        console.log('components section3');
        components = portfolioContent.section3.components;
    }
    content.component.styles = {
        display: "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        height: "fit-content",
        width: "50%",
        padding: "10px 20px",
        backgroundColor: "tomato",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" /* Add a subtle box shadow */
    };
    if (content.component.type === "introduction") {
        content.component.text = "Write your introduction here";
    }

    if (content.component.type === "jupyter") {
        content.component.styles.backgroundColor = "lightblue";
    }


    if (components.length === 0) {
        console.log('no components in section')
        console.log('helpers components:', components)
        console.log('helpers content:', content)
        components.push(content);
        console.log('helpers components after push:', components)
        return { section: { components }};
    }
    // arrange the components in order of their y position
    for (let i = 0; i < components.length; i++) {
        console.log('new component:', content.component.position.y)
        console.log('current component:', components[i].component.position.y)
        //is less than the current component's position.y, insert the new component before the current component
        // we actually need to 
        if (content.component.position.y < components[i].component.position.y) {
            components.splice(i, 0, content);
            return { section: { components }};
        }
    // if we've reached the end of the loop, we need to add the new 
    // component to the end of the array
    }
    components.push(content);
    return { section: { components }};
    
}


function determineSection(portfolioContent, content) {
    const { x, y } = content.component.position;
    
    // Iterate over the sections in portfolioContent to find the section
    for (let sectionName in portfolioContent) {
        //if sectionName doesn't start with "section", skip it
        if (!sectionName.startsWith("section")) continue;
        console.log("determineSection, sectionName: ", sectionName)
        // Assuming each section has a DOM element associated with it
        const sectionElement = document.getElementById(sectionName);
        if (!sectionElement) continue;

        const rect = sectionElement.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return sectionName; // Mouse is inside this section
        }
    }

    return null; // Mouse is not inside any section
}