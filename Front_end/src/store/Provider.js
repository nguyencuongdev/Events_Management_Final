import Context from './Context';
import { useReducer } from 'react';
import reducer, { initialState } from './reducer';

function Provider({ children }) {

    const [state, dispath] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispath]}>
            {children}
        </Context.Provider>
    );
}

export default Provider;