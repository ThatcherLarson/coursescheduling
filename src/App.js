import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CompletedCourseArea from './CompletedCourseArea';
import RecommendedCourseArea from './RecommendedCourseArea';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
      filteredCourses: [],
      subjects: [],
      cartCourses: {},
      completedCourses: [],
      keywordsAndSubjects: [],
      ratedCourses: [],
      recommendedCourses: []
    };
  }



  componentDidMount() {
   this.loadInitialState()
  }

  async loadInitialState(){
    let courseURL = "http://mysqlcs639.cs.wisc.edu:53706/api/react/classes";
    let courseData = await (await fetch(courseURL)).json()

    let completedCourseURL = "http://mysqlcs639.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed"
    let completedCourseData = await (await fetch(completedCourseURL)).json()

    this.setState({allCourses: courseData, filteredCourses: courseData, subjects: this.getSubjects(courseData), completedCourses: completedCourseData.data, keywordsAndSubjects: this.getSubjectsAndKeywords(courseData)});

  }


  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(let i = 0; i < data.length; i++) {
      if(subjects.indexOf(data[i].subject) === -1)
        subjects.push(data[i].subject);
    }

    return subjects;
  }

  getSubjectsAndKeywords(data) {
    let subjectsAndKeywords = []

    subjectsAndKeywords.push("All");

    for(let i = 0; i < data.length; i++) {
      if(subjectsAndKeywords.indexOf(data[i].subject) === -1)
      subjectsAndKeywords.push(data[i].subject);
    }

     for(let j = 0; j < data.length; j++) {
       for(let k = 0; k < data[j].keywords.length; k++) {
         if(subjectsAndKeywords.indexOf(data[j].keywords[k]) === -1)
             subjectsAndKeywords.push(data[j].keywords[k]);
       }
   }

    return subjectsAndKeywords;
  }

  setCourses(courses) {
    this.setState({
      filteredCourses: courses
    }, 
    () => {
      
    const shuffledCourses = this.state.filteredCourses.sort(() => 0.5 - Math.random());

    //will not recommend courses you have already taken
    for(let i = 0; i < shuffledCourses.length; i++) {
      if (this.state.completedCourses.includes(shuffledCourses[i].number)) {
        shuffledCourses.splice(i, 1);
      }
    }

    // get a random 3 courses of selected interest that you haven't taken
    let selectedCourses = shuffledCourses.slice(0, 3);

    this.setState({recommendedCourses: selectedCourses})
    }
    )

   
  }

  setRatedCourses(courses) {
    this.setState({
      ratedCourses: courses
    },
    () => {
     this.ratedCoursesHelper(this.state.ratedCourses.slice(6, this.state.ratedCourses.length));
    }
    )
    
  }

  ratedCoursesHelper(courses) {
    let onlyThreePlusRating = []

    //adds all courses rated 3 or higher to an array
    for(let i = 0; i < courses.length; i++) {
      if (courses[i].rating > 2) {
        onlyThreePlusRating.push(courses[i]);
      }
    }
    let needMoreInfo = []

    //gets all info for courses rated 3 or higher
    for (let i = 0; i<this.state.allCourses.length; i++) {
      for (let j = 0; j<onlyThreePlusRating.length; j++) {
        if (onlyThreePlusRating[j].name === this.state.allCourses[i].number) {
          needMoreInfo.push(this.state.allCourses[i]);
        }
      }
    }

    //seperates the keywrods from courses rated 3+
    let ratedKeywords = this.getSubjectsAndKeywords(needMoreInfo);
    ratedKeywords = ratedKeywords.splice(1, ratedKeywords.length);


    let finalRecommendations = []

    //console.log(this.state.filteredCourses)
    //console.log(ratedKeywords)
    

    //adds all courses from filteredCourses with at least 1 matching keyword to recommendations
    //TAKES SIDEBAR FILTERING INTO ACCOUNT.  If you want recommendations only based on rankings, make sure no filtering is on
    for(let k = 0; k < this.state.filteredCourses.length; k++) {
      let numMatching = this.matchingNumberKeywords(ratedKeywords, this.state.filteredCourses[k].keywords);
      if (numMatching > 1) {
        if (!this.state.completedCourses.includes(this.state.filteredCourses[k].number)) {
          finalRecommendations.push(this.state.filteredCourses[k]);
        }
      }
    }
    
    
    this.updateRecommended(finalRecommendations);
  }

  //calculates matching number of keywords between highly rated courses and every course in filteredCourses
  matchingNumberKeywords(keywords, course) {
    let numMatches = 0;

    for (let i = 0; i <keywords.length; i++) {
      for (let j = 0; j <course.length; j++) {
        if (keywords[i] === course[j]) {
          numMatches++;
        }
      }
    }
    return numMatches;
  }

  updateRecommended(courses) {
    this.setState({recommendedCourses: courses})
  }


  addCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses))// I think this is a hack to deepcopy
    let courseIndex = this.state.allCourses.findIndex((x) => {return x.number===data.course})

    console.log(this.state.allCourses[courseIndex])

    //alerts user if they have already taken that course
    if (this.state.completedCourses.includes(data.course)) {
      alert("You have already completed this course.  You can remove it from your cart if this was a mistake.")
    }

    

    for(let i = 0; i < this.state.allCourses[courseIndex].requisites.length; i++) {
      let arrCopy = this.state.allCourses[courseIndex].requisites[i];
      const found = arrCopy.some(r=> this.state.completedCourses.indexOf(r) >= 0)
      //console.log(found)
      if (found === false) {
        alert("You have not met the requisites for this course.\nPlease enroll in one of the following: " + arrCopy.join(' or '))
      }
      
  }

    if (courseIndex === -1)
    {
      return 
    }

    if('subsection' in data) {
      if(data.course in this.state.cartCourses) {
        if(data.section in this.state.cartCourses[data.course]) {
          newCartCourses[data.course][data.section].push(data.subsection);
        }
        else {
          newCartCourses[data.course][data.section] = [];
          newCartCourses[data.course][data.section].push(data.subsection);
        }
      }
      else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        newCartCourses[data.course][data.section].push(data.subsection);
      }
    }
    else if('section' in data) {
      if(data.course in this.state.cartCourses) {
        newCartCourses[data.course][data.section] = [];

        for(let i = 0; i < this.state.allCourses[courseIndex].sections[data.section].subsections.length; i++) {
          newCartCourses[data.course][data.section].push(this.state.allCourses[courseIndex].sections[data.section].subsections[i]);
        }
      
      
      }
      else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        for(let i = 0; i < this.state.allCourses[courseIndex].sections[data.section].subsections.length; i++) { 
          newCartCourses[data.course][data.section].push(this.state.allCourses[courseIndex].sections[data.section].subsections[i]);
        }
      }
    }
    else {
      newCartCourses[data.course] = {};


      for (let i = 0; i < this.state.allCourses[courseIndex].sections.length; i++){
        newCartCourses[data.course][i] = [];

         for(let c= 0; c < this.state.allCourses[courseIndex].sections[i].subsections.length; c ++){
          newCartCourses[data.course][i].push(this.state.allCourses[courseIndex].sections[i].subsections[c]);
        }

      }


    }
    this.setState({cartCourses: newCartCourses});
  }

  removeCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses))



    if('subsection' in data) {
      newCartCourses[data.course][data.section].splice(newCartCourses[data.course][data.section].indexOf(data.subsection), 1);
      if(newCartCourses[data.course][data.section].length === 0) {
        delete newCartCourses[data.course][data.section];
      }
      if(Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    }
    else if('section' in data) {
      delete newCartCourses[data.course][data.section];
      if(Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    }
    else {
      delete newCartCourses[data.course];
    }

    alert("Course Removed from cart.")
    this.setState({cartCourses: newCartCourses});
  }

  getCartData() {
    let cartData = [];

    for(const courseKey of Object.keys(this.state.cartCourses)) {
      let course = this.state.allCourses.find((x) => {return x.number === courseKey})

      cartData.push(course);
    }
    return cartData;
  }

  render() {

    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <Tabs defaultActiveKey="homePage" style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white'}}>
        <Tab eventKey="homePage" title="Home" style={{paddingTop: '5vh'}}>
            <div>
              <Home />
            </div>
          </Tab>
          <Tab eventKey="search" title="Search" style={{paddingTop: '5vh'}}>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} subjectsAndKeywords = {this.state.keywordsAndSubjects}/>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} addCartCourse={(data) => this.addCartCourse(data)} removeCartCourse={(data) => this.removeCartCourse(data)} cartCourses={this.state.cartCourses}/>
            </div>
          </Tab>
          <Tab eventKey="cart" title="Cart" style={{paddingTop: '5vh'}}>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.getCartData()} addCartCourse={(data) => this.addCartCourse(data)} removeCartCourse={(data) => this.removeCartCourse(data)} cartCourses={this.state.cartCourses}/>
            </div>
          </Tab>
          <Tab eventKey="completedCourses" title="Completed" style={{paddingTop: '5vh'}}>
            <div style={{marginLeft: '20vw'}}>
              <CompletedCourseArea data={this.state.completedCourses} ratedCourses = {this.state.completedCourses} setRatedCourses={(courses) => this.setRatedCourses(courses)} />
            </div>
          </Tab>
          <Tab eventKey="recommendedCourses" title="Recommended" style={{paddingTop: '5vh'}}>
            <div style={{marginLeft: '20vw'}}>
              <RecommendedCourseArea data={this.state.recommendedCourses}/>
            </div>
          </Tab>
        </Tabs>
      </>
    )
  }
}

export default App;
