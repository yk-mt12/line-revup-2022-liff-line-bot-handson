import './App.css';
import liff from '@line/liff'
import { useState, useEffect } from 'react';
import { Profile } from './Profile';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { EditForm } from './EditForm';
const { createClient: createMicroCmsClient } = require('microcms-js-sdk');


function App() {
  const [liffState, setLiffState] = useState([null, false]);
  useEffect(() => {
    liff
      .init({ liffId: process.env.REACT_APP_LIFF_ID })
      .then(() => {
        const isLogin = liff.isLoggedIn()
        if(isLogin) {
          liff.getProfile().then((profile) => {
            const microCmsClient = createMicroCmsClient({ serviceDomain: process.env.REACT_APP_MICRO_CMS_SERVICE_DOMAIN, apiKey: process.env.REACT_APP_MICRO_CMS_API_KEY });
            microCmsClient.create({
              endpoint: 'liff',
              content: {
                userId: profile.userId,
                title: "title",
                content: "複数行のテキストを入力\n複数行のテキストを入力"
              }
            }).then((res) => console.log(res.id) )
          })
        }
        setLiffState([liff, isLogin])
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
      { isLogin && <EditForm liffObject={liffObject} isLogin={isLogin} /> }
    </div>
  );
}

export default App;
