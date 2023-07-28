import './404error.css';
import errorimg from '../../assets/errorimg.jpg';
import { useNavigate } from 'react-router-dom';

function Error404() {
  const navigate = useNavigate();
  return (
    <div className='error-container'>
      <div className='error-img-wrapper'>
        <img className='error-img' src={errorimg} />
      </div>
      <div className='error-main-heading'>
        <h2>Oops! This Page Could Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed, name changed or is temporarly disable
        </p>
        <button className='error-button' onClick={() => navigate('/')}>
          Go To Home Page
        </button>
      </div>
    </div>
  );
}
export default Error404;
