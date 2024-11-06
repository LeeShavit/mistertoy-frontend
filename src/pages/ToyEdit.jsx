import { toyService } from "../services/toy.service"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ClearIcon from '@mui/icons-material/Clear';

import { saveToy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { MultiSelect } from "../cmps/MultiSelect"
import { uploadImg } from "../services/cloudinary.service.js";


export function ToyEdit() {

    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const options = toyService.getLabels()


    useEffect(() => {
        if (toyId)
            loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.get(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Toy Edit-> failed to load toy', err)
            showErrorMsg('Toy not found')
            navigate('/')
        }
    }


    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    async function handleImgChange(ev){
        try{
        const url= await uploadImg(ev)
        setToyToEdit(prevToy => ({ ...prevToy, url }))
        }catch(err){
        showErrorMsg('Failed to upload img')
        }
    }

    function handleSelectChange(value) {
        setToyToEdit(prevToy => ({ ...prevToy, labels: value }))
    }


    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toyToEdit)
            showSuccessMsg('Toy save successfully')
            navigate('/toy')
        } catch (err) {
            showErrorMsg('Failed to save toy')
        }
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>


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
                <MultiSelect className="select" options={options} parentOptions={toyToEdit.labels} handleSelectChange={handleSelectChange} field={'labels'} />
                <input type="file" onChange={handleImgChange}/>
                <div>
                    <button className="btn">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link className="btn" to="/toy"><ClearIcon /></Link>
                </div>
            </form>
        </section>


    )
}