import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';

class RecommendedCourse extends React.Component {

  getCourseName() {
    //console.log(this.props.data)
    if (this.props.data.number == null) {
      return this.props.data.name;
    } else {
      return this.props.data.number;
    }
  }

  handleReasoning() {
    return ""
  }

  render() {
    return (
<Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
<Card.Body>
  <Card.Title>
    <div style={{maxWidth: 250}}>
      <>{this.getCourseName()}</>
    </div>
  </Card.Title>
  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        {this.handleReasoning()}
</Card.Body>
</Card>
    )
  }
}

export default RecommendedCourse;
