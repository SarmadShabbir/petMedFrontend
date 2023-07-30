import styled from 'styled-components';
import Logo from './src/assets/logo.png';

function Loader() {
  return (
    <LoaderWrapper>
      <img src={Logo} alt='logo' className='logo' />
    </LoaderWrapper>
  );
}

export default Loader;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  .logo{
    width: 200px;
    margin-bottom: 1rem;
  }
`;
