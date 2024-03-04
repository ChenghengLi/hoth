import React from 'react';
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


const ObituaryPage = () => {
    return (
        <>
      <div className="obituary-container">
        <img src={Background} className="obituary-background" alt="Background" />
        <div className="name-container">
            <h1 className="p1">In Loving Memory of </h1>
        </div>
    </div>
      <div className="other">
        <div className="flowerList">
            <img src={LeaveFlower }  className="actionImg  p4"/>
            <span className="flowertext p3 p5">Send Flowers</span>
             <img src={f1}  className="flowerImg" />
             <img src={f2}   className="flowerImg"/>
             <img src={f3}   className="flowerImg"/>
             <img src={f4}   className="flowerImg"/>
             <img src={f5}   className="flowerImg"/>
             <img src={f6}   className="flowerImg"/>
             <img src={f7}   className="flowerImg"/>
             <img src={f8}   className="flowerImg"/>
        </div>
        <div className="flowerList">
            <img src={Note }  className="actionImg p4"/>
            <span className="flowertext p3 p5">Write a message</span>
                <textarea className="messageBox p4" placeholder="Your message here"></textarea>
                <button class="p4 sendButton">send</button>
            </div>
        </div>
      </>
    );
  };
  
  export default ObituaryPage;
  