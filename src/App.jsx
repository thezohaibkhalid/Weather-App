import React from 'react';
import './index.css';
import Weather from "./components/Weather.jsx"

export default function App() {
  return (
    <div className="bg-slate-500 min-h-screen grid place-items-center">
      
        <Weather></Weather>

    </div>
  );
}
