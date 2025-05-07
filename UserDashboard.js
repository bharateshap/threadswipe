import React from "react";

const UserDashboard = () => {
  return (
    <react-fragment>
      <main>
        <div className="mb-3 pb-3 mb-md-4 pb-md-4 mb-xl-5 pb-xl-5"></div>
        <div className="pb-1"></div>

        <section
          className="collections-grid collections-grid_masonry"
          id="section-collections-grid_masonry"
        >
          <div className="container h-md-100">
            <div className="row h-md-100">
              <div className="col-lg-6 h-md-100">
                <div className="collection-grid__item position-relative h-md-100">
                  <div
                    className="background-img"
                    style={{
                      backgroundImage: "url('images/collection_grid_1.jpg')",
                    }}
                  ></div>
                  <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                    <p className="text-uppercase mb-1">Hot List</p>
                    <h3 className="text-uppercase">
                      <strong>Women</strong> Collection
                    </h3>
                    <a
                      href="/UserDashboard"
                      className="btn-link default-underline text-uppercase fw-medium"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 d-flex flex-column">
                <div className="collection-grid__item position-relative flex-grow-1 mb-lg-4">
                  <div
                    className="background-img"
                    style={{
                      backgroundImage: "url('images/collection_grid_2.jpg')",
                    }}
                  ></div>
                  <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                    <p className="text-uppercase mb-1">Hot List</p>
                    <h3 className="text-uppercase">
                      <strong>Men</strong> Collection
                    </h3>
                    <a
                      href="/UserDashboard"
                      className="btn-link default-underline text-uppercase fw-medium"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
                <div className="position-relative flex-grow-1 mt-lg-1">
                  <div className="row h-md-100">
                    <div className="col-md-6 h-md-100">
                      <div className="collection-grid__item h-md-100 position-relative">
                        <div
                          className="background-img"
                          style={{
                            backgroundImage:
                              "url('images/collection_grid_3.jpg')",
                          }}
                        ></div>
                        <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                          <p className="text-uppercase mb-1">Hot List</p>
                          <h3 className="text-uppercase">
                            <strong>Kids</strong> Collection
                          </h3>
                          <a
                            href="/UserDashboard"
                            className="btn-link default-underline text-uppercase fw-medium"
                          >
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 h-md-100">
                      <div className="collection-grid__item h-md-100 position-relative">
                        <div
                          className="background-img"
                          style={{ backgroundColor: "#f5e6e0" }}
                        ></div>
                        <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                          <h3 className="text-uppercase">
                            <strong>E-Gift</strong> Cards
                          </h3>
                          <p className="mb-1">
                            Surprise someone with the gift they
                            <br />
                            really want.
                          </p>
                          <a
                            href="shop1.html"
                            className="btn-link default-underline text-uppercase fw-medium"
                          >
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
      </main>
    </react-fragment>
  );
};

export default UserDashboard;
