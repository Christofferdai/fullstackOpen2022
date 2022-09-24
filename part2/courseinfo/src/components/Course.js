const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h2>total of {sum} exercises</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
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

export default Course

