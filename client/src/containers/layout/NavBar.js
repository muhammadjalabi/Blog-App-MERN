import React from "react";
import PropTypes from "prop-types";
import NavigationBar from "../../components/layout/NavigationBar";
import { connect } from "react-redux";
import { logout } from "../../actions/authentication_actions";

const NavBar = ({ auth, logout }) => {

  const handleClick = event => {
    event.preventDefault();
    logout()
  }




  return (
    <NavigationBar auth={auth.isAuthenticated} onClick={handleClick} />
  )
}
const mapStateToProps = state => ({
  auth: state.auth
});

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);