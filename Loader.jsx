import styled from "styled-components";
import Logo from "./src/assets/logo.png";
import SyncLoader from "react-spinners/SyncLoader";

function Loader({spinner, size, containerHeight}) {
  return (
    <LoaderWrapper style={{height: containerHeight}}>
      {spinner ? (
        <SyncLoader
          color={"#008081"}
          loading={spinner}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <img src={Logo} alt="logo" className="logo" />
      )}
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
  .logo {
    width: 200px;
    margin-bottom: 1rem;
  }
`;
