import React from "react";
import { useNavigate } from "react-router-dom";

const UserHeader = ({ setLoginType }) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.setItem("LoginType", null);
    setLoginType(null);
    navigate("/");
  };
  return (
    <react-fragment>
      <div className="header-mobile header_sticky">
        <div className="container d-flex align-items-center h-100">
          <a
            className="mobile-nav-activator d-block position-relative"
            href="#"
          >
            <svg
              className="nav-icon"
              width="25"
              height="18"
              viewBox="0 0 25 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_nav" />
            </svg>
            <span className="btn-close-lg position-absolute top-0 start-0 w-100"></span>
          </a>

          <div className="logo">
            <a href="index.html">
              <img
                src="../images/logo.png"
                alt="Uomo"
                className="logo__image d-block"
              />
            </a>
          </div>

          <a
            href="#"
            className="header-tools__item header-tools__cart js-open-aside"
            data-aside="cartDrawer"
          >
            <svg
              className="d-block"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_cart" />
            </svg>
            <span className="cart-amount d-block position-absolute js-cart-items-count">
              3
            </span>
          </a>
        </div>

        <nav className="header-mobile__navigation navigation d-flex flex-column w-100 position-absolute top-100 bg-body overflow-auto">
          <div className="container">
            <form
              action="https://uomo-html.flexkitux.com/Demo1/search.html"
              method="GET"
              className="search-field position-relative mt-4 mb-3"
            >
              <div className="position-relative">
                <input
                  className="search-field__input w-100 border rounded-1"
                  type="text"
                  name="search-keyword"
                  placeholder="Search products"
                />
                <button
                  className="btn-icon search-popup__submit pb-0 me-2"
                  type="submit"
                >
                  <svg
                    className="d-block"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon_search" />
                  </svg>
                </button>
                <button
                  className="btn-icon btn-close-lg search-popup__reset pb-0 me-2"
                  type="reset"
                ></button>
              </div>

              <div className="position-absolute start-0 top-100 m-0 w-100">
                <div className="search-result"></div>
              </div>
            </form>
          </div>

          <div className="container">
            <div className="overflow-hidden">
              <ul className="navigation__list list-unstyled position-relative">
                <li className="navigation__item">
                  <a href="/UserDashboard" className="navigation__link">
                    Home
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/UserProfile" className="navigation__link">
                    Profile
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/ViewProducts" className="navigation__link">
                    View Products
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/ViewCarts" className="navigation__link">
                    View Cart
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/ViewOrders" className="navigation__link">
                    View Orders
                  </a>
                </li>
                <li className="navigation__item">
                  <a onClick={Logout} className="navigation__link">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <header id="header" className="header header_sticky">
        <div className="container">
          <div className="header-desk header-desk_type_1">
            <div className="logo">
              <a href="index.html">
                <img
                  src="images/logo.png"
                  alt="Uomo"
                  className="logo__image d-block"
                />
              </a>
            </div>

            <nav className="navigation">
              <ul className="navigation__list list-unstyled d-flex">
                <li className="navigation__item">
                  <a href="/UserDashboard" className="navigation__link">
                    Home
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/UserProfile" className="navigation__link">
                    Profile
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/ViewProducts" className="navigation__link">
                    View Products
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/ViewCarts" className="navigation__link">
                    View Cart
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="/ViewOrders" className="navigation__link">
                    View Orders
                  </a>
                </li>
                <li className="navigation__item">
                  <a onClick={Logout} className="navigation__link">
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </react-fragment>
  );
};

export default UserHeader;
