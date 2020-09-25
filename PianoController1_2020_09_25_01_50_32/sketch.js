
let dataServer;
let pubKey = 'pub-c-88ba5c78-203d-477d-b490-ca3bb589956f';
let subKey = 'sub-c-9278a2e8-fde8-11ea-a091-569464a6854f';

let Notes=[];
//name used to sort your messages. used like a radio station. can be called anything
let channelName = "soundSend";


let notes = [60, 62, 64, 65, 67, 69, 71, 72];
let blackkeys = [61, 63, 66, 68, 70];
let index = 0;
let trigger = 0;
let osc;
let keys;
let dataToSend = 
{
notes:[]
};

function setup() {
  createCanvas(800, 600);
  
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
    
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(osc);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true,  
  });
  
  
}
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.6,0.0);

  // If we set a duration, fade it out

    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-20);
  
}


function draw() {
  background(255);
  
  //white keys outline
  stroke(5);
  line(width / 8, 0, width / 8, height);
  line(2 * width / 8, 0, 2 * width / 8, height);
  line(3 * width / 8, 0, 3 * width / 8, height);
  line(4 * width / 8, 0, 4 * width / 8, height);
  line(5 * width / 8, 0, 5 * width / 8, height);
  line(6 * width / 8, 0, 6 * width / 8, height);
  line(7 * width / 8, 0, 7 * width / 8, height);
  line(8 * width / 8, 0, 8 * width / 8, height);
  
// white rect 1
  if (mouseX < width / 8 && mouseX > 0) {
    fill('pink');
    rect(0, 0, width / 8, height);

    // white rect 2
  } else if (mouseX < 2 * width / 8) {
    fill('lightblue');
    rect(width / 8, 0, width / 8, height);

    // white rect 3
  } else if (mouseX < 3 * width / 8) {
    fill('pink');
    rect(2 * width / 8, 0, width / 8, height);

   // white rect 4
  } else if (mouseX < 4 * width / 8) {
    fill('lightblue');
    rect(3 * width / 8, 0, width / 8, height);

    // white rect 5
  } else if (mouseX < 5 * width / 8) {
    fill('pink');
    rect(4 * width / 8, 0, width / 8, height);

    // white rect 6
  } else if (mouseX < 6 * width / 8) {
    fill('pink');
    rect(5 * width / 8, 0, width / 8, height);

    // white rect7
  } else if (mouseX < 7 * width / 8) {
    fill('lightblue');
    rect(6 * width / 8, 0, width / 8, height);

    //white rect 8
  } else if (mouseX < 8 * width / 8) {
    fill('pink');
    rect(7 * width / 8, 0, width / 8, height);
  }



 // black rect 1
  fill(200);
  rect(3 / 4 * width / 8, 0, width / 16, height / 2)

  if (mouseX >= 3 / 32 * width && mouseX <= 5 / 32 * width&&mouseY<height/2) {
    if (mouseIsPressed) {
      //play music
      fill(255);
      rect(3 / 4 * width / 8, 0, width / 16, height / 2);
    } else {
      fill(200);
    }

  }


 // black rect 2
  fill(0);
  rect(7 / 4 * width / 8, 0, width / 16, height / 2);
  if (mouseX >= 7 / 32 * width && mouseX <= 9 / 32 * width &&mouseY<height/2) {
    if (mouseIsPressed) {
      fill(255);
      rect(7 / 4 * width / 8, 0, width / 16, height / 2);
    } else {
      fill(0);
    }
  }


// black rect 4

  fill(0);
  rect(15 / 4 * width / 8, 0, width / 16, height / 2)

  if (mouseX >= 15 / 32 * width && mouseX <= 17 / 32 * width && mouseY<height/2) {
    if (mouseIsPressed) {
      //play music
      fill(255);
      rect(15 / 4 * width / 8, 0, width / 16, height / 2);
    } else {
      fill(0);
    }

  }


  // black rect 5
  fill(200);
  rect(19 / 4 * width / 8, 0, width / 16, height / 2);
  if (mouseX >= 19 / 32 * width && mouseX <= 21 / 32 * width&&mouseY<height/2) {
    if (mouseIsPressed) {
      //play music
      fill(255);
      rect(19 / 4 * width / 8, 0, width / 16, height / 2);
    } else {
      fill(200);
    }

  }
   // black rect 6

  fill(0);
  rect(23 / 4 * width / 8, 0, width / 16, height / 2);
  if (mouseX >= 23 / 32 * width && mouseX <= 25 / 32 * width&&mouseY<height/2) {
    if (mouseIsPressed) {
      //play music
      fill(255);
      rect(23 / 4 * width / 8, 0, width / 16, height / 2);
    } else {
      fill(0);
    }

  }

  // black rect 7

  fill(200);
  rect(31 / 4 * width / 8, 0, width / 32, height / 2);
  if (mouseX >= 31 / 32 * width && mouseX <= 33 / 32 * width&&mouseY<height/2) {
    if (mouseIsPressed) {
      fill(255);
      rect(31 / 4 * width / 8, 0, width / 32, height / 2);
    } else {
      fill(200);
    }

  }

    
}
function mousePressed(event) {
  if(event.button == 0 && event.clientX < width && event.clientY < height) {
    // Map mouse to the key index
    keys = floor(map(mouseX, 0, width, 0, notes.length));
    // playNote(notes[keys],2);
    recorder.record(soundFile);
    
  
  }
}
 

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,1);
  recorder.stop();
  sendSound();
}

  function sendSound()

{
  
   dataServer.publish(
        {
          channel: channelName,
          message: 
          {
            soundnotes:notes[keys] ,
        
          }
        });
}
