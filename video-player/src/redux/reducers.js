const main = (
  state = {
    clips: [],
    selectedClip: null,
    creatingClip: false,
    shareOpened: false
  },
  action
) => {
  switch (action.type) {
    case 'ADD_CLIP':
      return { ...state, clips: [...state.clips, action.clip] };
    case 'REMOVE_CLIP':
      return {
        ...state,
        clips: state.clips.reduce((a, c) => {
          if (c.id !== action.id) {
            a.push(c);
          }
          return a;
        }, [])
      };
    case 'EDIT_CLIP':
      return {
        ...state,
        clips: state.clips.map(c => (c.id === action.clip.id ? action.clip : c))
      };
    case 'SELECT_CLIP':
      return { ...state, selectedClip: action.selected };
    case 'SET_CREATING_CLIP':
      return { ...state, creatingClip: action.creating };
    case 'SET_SHARING_OPENED':
      return { ...state, shareOpened: action.opened };
    default:
      return state;
  }
};

export default main;
