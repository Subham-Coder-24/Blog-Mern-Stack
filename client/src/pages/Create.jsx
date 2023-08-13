import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title:"",
    description:""
  })

  function handelChange(e){
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
    
  }

  function handelSubmit(e){
    e.preventDefault();
    createPost()
  }

  const createPost = async ()=>{
    const response = await fetch("https://blog-mern-stack-rust.vercel.app/post-blog", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    
    if(response.status==200){
      toast.success('Blog is successfully created');
      setTimeout(()=>navigate('/'),2000);
    }else{
      alert("Something went wrong")
    }

  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className='w-[90vw] lg:w-[60vw] mx-auto mt-10'>
      <h1 className='text-2xl font-bold text-center'>Create Blogs</h1>
      <form className='flex flex-col gap-3' onSubmit={handelSubmit}>
        <label htmlFor='title' className='font-semibold text-lg'>Title:</label>
        <input onChange={handelChange} type='text' name='title' id='' placeholder='Enter the blog' className='py-3 px-2 rounded-md outline-none border-2 border-gray-300'/>
        <label htmlFor='description' className='font-semibold text-lg'>Description:</label>
        <textarea onChange={handelChange}  name='description'
        className='p-3 px-2 rounded-md outline-none border-2 border-gray-300' rows={10}/>
        <button type='submit' className='bg-purple-300 hover:bg-purple-500 py-3 rounded-md text-white text-xl font-bold'>Post</button>
        
      </form>
    </div>
    </>
  )
}

export default Create