import React, { useState } from 'react';
import { DataContext } from './index';
// Create Context Object

// Create a provider for components to consume and subscribe to changes
const DataProvider = props => {
    const [orderEntries, setReturnOrderEntries] = useState([]);

    return (
        <DataContext.Provider
            value={{orderEntries,
                setReturnOrderEntries,
        
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;

