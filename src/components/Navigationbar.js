import React from 'react'
import {Navbar,Container,Nav, Button} from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

function Navigationbar(props){
  const activeLink={
    color:"orange",
    fontWeight:'bold',
    fontSize:"120%"  
  };
  const inactiveLink={
    color:'red',
    fontSize:"120%" 
  };
  let navigate=useNavigate();
  function Logout(){
    props.setCurrentUser("");
    navigate('/')
  }
    return(
        <div>
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6iRcPIckSZO4ZStCeHLyOcaykFyBHPtmr9w&usqp=CAU' 
          className='w-25'/></Navbar.Brand>
          <Nav className="me-0">
              <NavLink to="/products" className='nav-link' style={({isActive})=>{return isActive?activeLink:inactiveLink}}>Products</NavLink>
              <NavLink to="/bill" className='nav-link' style={({isActive})=>{return isActive?activeLink:inactiveLink}}>Cart</NavLink>
              <NavLink to="/billpage" className='nav-link' style={({isActive})=>{return isActive?activeLink:inactiveLink}}>Bill</NavLink>
              <Button className='btn btn-danger rounded-3' onClick={Logout}>Logout</Button>
            </Nav>
        </Container>
      </Navbar>
      </div>
    )
}

export default Navigationbar;