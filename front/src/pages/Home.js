import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatScreen from './ChatScreen';
function Home() {

    return (
      <div className="content">
        <ChatScreen />
      </div>
    );

  }

export default Home;
