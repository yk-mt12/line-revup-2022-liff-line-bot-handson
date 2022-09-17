
import './App.css';
import liff from '@line/liff'
import { useState, useEffect } from 'react';
const user = {
  displayName: 'Hedy Lamarr',
  pictureUrl: 'https://i.imgur.com/yXOvdOSs.jpg'
};

const Profile = ({login}) => {
  const [profile, setProfile] = useState(user);
  useEffect(() => {
    if(liff.isLoggedIn()) {
      liff.getProfile().then((fetchedProfile) => {
        setProfile({
          displayName: fetchedProfile.displayName,
          pictureUrl: fetchedProfile.pictureUrl
        })
      })  
    } else {
      setProfile(user)
    }  
  }, [login])
  return (
    <>
      <h1>{profile.displayName}</h1>
      <img
        className="avatar"
        src={profile.pictureUrl}
        alt={'Photo of ' + profile.displayName}
        style={{
          width: 90,
          height: 90
        }}
      />
    </>
  );
}

const LoginButton = ({setLogin}) => {
  const click = () => {
    if (!liff.isLoggedIn()) {
      liff.login().then(() => {
        setLogin(true)
      })
    }
  }
  return (
    <button onClick={click}>login</button>
  );
}

const LogoutButton = ({setLogin}) => {
  const click = () => {
    liff.logout()
    setLogin(false)
  }
  return (
    <button onClick={click}>logout</button>
  );
}

function App() {
  const [login, setLogin] = useState(undefined);
  useEffect(() => {
    setLogin(liff.isLoggedIn())
  }, [login])

  return (
    <div className="App">
      <h1>Welcome to my app</h1>
      { !login && '未ログイン' }
      { login && 'ログイン' }
      { login ?
        <LogoutButton setLogin={setLogin} /> :
        <LoginButton setLogin={setLogin} />
      }
      { login && <Profile /> }
    </div>
  );
}

export default App;
