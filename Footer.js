import React from "react";

const Footer = () => {
  return (
    <react-fragment>
      <footer className="footer-mobile container w-100 px-5 d-md-none bg-body">
        <div className="row text-center">
          <div className="col-4">
            <a
              href="https://uomo-html.flexkitux.com/"
              className="footer-mobile__link d-flex flex-column align-items-center"
            >
              <svg
                className="d-block"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_home" />
              </svg>
              <span>Home</span>
            </a>
          </div>

          <div className="col-4">
            <a
              href="https://uomo-html.flexkitux.com/"
              className="footer-mobile__link d-flex flex-column align-items-center"
            >
              <svg
                className="d-block"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_hanger" />
              </svg>
              <span>Shop</span>
            </a>
          </div>

          <div className="col-4">
            <a
              href="https://uomo-html.flexkitux.com/"
              className="footer-mobile__link d-flex flex-column align-items-center"
            >
              <div className="position-relative">
                <svg
                  className="d-block"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_heart" />
                </svg>
                <span className="wishlist-amount d-block position-absolute js-wishlist-count">
                  3
                </span>
              </div>
              <span>Wishlist</span>
            </a>
          </div>
        </div>
      </footer>
    </react-fragment>
  );
};

export default Footer;
