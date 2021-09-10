import React from "react";
import { useHistory } from "react-router-dom";

function RestroomItem({ data, onClick }) {
    const history = useHistory();

    const onRestroomClick = () => {
        console.log("restroom clicked");
        onClick(data);
        history.push({ pathname: `/restrooms/${data.id}` });
    };
    return (
        <div>
            <p onClick={onRestroomClick}>
                {data.name} - {data.distance.toFixed(2)} miles
            </p>
        </div>
    );
}

export default RestroomItem;
