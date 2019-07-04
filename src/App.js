import React, {
  useState,
  useEffect
} from "react";
import './App.css';
import axios from "axios";

let globalText = "";
function postData(text, cb) {
  if (globalText === text) {
    return;
  } else {
    globalText = text;
  }
  axios({
    method: 'post',
    url: 'http://localhost:3000/',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    },
    data: {
      text
    }
  }).then(cb)
    // then((response) => updateVal(response))
    .catch(function (error) {
      console.log(error);
    });
}

function App() {
  const [userInput, setInput] = useState("");
  const [bias, setBias] = useState("");
  
  const updateVal = (res) => {
    console.log("RESPONSE ---- ");
    console.log(res.data.title);
    setBias(res.data.title);
  };

  async function callApi() {
    postData(userInput, (data) => updateVal(data));
  }

  useEffect(() => {
    postData();
  });

  return (
    <div className="App">
        <input value={userInput} id="userInput" onChange={evt => setInput(evt.target.value)}/>
        <button onClick={() => callApi()}>
          callApi
        </button>

        <h3>Response</h3>
        <div id="bias">{bias}</div>
    </div>
  );
}

export default App;
