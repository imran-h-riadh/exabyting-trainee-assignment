import React, { useState } from 'react'

export default function Modal({setShowModal,handleSubmitApply}) {
const [cvLink, setCvlink] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black ">Add Your CV Link</h2>
        <input 
          type="text" 
          placeholder="Enter your CV link" 
          value={cvLink}
          onChange={(e)=> setCvlink(e.target.value)}
          className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={()=>handleSubmitApply(cvLink)}
        >
          Apply
        </button>
        <button 
          className="w-full bg-red-400 text-white p-3 rounded-lg mt-4 hover:bg-red-600 transition duration-300"
          onClick={()=>setShowModal(false)}
        >
          cancel
        </button>
      </div>
    </div>
  )
}
