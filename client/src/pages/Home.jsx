import {useEffect,useState} from 'react'

import Post from './Post'

const Home = () => {

  const [posts, setPosts] = useState([]);
  const getPost = async ()=>{
    const response = await fetch('http://localhost:5000/blogs');
    const data = await response.json();
  
    setPosts(data.blogs)
  }
  useEffect(() => {
    getPost();
  }, [])


  return (
    <div className='my-10 flex flex-col gap-5'>

      {posts?.map((post)=>(
        <Post setPosts={setPosts} posts={posts} key={post._id} post={post}/>
      ))}
      
    </div>
  )
}

export default Home