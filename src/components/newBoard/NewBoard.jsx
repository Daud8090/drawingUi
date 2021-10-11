import { useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import io from 'socket.io-client';



// let socket = io.connect("http://localhost:5000")
export var timer;
var saveableCanvas;

function NewBoard(props) {
  var samedata;

  useEffect(() => {
    func();
    //recceinving msg from the server
    props.socket.on('canvas-data', data => {
      // console.log(data.abc,"jljlkjlk");
      // debugger
     let actualData=JSON.parse(data.abc)
      // console.log(actualData.lines.length,"jljlkjlk");

      if (saveableCanvas!=null&&data.abc!=null&&actualData.lines.length!=0 &&samedata !== data.abc ) {
        saveableCanvas.loadSaveData(data.abc, true)
        samedata = data.abc;
      }
    })
  },[])

  function func() {

    timer = setInterval(() => {
      var abc = saveableCanvas.getSaveData();
      if (samedata !== abc) {
        props.socket.emit('canvas-data', { abc })
        samedata = abc;
      }
    }, 500)
  }

  return <>
    <CanvasDraw
      style={{
        boxShadow:
          "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        ,
        width: "100%",
        height: "100%"
      }}
      ref={canvasDraw => {
        // console.log(props);  
        saveableCanvas = canvasDraw;
      }}
      // brushColor={props.color}
      brushRadius={3}
    />
  </>
}
export default NewBoard;
