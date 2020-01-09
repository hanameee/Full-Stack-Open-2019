import React from "react";
import Part from "./Part";

function Content({ contentData }) {
    return (
        <>
            {contentData.map(data => (
                <Part partData={data} />
            ))}
        </>
    );
}

export default Content;
