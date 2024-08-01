import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ISearchSlice {
    query: string;
}

const initialState: ISearchSlice = {
    query: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        }
    }
})

export const {setQuery} = searchSlice.actions;
export default searchSlice.reducer;
