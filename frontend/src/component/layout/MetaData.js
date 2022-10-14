import React from 'react'
import Helmet from "react-helmet";
const MetaData = ({title}) => {
  return (
    <Helmet>
    <div>{title}</div>
    </Helmet>
  )
}

export default MetaData