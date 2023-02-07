import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./component/Join";
import Chat from "./component/Chat";

// const endPoint = "http://localhost:4000/";
// const socket = sockitIo(endPoint, { transports: ["websocket"] });
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
