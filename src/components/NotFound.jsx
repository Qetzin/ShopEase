import './NotFound.css';
import { FaFrown } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className='not-found-main'>
            <div className="not-found-panel">
                <FaFrown className='frown-icon' />
                <div className='not-found-text'>
                    <h2 >No Results Found!</h2>
                    <p>Consider changing search/filter parameters.</p>
                </div>
            </div>
        </div>
    );
}