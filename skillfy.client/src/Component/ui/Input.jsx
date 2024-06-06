import React from 'react'
import './Input.css'
export default function Input(text, func) {
  return (
    <input
              type="text"
              value={text}
              onChange={func}
    />
  )
}
