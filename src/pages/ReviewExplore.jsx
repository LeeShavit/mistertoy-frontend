import { useEffect, useState } from "react"

import { MultiSelect } from "../cmps/MultiSelect.jsx"
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import { reviewService } from "../services/review.service.js"
import { toyService } from "../services/toy.service.js";
import { userService } from "../services/user.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ReviewsList } from "../cmps/ReviewsList.jsx";


export function ReviewExplore() {

    const [filterBy, setFilterBy] = useState(reviewService.getDefaultFilter())
    const [userList, setUserList] = useState(null)
    const [toyList, setToyList] = useState(null)

    useEffect(()=>{
        loadLists()
    },[])

    async function loadLists() {
        try{
            const toys= await toyService.getToysList()
            setToyList(toys)
            const users= await userService.getUsersList()
            setUserList(users)
        }catch(err){
            console.log(err)
            showErrorMsg('failed')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    function onSaveFilterBy(ev) {
        ev.preventDefault()
        setFilterBy(filterBy)
    }

    function handleSelectChange(value,field) {
        value= value.length ? value.map(val=> val.split('^')[1]) : ''
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
        console.log(filterBy)
    }

    return (
        <>
        <section className="filter">
            <form onSubmit={onSaveFilterBy} >
                <label htmlFor="txt">Text: </label>
                <input type="text"
                    name="txt"
                    id="txt"
                    placeholder="Enter text..."
                    value={filterBy.txt}
                    onChange={handleChange}
                />
                <div>
                    { userList && <MultiSelect className="select" options={userList} parentOptions={filterBy.users} handleSelectChange={handleSelectChange} field={'users'}/>}
                    { toyList && <MultiSelect className="select" options={toyList} parentOptions={filterBy.toys} handleSelectChange={handleSelectChange} field={'toys'}/>}
                </div>
            </form>
            <div className="filter-btns">

                <button className="btn" onClick={onSaveFilterBy}><SearchIcon/></button>
                <button className="btn" onClick={() => setFilterByToEdit(reviewService.getDefaultFilter())}><ClearIcon/></button>
            </div>
        </section>
        <ReviewsList filterBy={filterBy}/>
        </>


    )
}