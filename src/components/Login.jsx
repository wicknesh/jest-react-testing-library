import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ user, setUser ] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      setUser(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form className='bg-[#272A37] py-6 px-16 rounded-3xl'>
        <h1 className='font-bold text-[3rem] text-center text-[#EDEDEE] my-8'>Login</h1>
        <div className='text-center'>
          <span className='text-xl font-bold text-blue-600'>{user.name}</span>
        </div>
        <div className="flex flex-col w-[30rem]">
            <label className='text-sm text-[#EDEDEE]'>Username</label>
            <input
              type="text"
              className='bg-[#323644] p-4 my-2.5 mx-0 rounded-2xl text-[#EDEDEE]'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className='text-sm text-[#EDEDEE]'>Password</label>
            <input
              type="password"
              className='bg-[#323644] p-4 my-2.5 mx-0 rounded-2xl text-[#EDEDEE]'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button
          className='p-4 my-2.5 mt-10 rounded-2xl hover:bg-blue-700 text-white bg-blue-600 w-[30rem] active:bg-blue-800 font-bold text-lg'
          disabled={!username || !password}
          onClick={handleClick}
        >{ loading ? "Please wait..." : "Login" }</button>
        <div className='text-center'>
          <span
            data-testid='error'
            className='text-red-600 text-lg'
            style={{visibility: error ? 'visible' : 'hidden'}}
          >Something went wrong!</span>
        </div>
      </form>
    </div>
  )
}

export default Login