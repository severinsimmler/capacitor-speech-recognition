With this minimal app you should be able to reproduce weird behavior of transcribing audio to text with the `@capacitor-community/speech-recognition` plugin. Tested mostly on Android, but I have seen this on iOS as well.

Sometimes the device does not start listening even though the click counter is incremented (i.e. I assume the click event has been triggered). This is reproducible with both my actual app and this minimal example. It never happens when clicking "start" for the first time. I have the feeling it mostly happens every second time.


### Steps to reproduce

1. Deploy the app to your test device (e.g. via `npm run build:android`)
2. Click the start button to record audio
3. Watch the click counter
4. Start talking
5. Wait for silence detection to stop recording (or explicitly click the stop button)
6. Repeat steps 2-5 until device does not start listening after clicking "start"
