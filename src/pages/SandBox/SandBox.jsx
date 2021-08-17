import { useEffect, useState } from 'react'
import { db } from '../../utils/api'
import { Button } from '../../components/Button/Button'

const SandBox = props => {
  const [people, setPeople] = useState([])

  const fetchData = () => {
    db.collection('people')//a too big json
      .get()//promise
      .then(querySnapshot => {
        let gotData = []
        querySnapshot.forEach(doc => { // doc.data() is never undefined for query doc snapshots
          gotData = [...gotData, { id: doc.id, ...doc.data() }]
        })
        setPeople(gotData)
      })
      .catch((error) => Promise.reject(error))
  }

  const handleClick = () => {
    db.collection("people")
    .where('age', '==', '40')
    .get()
    .then(doc => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          console.log("No such document!");
      }
    })
    .catch(error => console.log("Error getting document:", error))

    // console.log('Get persone')
  }

  console.log('people', people)

  useEffect(() => {
    fetchData()
  }, [])

  // const setData1 = () => {
  //   const citiesRef = db.collection("cities");
  //   // citiesRef
  //   //   .add({city: "ACAPULKA"})
      
  //     citiesRef.doc("WgUiM4pnHzDrVQysLBCV")
  //       .collection('scityInfo')
  //       .add({ population: 1000, area: 20 })
  // }

  const setData = () => {

    var batch = db.batch()

    const cityRef = db.collection('cities').doc()
    batch.set(cityRef, { city: 'Dolyna' })

    const cityInfoRef = db.collection('cityInfo').doc(cityRef.id)
    const resOfSet = batch.set(cityInfoRef, { city: 'Dolyna', population: 3000, square: 500 })

    batch.commit()
    .then(() => console.log("Batch success", cityRef.id))
    .catch(err =>  console.error(err))
  }

  // console.log('HISTORY', props.history)
  return (<>
    <h1 className="mt-20">
      Sand Box
    </h1>
    <Button color="dark" onClick={handleClick}>get persone</Button>
    <br /> <br />
    <Button color="dark"  onClick={setData}>set data</Button>
  </>)
}

export default SandBox