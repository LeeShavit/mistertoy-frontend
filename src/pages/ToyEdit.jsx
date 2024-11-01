import { toyService } from "../services/toy.service"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"


import { saveToy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { MultiSelect } from "./MultiSelect"


export function ToyEdit() {

    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()


    useEffect(() => {
        if (toyId)
            loadToy()
    }, [])

    function loadToy() {
        toyService.get(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Toy details-> failed to load toy', err)
                showErrorMsg('Toy not found')
                navigate('/')
            })
    }


    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function handleChangeLabels(labels){
        setToyToEdit(prevToy => ({ ...prevToy, labels }))

    }


    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy save successfully')
                navigate('/toy')
            })
            .catch(() => {
                showErrorMsg('Failed to save toy')
            })
    }


    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Car</h2>


            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In Stock:</label>
                <input type="checkbox"
                    name="inStock"
                    id="inStock"
                    value={toyToEdit.inStock}
                    onChange={handleChange}
                />
                <MultiSelect parentLabels={toyToEdit.labels} handleChangeLabels={handleChangeLabels} />

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>


    )
}