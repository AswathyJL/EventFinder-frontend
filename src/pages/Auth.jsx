
import React, { useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import authImg from '../assets/authImg.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'


const Auth = ({insideRegister}) => {
  
  const [isLogin,setIsLogin]=useState(false)
  const navigate = useNavigate()
  const [inputData,setInputData] = useState({
    username:"", email:"", password:""
  })
//   console.log(inputData);

    //function handling register
  const handleRegister = async (e)=>{
    e.preventDefault()
    console.log(`inside handleRegister`);
    // call server after validation of values present
    if(inputData.username && inputData.email && inputData.password)
    {
        try {
            const result = await registerAPI(inputData)
            console.log(result);
            if(result.status == 200)
            {
                alert(`Welcome ${result.data?.username}, Please login to explore project fair!!!`)
                navigate('/login')
                setInputData({username:"",email:"",password:""})
            }
            else{
                if(result.response.status==406)
                    {
                        alert(result.response.data)
                        setInputData({username:"",email:"",password:""})
                    }  
            }
            
        } catch (err) {
            console.log(err);
            
        }
    }
    else
    {
        alert('please fill the form!!!')
    }
  }


    //function handling login
  const handleLogin = async (e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password)
    {
        try {
            const result = await loginAPI(inputData)
            if(result.status==200)
            {
                sessionStorage.setItem("user",JSON.stringify(result.data.user))
                sessionStorage.setItem("token",result.data.token)
                setIsLogin(true)
                setTimeout(() => {
                    setInputData({username:"", email:"", password:""})
                    navigate('/')
                    setIsLogin(false)
                }, 2000);
            }else{
                if (result?.response?.status === 401 || result?.response?.status === 404) {
                    alert(result.response.data || "Invalid credentials");
                    setInputData({ username: "", email: "", password: "" });
                }
            }
        } catch (err) {
            console.log(err);
            
        }
    }
    else{
        alert("Please fill the form completely!!!")
    }
  }
  return (
    <div style={{minHeight:'100vh', width:'100%'}} className='d-flex justify-content-center align-items-center'>
        <div className="container w-75">
            <div className="shadow card p-2">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className='img-fluid' src={authImg} alt="" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className='mt-2'><i className="fa-solid fa-map-location-dot"></i>{' '}
                        EventFinder</h1>
                        <h5>Sign {insideRegister?"Up":"In"} to your Account</h5>
                        <Form>
                            {
                                insideRegister &&
                                <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3">
                                <Form.Control value={inputData.username} onChange={e=>setInputData({...inputData,username:e.target.value})} type="text" placeholder="username" />
                                </FloatingLabel>
                            }
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control value={inputData.email} onChange={e=>setInputData({...inputData,email:e.target.value})} type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control value={inputData.password} onChange={e=>setInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
                            </FloatingLabel>
                            {
                                insideRegister ?
                                <div className="mt-3">
                                    <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                                    <p>Already A User? Please click here to <Link to={'/login'}>Login</Link></p>
                                </div>
                                :
                                <div className="mt-3">
                                    <button onClick={handleLogin} className='btn btn-primary mb-2'>
                                        Login
                                        { isLogin && 
                                        <Spinner className='ms-2' animation="border" variant="light" />}
                                    </button>
                                    <p>New User? Please click here to <Link to={'/register'}>Register</Link></p>
                                </div>

                            }

                        </Form>
                    </div>
                </div>
            </div>
        </div>
     </div>
  )
}

export default Auth