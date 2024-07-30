// src/pages/TodoDetail.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import './TodoDetail.css'; 
import { MdOutlineEdit } from "react-icons/md";

const TodoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const todo = location.state?.todo;

  const [age, setAge] = useState(todo?.age || '');
  const [familyName, setFamilyName] = useState(todo?.familyName || '');
  const [email, setEmail] = useState(todo?.email || '');
  const [passport, setPassport] = useState(todo?.passport || '');
  const [img, setImg] = useState(todo?.img || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!todo) {
    return <p className="text-center text-lg font-semibold">Tanlangan ToDo yo'q</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoDoc = doc(db, "todos", todo.id);
      await updateDoc(todoDoc, {
        age,
        familyName,
        email,
        passport,
        img
      });
      toast.success("ToDo muvaffaqiyatli yangilandi");
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      toast.error("ToDo yangilanishida xatolik yuz berdi");
    }
  };

  return (
    <div className="container mx-auto p-5 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-5 text-center ">ToDo Tafsilotlari</h1>
      <div className="card bg-base-100 shadow-lg rounded-lg p-6">
        <div className='flex'>
          <div className='flex-shrink-0'>
            <img 
              className='w-48 h-48 object-cover rounded-xl border-2 border-gray-300'
              src={img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gukc7EnLg2lXrV35IoDl3SrhFbupHeJhuw&s"} 
              alt={familyName || "ToDo"}
            />
          </div>
          <div className='ml-6 flex-grow'>
            <p className='text-3xl font-bold '>{familyName || "N/A"}</p>
            <p className='text-lg  mt-2'>Age: {age || "N/A"}</p>
            <p className='text-lg '>Email: {email || "N/A"}</p>
            <p className='text-lg '>Passport: {passport || "N/A"}</p>
          </div>
        </div>
        <button
          className="btn btn-primary mt-4 px-4 py-2 text-lg font-semibold"
          onClick={() => setIsEditing(true)}
        >
          <MdOutlineEdit className='inline-block w-6 h-6 mr-2' />
          Edit
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="card bg-base-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Edit ToDo</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-lg">
                <span className="font-semibold">Family Name:</span>
                <input
                  type="text"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="input input-bordered w-full mt-1 p-2 border rounded"
                  aria-label="Family Name"
                />
              </label>
              <label className="text-lg">
                <span className="font-semibold">Age:</span>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full mt-1 p-2 border rounded"
                  aria-label="Age"
                />
              </label>

              <label className="text-lg">
                <span className="font-semibold">Email:</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full mt-1 p-2 border rounded"
                  aria-label="Email"
                />
              </label>
              <label className="text-lg">
                <span className="font-semibold">Passport:</span>
                <input
                  type="text"
                  value={passport}
                  onChange={(e) => setPassport(e.target.value)}
                  className="input input-bordered w-full mt-1 p-2 border rounded"
                  aria-label="Passport"
                />
              </label>
              <label className="text-lg">
                <span className="font-semibold">Image URL:</span>
                <input
                  type="url"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="input input-bordered w-full mt-1 p-2 border rounded"
                  aria-label="Image URL"
                />
              </label>
              <div className="flex justify-end gap-4 mt-4">
                <button type="submit" className="btn btn-primary px-4 py-2 font-semibold">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary px-4 py-2 font-semibold "
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
