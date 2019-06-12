const projectReducer = (state = [], action) => {
    switch (action.type){
        case 'CREATE_PROJECT' : 
            return [
                 ...state,
            Object.assign({}, action.project)
            ]
            // return state;
        default: 
        return state;
    }
}

export default projectReducer