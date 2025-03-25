import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    function handleGoHomeButton(){
        navigate('/items');
    }
    
    return (<div>
        <main>
            <h1>An error occurred!</h1>
            <p>Could not find this page!</p>
            <button className='error-page-button' onClick={handleGoHomeButton}>Go back</button>
        </main>
    </div>);
}