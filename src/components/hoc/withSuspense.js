import React, {Suspense} from 'react';
import {Route} from "react-router-dom";

export const withSuspense = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props}/>
        </React.Suspense>
    }
};