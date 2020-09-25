let dataServer;
let pubKey = 'pub-c-88ba5c78-203d-477d-b490-ca3bb589956f';
let subKey = 'sub-c-9278a2e8-fde8-11ea-a091-569464a6854f';
let soundList = [];


let channelName = "soundSend";
function setup() {
  createCanvas(400, 400);
  
   // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true,  
  });
  
  
  //attach callbacks to the pubnub object to handle messages and connections
    dataServer.addListener({ message: readIncoming}); 
  dataServer.subscribe({channels: [channelName]}); //subscribe to messages on the channel
//callback for incoming messages
  
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
  background(220);

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  //console.log(inMessage);
  if(inMessage.channel == channelName)
  {

    console.log("data recieved");
    
    console.log(inMessage.message.soundnotes);
   
    playNote(inMessage.message.soundnotes);
    
 
    
  }
}
