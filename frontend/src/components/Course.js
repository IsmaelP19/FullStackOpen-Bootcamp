import React from "react"
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({courses}) => {

  return (
    <div>
      <h1>Web development Curriculum</h1>

      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )
      })}
    </div>
  )
}

export default Course