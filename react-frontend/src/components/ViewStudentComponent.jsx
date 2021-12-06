import React, { Component } from 'react'
import StudentService from '../services/StudentService'

class ViewStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            Student: {}
        }
    }

    componentDidMount(){
        StudentService.getStudentById(this.state.id).then( res => {
            this.setState({Student: res.data});
        })
    }

    cancel(){
        this.props.history.push('/students');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3 bg-dark">
                    <h3 className = "text-center text-white"> Hallgató adatainak listázása</h3>
                    <div className = "card-body align-self-center">
                        <div className = "row">
                            <label className= "text-white"> Hallgató vezetékneve: </label>
                            <div className= "text-white">{this.state.Student.firstName }</div>
                        </div>
                        <div className = "row">
                            <label className= "text-white"> Hallgató keresztneve: </label>
                            <div className= "text-white"> { this.state.Student.lastName }</div>
                        </div>
                        <div className = "row">
                            <label className= "text-white"> Hallgató email címe: </label>
                            <div className= "text-white"> { this.state.Student.emailId }</div>
                        </div>
                        <div className= "d-flex justify-content-center">
                        <button className="btn btn-warning" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Visszalépés a listához</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewStudentComponent
