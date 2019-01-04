# Video Player

This video player implements HTML5 media fragments to allow users to manage clips from a main video.

It has the complies with the following mandatory features:

- An HTML5 video player that utilizes media fragments
- A list of clips to be played in the video player
- The first item in the list should be the full video
- An interface to add new clips to the list by specifying a name, start time, and end time
- The ability to delete clips from the list (excluding the full video item)
- The ability to edit existing clips in the list
- The ability to play clips in the video player

And has this complementary features:

- The ability to automatically jump to the next clip after it finishes, with a 3 second waiting period and appropriate loading animation.
  - You can activate or deactivate this feauture using the Autoplay notch, on the clips list.
- The ability to ‘save’ clips for persistent use.
  - It will save the complete state of the app inside localStorage
- Hotkeys to jump between the current clip and next and previous clips
  - Hotkeys are displayed under the video
- The ability to reuse the the player and playlist on another page without the editing capabilites
  - Clicking the "Share" button on the top right will copy an url that can be pasted on a incognito tab to showcase the videos you created.

Made by: Juan Rosero
