import { auth } from "./main";
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth'

import Button from './components/Button'
import Dropdown from './components/Dropdown'
import TopNav from './components/TopNav'
import UserImage from "./components/UserImage";
import { AiFillTool, AiFillPlusSquare } from 'react-icons/ai'

import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";

import { useAlert } from 'react-alert'

function App() {

  const alert = useAlert()

  const [user, loading, error] = useAuthState(auth);

  function validateUser(user) {
    if (!user) return false;
    if (user && user.email.slice(-7) === 'asu.edu') {
      return true;
    }
    else {
      alert.show('Only email addresses ending in \'asu.edu\' are allowed.')
      signOut(auth);
      return false;
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-100 text-neutral-800">
      <TopNav
        title='Field Day'
        subcomponents={
          [<Dropdown />,
          (user) ? <div>{user.email}</div> : null,
          <UserImage className='h-12' user={user} />,
          (user)?
          <Button
            text="Logout"
            enabled={user}
            onClick={() => {
              signOut(auth)
            }} />:null,
          <AiFillPlusSquare className="text-2xl" />,
          <AiFillTool className='text-2xl' />
          ]}
      />
      <div className="flex flex-grow" >
        <Sidebar />
        {(validateUser(user)) ?
          <div>Hello</div>
          :
          <LoginPage
            loading={loading}
            loginEvent={() => {
              signInWithRedirect(auth, new GoogleAuthProvider())
            }} />}

      </div>

    </div>
  )
}

export default App
