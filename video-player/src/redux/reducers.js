const main = (
  state = {
    clips: [],
    selectedClip: null,
    creatingClip: false,
    duration: 52,
    videoSrc:
      'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'
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
      return { ...state, selectedClip: action.id };
    case 'SET_CREATING_CLIP':
      return { ...state, creatingClip: action.creating };
    default:
      return state;
  }
};

export default main;
