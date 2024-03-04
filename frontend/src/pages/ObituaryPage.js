import React, { useEffect, useState } from 'react';
import Background from './../assets/ObituaryBackground.svg';
import './../styles/ObituaryPage.css'
import LeaveFlower from './../assets/action/leaveaflower.svg'
import Note from './../assets/action/note.svg'
import f1 from './../assets/flowers/flowerblue.svg'
import f2 from './../assets/flowers/flowerbrightblue.svg'
import f3 from './../assets/flowers/flowerfuchsia.svg'
import f4 from './../assets/flowers/flowerpurple.svg'
import f5 from './../assets/flowers/flowertulip.svg'
import f6 from './../assets/flowers/flowerviolet.svg'
import f7 from './../assets/flowers/flowerwhite.svg'
import f8 from './../assets/flowers/floweryellow.svg'
import "@fontsource/eb-garamond";
import { useNavigate } from 'react-router-dom';

import fetchUserData from "../data.js"

const ObituaryPage = () => {
  const [d, setd] = useState(true);
  const navigate = useNavigate();
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [messages, setMessages] = useState([
    "Pioneer of Global Health, who dedicated his life to providing medical care to the most vulnerable.",
  ]);
  const [name, setName] = useState('');
  const [currentMessage, setCurrentMessage] = useState(''); // Step 1: Initialize state variable for textarea content

  const handleFlower = (index) => () => {
    setSelectedFlower(index);
    console.log(index);
  };

  const sendFlower = () => {
    setd(false);
  };

  const sendMessage = () => { // Step 3: Post the message
    setMessages(prevMessages => [...prevMessages, currentMessage]);
    setCurrentMessage(''); // Clear the textarea after posting
  };


  const messageBoxStyle = {
    backgroundColor: 'white',
    margin: '10px 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    width: 'fit-content',
    maxWidth: '90%', // Ensure the box doesn't get too wide
  };
  const navigateToVideoConference = () => {
    // Navigate to the video conference page
    navigate('/video-conference'); // Make sure the path matches your VideoScreen route
  };

   
    return (
        <>
      <div className="obituary-container">

      <img src={f5} style={{ display: d ? 'none' : 'block' }} className='fix_flower'></img>
        <img src={Background} className="obituary-background" alt="Background" />
        <div className="name-container">
            <h1 className="p1">In Loving Memory of Elizabeth Davis</h1>
        </div>
    </div>
      <div className="other">
        <div className="flowerList">
            <img src={LeaveFlower }  className="actionImg  p4"/>
            <span className="flowertext p3 p5">Send Flowers</span>
             <img           style={{
            filter: 1 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(1)} src={f1}  className="flowerImg" />
             <img           style={{
            filter: 2 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(2)} src={f2}   className="flowerImg"/>
             <img           style={{
            filter: 3 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(3)} src={f3}   className="flowerImg"/>
             <img           style={{
            filter: 4 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(4)} src={f4}   className="flowerImg"/>
             <img           style={{
            filter: 5 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(5)} src={f5}   className="flowerImg"/>
             <img           style={{
            filter: 6 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(6)} src={f6}   className="flowerImg"/>
             <img           style={{
            filter: 7 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(7)} src={f7}   className="flowerImg"/>
             <img           style={{
            filter: 8 === selectedFlower ? 'brightness(50%)' : 'none',
            transition: 'filter 0.5s ease', // Optional: smooth transition
          }} onClick={handleFlower(8)} src={f8}   className="flowerImg p5"/>
             <button class="p4 sendButton" onClick={sendFlower}>Send</button>

             <button className="p4 sendButton" onClick={navigateToVideoConference}>Join Video Conference</button>

        </div>
        <div className="flowerList">
            <img src={Note }  className="actionImg p4"/>
            <span className="flowertext p3 p5">Write Messages</span>
            <textarea
            className="messageBox p5"
            placeholder="Your message here"
            value={currentMessage} // Step 2: Bind textarea to state variable
            onChange={e => setCurrentMessage(e.target.value)} // Update state variable as user types
          ></textarea>
          <button onClick={sendMessage} className="p4 sendButton">Post</button>
        
        </div>
    </div>
    <div>
        <span className="flowertext p3 messageBlock">Messages:
        <div>
          {messages.map((message, index) => (
            <div key={index} style={messageBoxStyle}>
              {message}
            </div>
          ))}
        </div>
        </span>

      </div>

    


      </>
    );
  };

  export default ObituaryPage;

