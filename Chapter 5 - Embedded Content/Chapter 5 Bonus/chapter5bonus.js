// Directory where audio files are stored
const audioDir = 'Audio Sampler';

// Array of audio files to be used in the soundboard
const soundFiles = [
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_ah-ha.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_back-of-the-net.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_bang-out-of-order.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_dan.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_email-of-the-evening.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_hello-partridge.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_i-ate-a-scotch-egg.mp3',
  'Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_im-confused-.mp3',
];

// Get the soundboard section in the HTML where buttons will be added
const soundboard = document.getElementById('soundboard');

// Loop through each sound file to create sound buttons
soundFiles.forEach(filename => {
  // Clean up the filename to create a user-friendly name
  const name = filename
    .replace('.mp3', '') // Remove the file extension
    .replace('Assessment 1_Chapter-5-Embedded Content_Exercises_Audio Sampler_Audio_', '') // Remove prefix
    .replace(/-/g, ' ') // Replace dashes with spaces
    .replace(/_/g, ' '); // Replace underscores with spaces

  // Create a button element for each sound file
  const button = document.createElement('button');
  button.classList.add('sound-button'); // Add the "sound-button" class to the button

  // Create a play icon for the button
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-play'); // Add font-awesome play icon classes

  // Create a span for the text label
  const text = document.createElement('span');
  text.textContent = name; // Set the text to the cleaned-up filename

  // Create a visualizer for the button
  const bars = document.createElement('div');
  bars.classList.add('visualizer'); // Add "visualizer" class

  // Add individual bars to the visualizer
  for (let i = 0; i < 5; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar'); // Add "bar" class to each visualizer element
    bars.appendChild(bar); // Append the bar to the visualizer
  }

  // Append the icon, text, and visualizer to the button
  button.append(icon, text, bars);
  // Append the button to the soundboard section
  soundboard.appendChild(button);

  // Create an audio object for each sound file
  const audio = new Audio(`${audioDir}/${filename}`);
  let isPlaying = false; // Keep track of whether the audio is playing

  // Add event listener for the button click (to play/pause audio)
  button.addEventListener('click', () => {
    if (!isPlaying) {
      audio.currentTime = 0; // Start from the beginning
      audio.play(); // Play the audio
      icon.classList.replace('fa-play', 'fa-pause'); // Change icon to "pause"
      button.classList.add('playing'); // Add "playing" class to the button
      isPlaying = true; // Set the audio as playing

      // When the audio ends, reset the button
      audio.onended = () => {
        icon.classList.replace('fa-pause', 'fa-play'); // Reset icon to "play"
        button.classList.remove('playing'); // Remove the "playing" class
        isPlaying = false; // Set the audio as not playing
      };
    } else {
      // If the audio is already playing, pause it
      audio.pause();
      icon.classList.replace('fa-pause', 'fa-play'); // Change icon to "play"
      button.classList.remove('playing'); // Remove the "playing" class
      isPlaying = false; // Set the audio as not playing
    }
  });
});