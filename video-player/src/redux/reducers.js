const main = (
  state = {
    playing: false,
    progress: 0,
    duration: 0
  },
  action
) => {
  switch (action.type) {
    case 'SET_PROGRESS':
      return { ...state, progress: action.playing };
    case 'PLAY':
      return { ...state, playing: true };
    case 'PAUSE':
      return { ...state, playing: false };
    case 'SET_DURATION':
      return { ...state, progress: action.playing };
    default:
      return state;
  }
};

export default main;
