import React, {useState} from 'react'
import styles from "./auth.module.scss"
import {BiUser} from "react-icons/bi"
import Card from '../../components/card/card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail,registerUser } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import {useDispatch} from "react-redux";
import Loader from '../../components/loader/Loader'


const initialState= {
  name:"",
  email:"",
  password:"",
  confirmPassword:""
}
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {name,email,password,confirmPassword} = formData

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setformData({...formData, [name] : value})
  };

  const register = async (e) => {
    e.preventDefault();
    
    if(!name || !email || !password ) {
      return toast.error("All Fields are required")
    }
    if(!validateEmail(email) ) {
      return toast.error("Please enter a valid email")
    }
    if(password.length < 8 ) {
      return toast.error("Password must be greater than 8 characters")
    }
    if(password !== confirmPassword ) {
      return toast.error("Password do not match!")
    }
    
    const userData = {
      name,email,password
    }
    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      if(data){
        console.log(data)
        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.name))
        navigate("/dashboard")
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader/>}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiUser size={35} color="#999"/>
          </div>
          <h2>Register</h2>

          <form onSubmit={register}>
            <input type="text" placeholder='Name' required name='name' value={name} onChange={handleInputChange}/>
            <input type="email" placeholder='Email' required name='email' value={email} onChange={handleInputChange} />
            <input type="password" placeholder='Password' required name='password' value={password} onChange={handleInputChange} />
            <input type="password" placeholder='Confirm Password' required name='confirmPassword' value={confirmPassword} onChange={handleInputChange}/>
            <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp;Already have an account?&nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register