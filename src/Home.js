import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

class Home extends React.Component {

    showSearchHelp() {
        alert("Use the sidebar on the left on the search screen to filter the courses.\nThe courses on the right will automatically update as filters are applied.\nYou can use the clear button to reset the search.\nYou can add an entire course or a specific section to your cart.")
    }

    showCartHelp() {
        alert("The cart tab shows your enrolled courses.\nYou can unenroll from an entire course or a specific section\nAn alert will appear when you successfully unenroll from a course.")
    }

    showCompletedHelp() {
        alert("The completed tab shows all of the courses you have completed.\nYou can rate individual courses using the drop-down feature.\nYour ratings will be used to recommend you courses you haven't taken in the recommend tab.")
    }

  render() {
    return (
        <>
        <div class="jumbotron text-center bg-danger text-white">
            <h1 class="display-2">Welcome!</h1>
            <h6 class="display-5">This is the Class Scheduler Application for CS639.</h6>
            
        </div>
        <div class="text-center">
        <h5>Go to the <b>Search</b> tab to find classes and the Cart tab to view courses you have added! <br/>
                The <b>Completed</b> tab allows you to rate courses you have previously taken. <br/>
            The <b>Recommended</b> tab recommends courses based on interest area and ratings of previously taken courses.
            </h5>
            <br/>
            <Button className = "ml-3" variant="dark" onClick={() => this.showSearchHelp()}>Search Help</Button>
            <Button className = "ml-3" variant="dark" onClick={() => this.showCartHelp()}>Cart Help</Button>
            <Button className = "ml-3" variant="dark" onClick={() => this.showCompletedHelp()}>Completed Help</Button>
            <br/>
            <br/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/1200px-Wisconsin_Badgers_logo.svg.png" class="img"></img>
        </div>
      </>
    )
  }
}

export default Home;
