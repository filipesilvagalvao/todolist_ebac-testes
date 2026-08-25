import styles from "./Task.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

function Task() {
    return (
        <article>
            <div>
                <input type="checkbox" name="" id="" />
            </div>
            <p></p>
            <div>
                <button>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </article>
    )
}

export default Task