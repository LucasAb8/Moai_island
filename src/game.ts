import { triggerEmote, PredefinedEmote } from "@decentraland/RestrictedActions"
import { movePlayerTo } from '@decentraland/RestrictedActions'


// Create entity
const cube = new Entity()

// Create AudioClip object, holding audio file
const clip = new AudioClip("sounds/test.mp3")

// Create AudioSource component, referencing `clip`
const source = new AudioSource(clip)

// Add AudioSource component to entity

/*
// Play sound
source.playing = true
source.loop = true
*/

let avocado = new Entity()
avocado.addComponent(new GLTFShape("models/island.glb"))
avocado.addComponent(
  new Transform({
    position: new Vector3(16, 2.2, 16),
    scale: new Vector3(1,1,1),
  })
)
//avocado.addComponent(source)
engine.addEntity(avocado)


var n=300;
var t = 300;
var jump =0;
var emoji = 1;
var dance = 1;

class AutoDance {
  // The update() function runs on every frame.
  update() {
    //text.value = <string><unknown>n + "/" + <string><unknown>t + "----" + <string><unknown>jump
    Input.instance.subscribe('BUTTON_DOWN', ActionButton.JUMP, false, () => {
      n = t-20;
      jump= 1;})
    Input.instance.subscribe('BUTTON_UP', ActionButton.FORWARD, false, () => {
      if (jump == 1){
        n = t - 10;
      }
      else{
        n = t;
      }})
    Input.instance.subscribe('BUTTON_UP', ActionButton.LEFT, false, () => {
      if (jump == 1){
        n = t - 10;
      }
      else{
        n = t;
      }})
    Input.instance.subscribe('BUTTON_UP', ActionButton.RIGHT, false, () => {
      if (jump == 1){
        n = t - 10;
      }
      else{
        n = t;
      }})
    Input.instance.subscribe('BUTTON_UP', ActionButton.BACKWARD, false, () => {
      if (jump == 1){
        n = t - 10;
      }
      else{
        n = t;
      }})
    if (Camera.instance.position.y > 2 && Camera.instance.position.y < 4 && n%t ==0 &&
      Camera.instance.position.x <= 19.70 && Camera.instance.position.x >= 12.37
      && Camera.instance.position.z <= 21.76 && Camera.instance.position.z >= 14.80 &&  dance ==1){
        if(jump == 1){
          jump = 0;
        }
        if(emoji == 1){
          triggerEmote({ predefined: PredefinedEmote.DISCO })
          t= 300;
        }
        else if(emoji == 2){
          triggerEmote({ predefined: PredefinedEmote.ROBOT})
          t = 315;
        }
        else if(emoji == 3){
          triggerEmote({ predefined: PredefinedEmote.CLAP})
          t = 150;
        }
        else if(emoji == 4){
          triggerEmote({ predefined: PredefinedEmote.WAVE})
          t = 75;
        }
        else if(emoji == 5){
          triggerEmote({ predefined: PredefinedEmote.HANDS_AIR})
          t = 150;
        }
        else if(emoji == 6){
          triggerEmote({ predefined: PredefinedEmote.DAB})
          t = 65;
        }
        n =0;
      }
      n+=1;

  }
}
engine.addSystem(new AutoDance())





//Portal

var state = 0;
var offset = 0





class Teleport{
  update(){
    if (Math.sqrt(Math.pow(Camera.instance.position.x-15.5,2) + Math.pow(Camera.instance.position.z-11.20,2) ) <= 1){
      if(state == 0 && offset > 30){
        //Up
        movePlayerTo({ x: 15.5, y: 28, z: 11.20 }, { x: 15.5, y: 28, z: 20 });
        state =1;
        offset = 0;
        //source.volume = 1
        
      }
      if(state == 1 && offset > 30){
        movePlayerTo({ x: 15.5, y: 3.5, z: 11.20 }, { x: 15.25, y: 3.5, z: 20 });
        offset = 0;
        state = 0;
        //source.volume = 0.1
        
      }
      }  
      offset += 1;
      
    }
    
  }

engine.addSystem(new Teleport())


