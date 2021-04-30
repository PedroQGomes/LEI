import React from 'react'
import { useLocation } from "react-router-dom";

const Item = ({ match }) => {

    return (
        <div>
            redering item ref  {match.params.id}
        </div>
    )
}

export default Item