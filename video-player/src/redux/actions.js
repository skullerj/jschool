export const play = () => {
  return {
    type: 'PLAY'
  };
};

export const pause = () => {
  return {
    type: 'PAUSE'
  };
};

export const setProgress = progress => {
  return {
    type: 'SET_PROGRESS',
    progress: progress
  };
};

export const setDuration = duration => {
  return {
    type: 'SET_DURATION',
    duration: duration
  };
};
