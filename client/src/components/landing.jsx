import React from "react";
import { Link } from "react-router-dom";
import s from '../styles/landing.module.css'

export default function Landing (){
    return <div className={s.mainDiv}>
        <Link className={s.landing} to={'/home'}>Home</Link>
    </div>
}