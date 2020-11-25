import React from 'react';
import './App.css';
import RecommendedCourse from './RecommendedCourse';

class RecommendedCourseArea extends React.Component {
  getCourses() {
    let courses = [];

    //console.log(this.props.data.length)
      if (Array.isArray(this.props.data)){
        for(let i =0; i < this.props.data.length; i++){
         courses.push (
           <RecommendedCourse key={i} data={this.props.data[i]}/>
         )
       }
     }
     else{
       for(const course of Object.keys(this.props.data)){
         courses.push (
           <RecommendedCourse key={this.props.data[course].number} data={this.props.data[course]}/>
         )
       }
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

export default RecommendedCourseArea;
