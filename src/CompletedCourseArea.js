import React from 'react';
import './App.css';
import CompletedCourse from './CompletedCourse';

class CompletedCourseArea extends React.Component {
  getCourses() {
    let courses = [];

    //console.log(this.props.data.length)
    
    for(let i =0; i < this.props.data.length; i++){
        courses.push (
          <CompletedCourse key={i} data={this.props.data[i]} ratedCourses = {this.props.ratedCourses} setRatedCourses={(courses) => this.props.setRatedCourses(courses)}/>
        )
      }

    return courses;
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
  }

  render() {
    
    return (
      <div style={{margin: 5, marginTop: 5}}>
        {this.getCourses()}
      </div>
    )
  }

  
}

export default CompletedCourseArea;
