import "./styles.css";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


const  Signup = () => {
  const [placeholder, setPlaceholder] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://dev.codeleap.co.uk/careers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: placeholder })
      });
      const data = await response.json();
      console.log(data);
      navigate('/mainscreen', { state: { createdBy: placeholder } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="countainer">
      <div className="Sign-countainer">
        <form className="formulario" onSubmit={handleSubmit}>
          <h1 className="title">Welcome to CodeLeap network!</h1>
          <div className="search-input">
            <p className="subtitle">Please enter your username</p>
            <input className="placeholder" id="placeholder" value={placeholder} type="text" placeholder="John doe"  onChange={event => setPlaceholder(event.target.value)} />
            <button className="iniciar" disabled={!placeholder} type="submit">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

