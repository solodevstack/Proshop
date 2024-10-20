import React from 'react';
import { useEffect } from 'react';
import { Navbar, Nav, Container,Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from "react-router-bootstrap"
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import {logout} from "../slices/authSlice"
import SearchBox from '../components/SearchBox.jsx';
import logo from "../assets/logo.png"
const Header = () => {
  const {cartItems} = useSelector((state) => state.cart)
  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();


useEffect(()=>{},[])

  const logoutHandler = async ()=>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')

    }catch(err){
      console.log(err);

    }
  }
  

  return (
   
      <header>
        <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt="" />
              Proshop
              </Navbar.Brand>
              </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <SearchBox />
              <LinkContainer to="/cart"><Nav.Link ><FaShoppingCart /> 
              Cart
              {cartItems.length > 0 && (
                <Badge pill bg="success" style={{marginLeft: "5px"}}>
                  {cartItems.reduce((a, c) => a + c.qty, 0 )}

                </Badge>
                )}
              </Nav.Link></LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin &&(
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productslist'>
                  <NavDropdown.Item >Product</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item >Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item >Order</NavDropdown.Item>
                  </LinkContainer>
                 
                </NavDropdown>
              )}

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

  );
};

export default Header;
