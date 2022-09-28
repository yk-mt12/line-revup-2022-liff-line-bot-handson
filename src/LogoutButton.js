
export const LogoutButton = ({liffObject, logout}) => {
    const click = () => {
      logout()
    }
    return (
      <button onClick={click}>logout</button>
    );
}
