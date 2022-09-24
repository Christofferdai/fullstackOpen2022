const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>total of {sum} exercises</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>

const Course = ({course, total}) => {
  return (
    <>
      <Header course={course.name} />
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}    
      <Total sum={total} />
    </>
   
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return <Course course={course} total={total}/>
}

export default App

