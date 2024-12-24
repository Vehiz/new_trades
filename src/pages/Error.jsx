import { Link, useRouteError } from 'react-router-dom';
import Img from '../assets/page_not_found.svg';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  const getErrorMessage = () => {
    if (error && error.status) {
      switch (error.status) {
        case 404:
          return (
            <div className='flex flex-col text-center items-center justify-center min-h-[100vh]'>
              <img src={Img} alt='404' className='w-[90vh] block max-w-[600px]' />
              <h3 className='text-[24px] my-[1rem]'>Ohh!!</h3>
              <p>We can&apos;t seem to find the page you are looking for</p>
              <Link to='/' className="bg-blue-800 text-white p-[0.5%] rounded mt-[0.5rem] hover:bg-blue-500">
                Back home
              </Link>
            </div>
          );
        default:
          return (
            <div className='flex flex-col text-center items-center justify-center min-h-[100vh] bg-blue-500 text-white p-4'>
              <h1 className='text-[24px]'>
                An unexpected error occurred. Please try again later.
              </h1>
            </div>
          );
      }
    } else {
      return (
        <div className='flex flex-col text-center items-center justify-center min-h-[100vh] bg-blue-500 text-white p-4'>
          <h1 className='text-[24px]'>
            Your internet connection seems to be unstable. Please reload the page.
          </h1>
        </div>
      );
    }
  };

  return (
    <div role="alert">
      {getErrorMessage()}
    </div>
  );
};

export default Error;
