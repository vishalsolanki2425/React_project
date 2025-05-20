import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProfileCardTask from './Component/User Profile Card Task'
import image1 from './assets/vishal.jpg';
import image2 from './assets/khushal.jpg';
import image3 from './assets/image1.jpg';
import image4 from './assets/image3.jpg';
import image5 from './assets/image2.jpg';
import image6 from './assets/image4.jpg';

function App() {

  return (
    <div className="profile">
      <UserProfileCardTask name="Vishal solanki" tital="web develop" email="vishalsolanki2425@gmail.com" contact="9909295049" gender="male" image={image1}/>
      <UserProfileCardTask name="Khushal vaghasiya" tital="app develop" email="khushalvaghasiya100@gmail.com" contact="9909290000" gender="male" image={image2}/>
      <UserProfileCardTask name="kamal pitar" tital="web develop" email="kamalpitar1111@gmail.com" contact="9966095049" gender="male" image={image3}/>
      <UserProfileCardTask name="Neha sharma" tital="frentend develop" email="nehasharma33@gmail.com" contact="9909222149" gender="female" image={image4}/>
      <UserProfileCardTask name="Rahul sharma" tital="fullstack develop" email="rahulsharma5555@gmail.com" contact="9902905049" gender="male" image={image5}/>
      <UserProfileCardTask name="Nadni varma" tital="backend develop" email="nadnivarma22@gmail.com" contact="9909228049" gender="female" image={image6}/>
    </div>
  )
}

export default App
