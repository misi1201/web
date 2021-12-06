import React, { Component } from 'react'
import StudentService from '../services/StudentService';

class CreateStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            StudentService.getStudentById(this.state.id).then( (res) =>{
                let Student = res.data;
                this.setState({firstName: Student.firstName,
                    lastName: Student.lastName,
                    emailId : Student.emailId
                });
            });
        }        
    }
    saveOrUpdateStudent = (e) => {
        e.preventDefault();
        let Student = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('Student => ' + JSON.stringify(Student));

        // step 5
        if(this.state.id === '_add'){
            StudentService.createStudent(Student).then(res =>{
                this.props.history.push('/students');
            });
        }else{
            StudentService.updateStudent(Student, this.state.id).then( res => {
                this.props.history.push('/students');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/students');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center text-white">Új hallgató hozzáadása</h3>
        }else{
            return <h3 className="text-center text-white">Hallgatói adatok módosítása</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 bg-dark">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label className="text-white"> Hallgató vezetékneve: </label>
                                            <input placeholder="Vezetéknév" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label className="text-white"> Hallgató keresztneve: </label>
                                            <input placeholder="Keresztnév" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label className="text-white"> Hallgató email címe: </label>
                                            <input placeholder="Email cím" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className= "d-flex justify-content-center">
                                         <button className="btn btn-warning" onClick={this.saveOrUpdateStudent}>Mentés</button>
                                         <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Mégse</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateStudentComponent
