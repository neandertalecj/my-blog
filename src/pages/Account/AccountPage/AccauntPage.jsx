import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { Container } from '../../../components/Container'
import { Spinner, SpinnerContainer } from '../../../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs } from '../../../components/Tab'
// import { Button } from '../../../components/Button/Button'
import EditorConvertToHTML from '../TextEditor/TextEditor'
import TextEditor from '../TextEditor2/TextEditor'
// import { uploadImageToSrore } from '../../../utils/api'
// import Tools from '../Tools/Tools'

// const storage = firebase.storage()

const Account = () => {
  const [info, setInfo] = useState(null)

  // const [file, setFile] = useState(null)
  // const [url, setURL] = useState("")

  // function handleChange(e) {
  //   setFile(e.target.files[0]);
  // }

  // function handleUpload(e) {
  //   e.preventDefault();
  //   const ref = storage.ref(`/images/${file.name}`)
  //   const uploadTask = ref.put(file)

  //   uploadTask.on("state_changed", console.log, console.error, () => {
  //     ref
  //       .getDownloadURL()
  //       .then((url) => {
  //         setFile(null)
  //         setURL(url)
  //       })
  //   })
  // }

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
{/* 
            <form onSubmit={handleUpload}>
              <input type="file" onChange={handleChange} />
              <button disabled={!file}>upload to firebase</button>
            </form>
            <img src={url} alt="" /> */}
          </div>
        </Tab>
        
        <Tab title="Create post">
          <h3 className="my-5 text-2xl">Create post</h3>
          <EditorConvertToHTML />
          {/* <TextEditor /> */}
        </Tab>

        <Tab title="All post">
          <h3>All posts</h3>
        </Tab>

        <Tab title="Tools">
          {/* <Tools /> */}
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Account
