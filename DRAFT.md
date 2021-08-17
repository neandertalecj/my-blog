const user = useSelector(state => state.auth.user)
useEffect(() => {
const db = firebase.firestore()

    if (user?.uid) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          setInfo('dfkjd',doc.data())
        })
        .catch(err => console.log(err))
    }

}, [user])

const [post, setPost] = useState('')

const getPost = () => {
db.collection('cities')
// .where('city', '==', 'post1')
// .get()
.doc('L5XSOxWc0YGag6vB79KW').get()
.then(doc => {
if (doc.exists) {
console.log("Document data:", doc.data())
setPost(doc.data().content)
} else {
console.log("No such document!")
}
})
.catch(error => console.log("Error getting document:", error))
}

      <br /><hr /><br />
      <Button color="dark" onClick={getPost}>Get post</Button>
      <br /><hr /><br />
      ===
      <div dangerouslySetInnerHTML={{__html: post && post}}></div>
      ===
      <p>{post && post}</p>
      ===
