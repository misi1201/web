import React, { Component } from 'react'
import StudentService from '../services/StudentService'

class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                Students: []
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(id){
        StudentService.deleteStudent(id).then( res => {
            this.setState({Students: this.state.Students.filter(Student => Student.id !== id)});
        });
    }
    viewStudent(id){
        this.props.history.push(`/view-student/${id}`);
    }
    editStudent(id){
        this.props.history.push(`/add-student/${id}`);
    }

    componentDidMount(){
        StudentService.getStudents().then((res) => {
            this.setState({ Students: res.data});
        });
    }

    addStudent(){
        this.props.history.push('/add-student/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Hallgatók tárolására fejlesztett alkalmazás</h2>

                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-dark">

                            <thead>
                                <tr>
                                    <th className="text-center"> Hallgató vezetékneve</th>
                                    <th className="text-center"> Hallgató keresztneve</th>
                                    <th className="text-center"> Hallgató email címe</th>
                                    <th className="text-center"> Műveletek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Students.map(
                                        Student => 
                                        <tr key = {Student.id}>
                                             <td className="text-center"> {Student.firstName} </td>   
                                             <td className="text-center"> {Student.lastName}</td>
                                             <td className="text-center"> {Student.emailId}</td>
                                             <td className="text-center">
                                                 <button onClick={ () => this.editStudent(Student.id)} className="btn btn-warning">Frissítés</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewStudent(Student.id)} className="btn btn-warning">Nézet</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStudent(Student.id)} className="btn btn-danger">Törlés</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
                 <div  className="d-flex justify-content-center">
                 <button className="btn btn-secondary" onClick={this.addStudent}>Hozzáadás</button>
                </div>
            </div>
        )
    }
}

export default ListStudentComponent
