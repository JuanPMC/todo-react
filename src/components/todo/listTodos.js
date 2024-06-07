import { useEffect, useState } from "react";
import { deleteTodoId, retreveAllUsersTodos } from "../api/todoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodos() {

    const context = useAuth()
    const [todos, setTodos] = useState([])
    const username = context.username
    const navegate = useNavigate()


    function refreshTodos(){
        retreveAllUsersTodos(username)
            .then((response) => setTodos(response.data))
            .catch((error) => console.log(error))
    }

    function deleteTodo(user,id){
        console.log("Delete todo: " + id)
        deleteTodoId(user,id).finally(refreshTodos)
    }
    function updateTodo(user,id){
        navegate(`/todos/${id}`)
    }

    function createTodo(){
        navegate(`/todos/-1`)
    }

    useEffect(() => refreshTodos(),[])

    return (
    <div className="container">
        <h1>ListTodos</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>
                    Description
                    </th>
                    <th>
                        Is Done?
                    </th>
                    <th>
                        Target date
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>

            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.id}>
                        <td>
                            {todo.description}
                        </td>
                        <td>
                            {todo.done.toString()}
                        </td>
                        <td>
                            {todo.targetDate}
                        </td>
                        <td>
                            <button className="btn btn-warning m-1" onClick={() => deleteTodo(username,todo.id)} > Delete </button>
                            <button className="btn btn-success m-1" onClick={() => updateTodo(username,todo.id)} > Update </button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>
        <div>
            <button className="btn btn-success m-5" onClick={createTodo}>Create todo</button>
        </div>
    </div>
    );
}

export default ListTodos;
