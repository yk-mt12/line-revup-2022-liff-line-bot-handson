import { useState, useEffect } from 'react';

export const Profile = ({liffObject}) => {
    const [profile, setProfile] = useState(undefined);
    useEffect(() => {
      if(liffObject.isLoggedIn()) {
        liffObject.getProfile().then((fetchedProfile) => {
          setProfile({
            displayName: fetchedProfile.displayName,
            pictureUrl: fetchedProfile.pictureUrl
          })
        })
      }
    }, [liffObject])
    if (!profile) return;
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
