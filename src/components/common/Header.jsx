

import Logout from '../auth/Logout';

import { useAuth } from '../../hooks/useAuth';

import { Link } from 'react-router-dom';

const Header = () => {
  const {auth} = useAuth();

  function isAuth(role) {
    return auth.userDto.roles.some((each) => each == role);
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-customBorder bg-customBg py-4">
  <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
    <div className="flex w-full items-center justify-between space-x-4">
      <Link to="/" className="btn-primary">
        Home
      </Link>
      <Logout />
      <Link to="/me" className="flex-center gap-3">
        <span className="text-lg font-medium lg:text-xl">{auth?.userDto?.name}</span>
      </Link>
      {(isAuth("ADMIN")) && <Link to="/adminPanel" className="flex-center gap-3">
        <span className="text-lg font-medium lg:text-xl">Admin Panel</span>
      </Link>}
    </div>

    </div>
  </nav>
  )
}

export default Header