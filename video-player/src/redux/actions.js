export const addClip = clip => {
  clip.id = Date.now();
  return {
    type: 'ADD_CLIP',
    clip
  };
};

export const removeClip = id => ({
  type: 'REMOVE_CLIP',
  id
});

export const editClip = clip => ({
  type: 'EDIT_CLIP',
  clip
});

export const selectClip = id => ({
  type: 'SELECT_CLIP',
  id
});

export const openCreate = () => ({
  type: 'SET_CREATING_CLIP',
  creating: true
});

export const closeCreate = () => ({
  type: 'SET_CREATING_CLIP',
  creating: false
});

