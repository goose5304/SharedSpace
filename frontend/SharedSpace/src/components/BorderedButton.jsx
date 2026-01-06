import './BorderedButton.css'
import { Link } from 'react-router-dom'

export function BorderedButton({ to, message, size = 'large' }){
    const getButtonClass = () => {
        switch(size) {
            case 'purple':
                return 'borderedButton-purple';
            case 'pink':
                return 'borderedButton-pink';
            case 'large':
            default:
                return 'borderedButton-large';
        }
    };
    
    return(
        <>
            <Link to={to} className='borderedButton'>
                <button className={getButtonClass()}>
                    {message}
                </button>
            </Link>
        </>
    );
}
