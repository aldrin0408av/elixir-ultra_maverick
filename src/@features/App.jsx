import { Routing } from "../utils/routing/routing";
import { ReactQueryDevtools } from 'react-query/devtools'
import { decodeUser } from "../services/token/decode-user";
import './App.scss'

const user = decodeUser()

function App() {
  return (
    <>
      <Routing />
      {user?.role === 11 &&
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      }
    </>
  )
}
export default App;
