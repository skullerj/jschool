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
      return { ...state, progress: action.progress };
    case 'PLAY':
      return { ...state, playing: true };
    case 'PAUSE':
      return { ...state, playing: false };
    case 'SET_DURATION':
      return { ...state, duration: action.duration };
    default:
      return state;
  }
};

export default main;
