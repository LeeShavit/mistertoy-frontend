import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';


import { toyService } from "../services/toy.service";
import { showErrorMsg } from "../services/event-bus.service";
import { useSelector } from "react-redux";
import { ReviewsList } from "../cmps/ReviewsList";

export function UserDetails() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeToyMsg(toy._id, msgId)
            const newMsgs = toy.msgs.filter(msg => msg.id !== msgId)
            setToy(prevToy => ({ ...prevToy, msgs: newMsgs }))
        } catch (err) {
            console.log('Toy msgs-> failed to remove msg', err)
            showErrorMsg('msg not removed')
        }
    }

    if (!user) return <div>Loading...</div>

    return (
        <section className="user-details">
            <h3>{user.fullname} {user.balance}</h3>
            {user.isAdmin && <h4>Administrator</h4>}
            <ReviewsList filterBy={{users:[user._id]}} user={user} />
        </section>
    )
}
