import { useEffect, useState } from "react"
import Select from "react-select"
import makeAnimated from 'react-select/animated';
import { MultiSelect } from "./MultiSelect"
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';


import { toyService } from "../services/toy.service"


export function ToyFilter({ filterBy, setFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const options = toyService.getLabels()
    const animatedComponents = makeAnimated();

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setFilterByToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }


    function onSaveFilterBy(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }

    function handleSelectChange(value) {
        setFilterByToEdit(prevToy => ({ ...prevToy, labels: value }))
    }

    return (
        <section className="filter">

            <form onSubmit={onSaveFilterBy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={filterByToEdit.price}
                    onChange={handleChange}
                />
                <div>

                    <label htmlFor="inStock">Stock</label>
                    <select onChange={handleChange} name="inStock" id="inStock" value={filterByToEdit.inStock}>
                        <option value=''>All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out Of Stock</option>
                    </select>

                    <label htmlFor="sort">Sort:</label>
                    <select onChange={handleChange} name="sort" id="sort" value={filterByToEdit.sort}>
                        <option value=''></option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="created">Date</option>
                    </select>
                    <MultiSelect className="select" options={options} parentOptions={filterByToEdit.labels} handleSelectChange={handleSelectChange} field={'labels'} />
                </div>
            </form>
            <div className="filter-btns">

                <button className="btn" onClick={onSaveFilterBy}><SearchIcon/></button>
                <button className="btn" onClick={() => setFilterByToEdit(toyService.getDefaultFilter())}><ClearIcon/></button>
            </div>
        </section>


    )
}