import React from 'react';
import './dashboardrecruiter.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Profile from '../../../images/avatar.jpg';
import NavSidebar from '../nav-sidebar/NavSidebar';
export default function DashboardRecruiter() {
  
  return (
  <>
  <NavSidebar/>
  <section className="home-section">
     <div className="home-content">
     <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Order</div>
            <div className="number">40,876</div>
            <div className="indicator">
              <i className='bx bx-up-arrow-alt'></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className='bx bx-cart-alt cart'></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Sales</div>
            <div className="number">38,876</div>
            <div className="indicator">
              <i className='bx bx-up-arrow-alt'></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className='bx bxs-cart-add cart two' ></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Profit</div>
            <div className="number">$12,876</div>
            <div className="indicator">
              <i className='bx bx-up-arrow-alt'></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className='bx bx-cart cart three' ></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Return</div>
            <div className="number">11,086</div>
            <div className="indicator">
              <i className='bx bx-down-arrow-alt down'></i>
              <span className="text">Down From Today</span>
            </div>
          </div>
          <i className='bx bxs-cart-download cart four' ></i>
        </div>
      </div>

      <div className="sales-boxes">
        <div className="recent-sales box">
          <div className="title">Recent Sales</div>
          <div className="sales-details">
              <ul className="details">
                <li className="topic">Date</li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
                <li><Link to="#">02 Jan 2021</Link></li>
              </ul>
              <ul className="details">
                <li className="topic">Customer</li>
                <li><Link to="#">Alex Doe</Link></li>
                <li><Link to="#">David Mart</Link></li>
                <li><Link to="#">Roe Parter</Link></li>
                <li><Link to="#">Diana Penty</Link></li>
                <li><Link to="#">Martin Paw</Link></li>
                <li><Link to="#">Doe Alex</Link></li>
                <li><Link to="#">Aiana Lexa</Link></li>
                <li><Link to="#">Rexel Mags</Link></li>
                <li><Link to="#">Tiana Loths</Link></li>
              </ul>
              <ul className="details">
                <li className="topic">Sales</li>
                <li><Link to="#">Delivered</Link></li>
                <li><Link to="#">Pending</Link></li>
                <li><Link to="#">Returned</Link></li>
                <li><Link to="#">Delivered</Link></li>
                <li><Link to="#">Pending</Link></li>
                <li><Link to="#">Returned</Link></li>
                <li><Link to="#">Delivered</Link></li>
                <li><Link to="#">Pending</Link></li>
                <li><Link to="#">Delivered</Link></li>
              </ul>
                <ul className="details">
                <li className="topic">Total</li>
                <li><Link to="#">$204.98</Link></li>
                <li><Link to="#">$24.55</Link></li>
                <li><Link to="#">$25.88</Link></li>
                <li><Link to="#">$170.66</Link></li>
                <li><Link to="#">$56.56</Link></li>
                <li><Link to="#">$44.95</Link></li>
                <li><Link to="#">$67.33</Link></li>
                <li><Link to="#">$23.53</Link></li>
                <li><Link to="#">$46.52</Link></li>
              </ul>
          </div>
          <div className="button">
            <Link to="#">See All</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}
