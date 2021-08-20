import { useState } from 'react'
import 'firebase/firestore'
import 'firebase/storage'
import { Container } from '../../../components/Container'
import { Tab, Tabs } from '../../../components/Tab'
import EditorConvertToHTML from '../TextEditor/TextEditor'
import Tools from '../Tools/Tools'

const Account = () => {
  const [info, setInfo] = useState(null)

  return (
    <Container>
      <Tabs>
        <Tab title="Basic">
          <div>
            <h1>Account</h1>
            <hr />
            <div>First name: {info && info.firsName}</div>
            <div>Second name: {info && info.secondName}</div>
            <div>User name: {info && info.userName}</div>
          </div>
        </Tab>
        
        <Tab title="Create post">
          <h3 className="my-5 text-2xl">Create post</h3>
          <EditorConvertToHTML />
        </Tab>

        <Tab title="All post">
          <h3>All posts</h3>
        </Tab>

        <Tab title="Tools">
          <Tools />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Account
