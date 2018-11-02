import Sampler from 'tone/Tone/instrument/Sampler';
import './styles.css';

const sounds = require.context('./salamander', true, /\.(mp3)/);
const noteToKeyboardMap = new Map([
  [70, 'C'], // f
  [84, 'C#'], // t
  [71, 'D'], // g
  [89, 'D#'], // y
  [72, 'E'], // h
  [74, 'F'], // j
  [73, 'F#'], // i
  [75, 'G'], // k
  [79, 'G#'], // o
  [76, 'A'], // l
  [80, 'A#'], // p
  [186, 'B'], // ;
  [222, 'Ce'], // '
]);

let octave = 4;

function filenameToNotename(name) {
  // ej. Convert ./Ds4.mp3 into D#4
  return name.split('.')[1].replace('/', '').replace('s', '#');
}

const soundsSources = sounds.keys().reduce((res, key) => {
  res[filenameToNotename(key)] = `./dist/${sounds(key)}`;
  return res;
}, {});

const piano = new Sampler(soundsSources, () => {}).toMaster();
const keysDown = {};

// We need compute octave in order to allow 2 C keys to coexist
function computeNote(n, t) {
  if (n === 'Ce') {
    return `C${t >= 7 ? 0 : t + 1}`;
  }
  return `${n}${t}`;
}

function pressKey(item, note) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    keysDown[note] = true;
    piano.triggerAttack(computeNote(note, octave), '+0.05');
    item.classList.add('playing');
  };
}

function releaseKey(item, note) {
  return (e) => {
    if (e.preventDefault() && e.stopPropagation() && keysDown[note]) {
      piano.triggerRelease(computeNote(note, octave));
      keysDown[note] = false;
    }
    setTimeout(() => {
      item.classList.remove('playing');
    }, 200);
  };
}

const octaveDisplayer = document.querySelector('#octaveDisplayer');

function updateOctave(t) {
  octave = t >= 1 && t <= 7 ? t : octave;
  octaveDisplayer.innerHTML = `Octave: ${octave}`;
}

const keys = document.querySelectorAll('[playable]');
const keyPressers = {};
const keyReleasers = {};


for (let i = 0; i < keys.length; i += 1) {
  const note = keys[i].getAttribute('note');
  keyPressers[note] = pressKey(keys[i], note);
  keyReleasers[note] = releaseKey(keys[i], note);
  keys[i].addEventListener('pointerdown', keyPressers[note]);
  keys[i].addEventListener('pointerup', keyReleasers[note]);
}

window.addEventListener('keydown', (e) => {
  const note = noteToKeyboardMap.get(e.which);
  if (typeof keyPressers[note] === 'function') {
    keyPressers[note](e);
  }
  if (e.which === 65) {
    updateOctave(octave - 1);
  } else if (e.which === 81) {
    updateOctave(octave + 1);
  }
});

window.addEventListener('keyup', (e) => {
  const note = noteToKeyboardMap.get(e.which);
  if (typeof keyReleasers[note] === 'function') {
    keyReleasers[note](e);
  }
});

updateOctave(octave);
