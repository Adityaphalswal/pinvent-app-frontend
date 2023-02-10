import React, { Children,useState } from 'react'
import "./Sidebar.scss"
import {HiMenuAlt3} from "react-icons/hi"
import { RiProductHuntLine } from 'react-icons/ri';
import menu from '../../data/sidebar';
import SideBarItem from './SideBarItem';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/")
    }
  return (
    <div className='layout'>
        <div className="sidebar" style={{width : isOpen ? "230px" : "60px"}}>

            <div className="top_section">
                <div className="logo" style={{display : isOpen ? "block" : "none"}}>
                    <RiProductHuntLine size={35} style={{cursor:"pointer"}} onClick={goHome}></RiProductHuntLine>
                </div>
                <div className="bars"  style={{marginLeft:isOpen ? "100px" : "0px"}}>
                    <HiMenuAlt3 size={35} onClick={toggle} style={{ cursor:"pointer"}}></HiMenuAlt3>
                </div>
            </div>
            {menu.map((item,index) => {
                return <SideBarItem key={index} item={item} isOpen={isOpen}></SideBarItem>
            })}
        </div> 
        <main style={{paddingLeft : isOpen ? "230px" : "60px", transition : "all .5s"}}>
            {children}
        </main>
    </div>
  );
};

export default Sidebar