
const Person =(props) => {// props = atributes
  return(
    <>
          <h1>Name: {props.name}</h1>
          <h2>Surname: {props.surname}</h2>
          <h2>Age: {props.age}</h2>
    </>
  )
}
export default Person;
