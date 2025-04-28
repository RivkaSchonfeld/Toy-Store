//only if identified as manager we can show the details of the categories
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"


export const Nav = () => {
    const customer = useSelector(i => i.custred.currentCustomer)
    let manager = (customer._id == "676d4cd8d34e255f0e7231c6")//i am the manager

    return <div id="nav">
        <nav id="myNavbar">
        <NavLink className="navLink" to="/Homepage">Home Page</NavLink>
        <NavLink className="navLink" to="/login">Login</NavLink>
        <NavLink className="navLink" to="/register">Register</NavLink>
        <NavLink className="navLink" to="/cart">Cart</NavLink>
        <NavLink className="navLink" to="/gameList">Games</NavLink>
        {customer.name != "unknown" && <NavLink className="navLink" to="/personelpage">Personel Purchases</NavLink>}
        {manager && <NavLink className="navLink" to="/editcategories">Edit Categories</NavLink>}
        {manager && <NavLink className="navLink" to="/editgames">Edit Games</NavLink>}
    </nav>
    </div>
}

{/*
    
    <header>
    <nav>
      <a href="homePage.html">Home</a>
      <a href="aboutPage.html">About</a>
      <div class="drop">
        <a href="projectsPage.html">Projects</a>
        <div class="open_list">
          <a href="">Hotels</a>
          <a href="">Villas</a>
          <a href="">Reastaurants</a>
          <a href="">Other</a>
        </div>
      </div>
      <a href="ourTeam.html">Our Team</a>
      <a href="contact.html">Contact Us</a>
    </nav>
  </header>*/}
