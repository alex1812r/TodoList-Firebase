import React, { useState } from 'react'
import firebase from '../firebase';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = e => {
    e.preventDefault();
    setLoading(true);

    let errors = [];
    if(email === '') {
      errors.push('email is required');
    }
    if(password === '') {
      errors.push('password is required');
    }

    if(errors.length) {
      setErrors(errors);
      
      setTimeout(() => {
        setErrors([]);
      }, 3000);

      return;
    }
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log('INICIO DE SESION');
        setLoading(false);
      })
      .catch(error => {
        setErrors(errors.concat([error.message]));
        setLoading(false);
        setTimeout(() => {
          setErrors([]);
        }, 7000);
      });
  }

  const styles = {maxWidth: `500px`, width: `60%`};

  return (
    <div className="card mx-auto" style={styles}>
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="password" 
              className="form-control"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          
          <div className="form-group">
            <button type="submit" disabled={loading} className="btn btn-success btn-block">
              {loading ? 'sending...' : 'SigIn'}
            </button>
          </div>

          {
            errors.length ?
              errors.map((error, index) => (
                <div key={index} className="alert alert-danger text-center">
                  { error }
                </div>
              ))
            : null
          }

        </form>
      
      </div>
    </div>
  );
}
 
export default Login;