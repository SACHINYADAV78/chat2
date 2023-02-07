import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
let user;

const sendUser = () => {
  user = document.getElementById("join").value;
  document.getElementById("join").value = " ";
};
function Join() {
  const [name, setname] = useState("");
  console.log(name);
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <h1>C Hat</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          id="join"
          placeholder="Enter Your name"
        />
        <Link onClick={(e) => (!name ? e.preventDefault : null)} to={"/chat"}>
          <button onClick={sendUser} className="join-btn">
            btn
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
export { user };
