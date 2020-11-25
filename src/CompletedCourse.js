import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class CompletedCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          expanded: false,
          showModal: false
        }
        this.courseRating = React.createRef();
      }

      setCourseRatings() {
       if (this.courseRating.current.value !== "Please Rate Course" && this.courseRating.current.value !== null) {
         var ratedCourse = {
           name: this.props.data,
           rating: this.courseRating.current.value
        }
        this.props.ratedCourses.push(ratedCourse)
        //console.log(this.props.ratedCourses)
        this.props.setRatedCourses(this.props.ratedCourses)
      }
    }
      

  render() {
      //console.log(this.props.data)
    return (
<Card style={{width: '33%', marginTop: '5px', marginBottom: '5px'}}>
<Card.Body>
  <Card.Title>
    <div style={{maxWidth: 250}}>
      {this.props.data}
    </div>
  </Card.Title>
  <Card.Subtitle className="mb-2 text-muted"> <br/></Card.Subtitle>
  <Form>
  <Form.Group controlId="courseRatingArea">
                <Form.Label>Rate Course</Form.Label>
                <Form.Control as="select" ref={this.courseRating} onClick={() => this.setCourseRatings()}>
                  <option>Please Rate Course</option>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
  </Form.Group>
  </Form>
</Card.Body>
</Card>
    )
  }
  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  setExpanded(value) {
    this.setState({expanded: value});
  }

  getExpansionButton() {
    let buttonText = '▼';
    let buttonOnClick = () => this.setExpanded(true);

    if(this.state.expanded) {
      buttonText = '▲';
      buttonOnClick = () => this.setExpanded(false)
    }

    return (
      <Button variant='outline-dark' style={{width: 25, height: 25, fontSize: 12, padding: 0, position: 'absolute', right: 20, top: 20}} onClick={buttonOnClick}>{buttonText}</Button>
    )
  }
}

export default CompletedCourse;
