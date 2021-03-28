import React from 'react';
import {
    DataContext
} from './index';

export function consumer(Component) {
    return function WrapperComponent(props) {
        return (
            <DataContext.Consumer>
                {dataContext => (
                    <Component
                        {...props}
                        dataContext={dataContext}
                    />
                )}
            </DataContext.Consumer>
        )
    
    }}