import './App.css';
import liff from '@line/liff'
import { useState, useEffect } from 'react';
import { Profile } from './Profile';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { EditForm } from './EditForm';
import env from "react-dotenv";
const { createClient: createMicroCmsClient } = require('microcms-js-sdk');


function App() {
  const [liffState, setLiffState] = useState([null, false]);
  useEffect(() => {
    liff
      .init({ liffId: '1657480741-kYJW0Nev' })
      .then(() => {
        const login = liff.isLoggedIn()
        const microCmsClient = createMicroCmsClient({ serviceDomain: env.MICRO_CMS_SERVICE_DOMAIN, apiKey: env.MICRO_CMS_API_KEY });
        microCmsClient.create({
          endpoint: 'liff',
          content: {
            userId: 'gege',
            title: "wood",
            content: "複数行のテキストを入力\n複数行のテキストを入力"
          }
        }).then((res) => console.log(res.id)
        ).catch((e) => console.log(e))

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
      { <EditForm liffObject={liffObject} /> }
    </div>
  );
}

export default App;
