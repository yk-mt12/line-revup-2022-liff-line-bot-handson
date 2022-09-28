
import './App.css';
import liff from '@line/liff'
import { useState, useEffect } from 'react';
const user = {
  displayName: 'Hedy Lamarr',
  pictureUrl: 'https://i.imgur.com/yXOvdOSs.jpg'
};

function App() {
  const [liffState, setLiffState] = useState([null, false]);
  useEffect(() => {
    liff
      .init({ liffId: '1657480741-kYJW0Nev' })
      .then(() => {
        const login = liff?.isLoggedIn()
        setLiffState([liff, login])
      })
      .catch((err) => {
        console.error({ err })
      })
  }, [])

  const [liffObject, isLogin] = liffState

  return (
    <div className="App">
      <h1>Welcome to my app</h1>
      { !isLogin && '未ログイン' }
      { isLogin && 'ログイン' }
      { isLogin ?
        <LogoutButton
          liffObject={liffObject}
          logout={(() => {
            liffObject.logout()
            setLiffState([liff, false]);
          })}/> :
        <LoginButton
          liffObject={liffObject}
          login={(() => {
            liffObject.login().then(() => {
              setLiffState([liff, true]);
            })
          })}
        />
      }
      { isLogin && <Profile liffObject={liffObject} /> }
    </div>
  );
}

export default App;
