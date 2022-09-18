import './App.css';
import { useEffect, useState } from 'react';
import env from "react-dotenv";
const { createClient: createMicroCmsClient } = require('microcms-js-sdk');

const Form = ({content, microCmsClient}) => {
  const [formContent, setFormContent] = useState(content)

  return <div className={'container'}>
    <div className='item'>
      <input
        type="text"
        value={formContent.title}
        onChange={(e) => {
          setFormContent({...formContent, title: e.target.value })
        }}
        placeholder="title"
      />
    </div>
    <div className='item'>
      <textarea
        value={formContent.content}
        onChange={(e) => {
          setFormContent({...formContent, content: e.target.value })
        }}
        rows={5}
        placeholder="content"
      />
    </div>
    <div className='item'>
      <button onClick={() => {
        microCmsClient
          .update({
            endpoint: 'liff',
            contentId: formContent.id,
            content: {
              title: formContent.title,
              content: formContent.content,
            },
          })
          .then((res) => console.log(res.id))
          .catch((err) => console.error(err));
      }}>
        submit
      </button>
    </div>
  </div>
}

function App() {
  const [content, setContent] = useState(undefined)
  const microCmsClient = createMicroCmsClient({ serviceDomain: env.MICRO_CMS_SERVICE_DOMAIN, apiKey: env.MICRO_CMS_API_KEY });
  useEffect(() => {
    microCmsClient.get({
      endpoint: 'liff',
      queries: {
        // filter https://document.microcms.io/content-api/get-list-contents#hdebbdc8e86
        filters: 'userId[equals]4gerugeru'
      },
    }).then((res) => {
      setContent(res.contents[0])
    })
  }, [])
  return (
    <div className="App">
      { content && <Form content={content} microCmsClient={microCmsClient} /> }
    </div>
  );
}

export default App;
