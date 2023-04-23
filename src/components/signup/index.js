import "./styles.css";

function Signup() {
  const input = document.querySelector('.placeholder');
  const button = document.querySelector('.iniciar');
  const form = document.querySelector('.formulario');


const validateInput = ({target}) =>{
  if (target.value.length > 0) {
    button.removeAttribute('disabled');
    return;
  }
  
    button.setAttribute('disabled', '');
}

const handleSubmite = (event) =>{
 event.preventDefault();

localStorage.setItem('user', input.value);
window.location = 'components/pages/mainscreen';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmite);


  return (
    <div className="countainer">
    <div className="Sign-countainer">
    <form className="formulario">
    <h1 className="title">Welcome to CodeLeap network!</h1>
     <div className="search-input">
        <p className="subtitle">Please enter your username</p>
        <input className="placeholder" type="text" placeholder="John doe" />
        <button className="iniciar" disabled type="submit">Enter</button>
      </div>
      </form>
    </div>
    </div>
  );
}

export default Signup;
