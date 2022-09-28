export const LoginButton = ({liffObject, login}) => {
  const click = () => {
    if (!liffObject.isLoggedIn()) {
      login()
    }
  }
  return (
    <button onClick={click}>login</button>
  );
}
