import { useNavigate } from 'react-router-dom';
import './ErrorMessage.css';

export default function ErrorMessage({title,message}){
    const navigate = useNavigate();
    function handleGoToMainPage(){
        navigate('/items');
    }
    return(
    <main className="error-main">
        <h1>{title}</h1>
        <p>{message}</p>
        <button className='error-button' onClick={handleGoToMainPage}>Go back</button>
    </main>);
}