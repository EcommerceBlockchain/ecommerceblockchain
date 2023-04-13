import React from "react";

function Transactions() {
  return (
    <div>
      <p>Transactions</p>
      {/* {userProfileData.transaction.map((item) => {
        return <h5>{item}</h5>;
      })} */}
      <table class="user-table align-items-center table table-hover">
        <thead>
          <tr>
            <th class="border-bottom">#</th>
            <th class="border-bottom">Bill For</th>
            <th class="border-bottom">Issue Date</th>
            <th class="border-bottom">Due Date</th>
            <th class="border-bottom">Total</th>
            <th class="border-bottom">Status</th>
            <th class="border-bottom">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300500
              </a>
            </td>
            <td>
              <span class="fw-normal">Platinum Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">12 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">12 May 2023</span>
            </td>
            <td>
              <span class="fw-normal">$799.00</span>
            </td>
            <td>
              <span class="fw-normal text-success">Paid</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300499
              </a>
            </td>
            <td>
              <span class="fw-normal">Platinum Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">11 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">11 May 2023</span>
            </td>
            <td>
              <span class="fw-normal">$799.00</span>
            </td>
            <td>
              <span class="fw-normal text-success">Paid</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300498
              </a>
            </td>
            <td>
              <span class="fw-normal">Platinum Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">11 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">11 May 2023</span>
            </td>
            <td>
              <span class="fw-normal">$799.00</span>
            </td>
            <td>
              <span class="fw-normal text-success">Paid</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300497
              </a>
            </td>
            <td>
              <span class="fw-normal">Flexible Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">10 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">10 May 2023</span>
            </td>
            <td>
              <span class="fw-normal">$233.00</span>
            </td>
            <td>
              <span class="fw-normal text-success">Paid</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300496
              </a>
            </td>
            <td>
              <span class="fw-normal">Gold Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">12 Mar 2023</span>
            </td>
            <td>
              <span class="fw-normal">12 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">$533.00</span>
            </td>
            <td>
              <span class="fw-normal text-warning">Due</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300495
              </a>
            </td>
            <td>
              <span class="fw-normal">Gold Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">10 Mar 2023</span>
            </td>
            <td>
              <span class="fw-normal">10 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">$533.00</span>
            </td>
            <td>
              <span class="fw-normal text-warning">Due</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300494
              </a>
            </td>
            <td>
              <span class="fw-normal">Flexible Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">09 Mar 2023</span>
            </td>
            <td>
              <span class="fw-normal">09 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">$233.00</span>
            </td>
            <td>
              <span class="fw-normal text-warning">Due</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300493
              </a>
            </td>
            <td>
              <span class="fw-normal">Gold Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">24 Feb 2023</span>
            </td>
            <td>
              <span class="fw-normal">24 Mar 2023</span>
            </td>
            <td>
              <span class="fw-normal">$533.00</span>
            </td>
            <td>
              <span class="fw-normal text-danger">Canceled</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300492
              </a>
            </td>
            <td>
              <span class="fw-normal">Platinum Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">13 Feb 2023</span>
            </td>
            <td>
              <span class="fw-normal">13 Jan 2023</span>
            </td>
            <td>
              <span class="fw-normal">$799.00</span>
            </td>
            <td>
              <span class="fw-normal text-danger">Canceled</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <a class="fw-normal card-link" href="#/examples/invoice">
                300491
              </a>
            </td>
            <td>
              <span class="fw-normal">Platinum Subscription Plan</span>
            </td>
            <td>
              <span class="fw-normal">07 Apr 2023</span>
            </td>
            <td>
              <span class="fw-normal">07 May 2023</span>
            </td>
            <td>
              <span class="fw-normal">$799.00</span>
            </td>
            <td>
              <span class="fw-normal text-success">Paid</span>
            </td>
            <td>
              <div role="group" class="dropdown btn-group">
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  class="text-dark m-0 p-0 dropdown-toggle dropdown-toggle-split btn btn-link"
                >
                  <span class="icon icon-sm">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      class="svg-inline--fa fa-ellipsis-h fa-w-16 icon-dark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
