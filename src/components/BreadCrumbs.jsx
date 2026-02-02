import { useLocation, Link } from 'react-router-dom';

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(crumb => crumb);
  const lastCrumb = pathnames[pathnames.length - 1];

  return (
    <nav aria-label="breadcrumb" className="flex text-xs sm:text-sm text-gray-400 mt-4 space-x-2">
      {lastCrumb && (
        <div className="flex items-center">
          <Link 
            to={`/account/${lastCrumb}`} 
            className="text-blue-600 hover:underline capitalize font-semibold"
            aria-current="page"
          >
            {lastCrumb}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default BreadCrumbs;
