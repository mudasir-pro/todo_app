import {Link} from "react-router-dom"
import {useState} from "react"


const Register=()=>{
    const [username,setUsername]=useState('')
    const [ email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    

    return(
        <div className="w-100 d-flex justify-content-center m-2">
            <div className="TodoForm d-flex flex-column align-items-center container">
                <h2>Register</h2>
                <form>
                <div className="form-group w-60">
                    <label htmlFor="ExampleUsername">Username</label>
                    <input type="text" className="form-control w-100"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username"
                    autoComplete="false"
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>

                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    autoComplete="false"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                    className="form-control"
                    autoComplete="false"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}

                    />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Sign In</button>
                    </form>
                    <p>Already Have an account <Link to={'/login'}>Login</Link></p>
            </div>

        </div>
    )
}
export default Register