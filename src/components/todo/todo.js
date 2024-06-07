import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { createTodoId, retreveTodoId, updateTodoId } from "../api/todoApiService";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";

function Todo() {

    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState("")
    const navigate = useNavigate()


    function refreshTodo(){
        // it its updating
        if ( id !== "-1" ){
            retreveTodoId(username,id)
            .then((response) => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
        }

    }

    function onSubmit(values){
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            isDone: false
        }

        if ( id === "-1") {
            // create todo
            console.log("Creando todo")
            createTodoId(username,todo).then(() => navigate("/list"))
        }else{
            // update the tudo
            updateTodoId(username,id,todo).then(()=> navigate("/list"))
        }

        
    }
    function validate(values){
        let errors = {}
        if (values.description.length < 10)
            errors = {description: "error on description"}
        return errors
    }

    useEffect(refreshTodo,[id])

    return (
    <div className="container">
        <h1>Enter the updated details</h1>
        <div>
            <Formik initialValues={{description,targetDate}} enableReinitialize={true} onSubmit={onSubmit} validate={validate}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Update</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    </div>
    );
}

export default Todo;
