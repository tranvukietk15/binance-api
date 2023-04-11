import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import './Token.css';

function App() {
  const [data, setData] = useState(Array<any>);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/binance-token/low-cap');
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);
  return (
    // <ul>
    //   {data.map(item => (
    //     <li key={item.symbol}>{item.symbol}</li>
    //   ))}
    // </ul>
    <div>
      {/* <div className="courses-container">
        <div className="course">
          <div className="course-preview">
            <h6>Course</h6>
            <h2>JavaScript Fundamentals</h2>
            <a href="#">
              View all chapters <i className="fas fa-chevron-right"></i>
            </a>
          </div>
          <div className="course-info">
            <div className="progress-container">
              <div className="progress"></div>
              <span className="progress-text">6/9 Challenges</span>
            </div>
            <h6>Chapter 4</h6>
            <h2>Callbacks & Closures</h2>
            <button className="btn">Continue</button>
          </div>
        </div>
      </div>

      <div className="social-panel-container">
        <div className="social-panel">
          <p>
            Created with <i className="fa fa-heart"></i> by
            <a target="_blank" href="https://florin-pop.com">
              Florin Pop
            </a>
          </p>
          <button className="close-btn">
            <i className="fas fa-times"></i>
          </button>
          <h4>Get in touch on</h4>
          <ul>
            <li>
              <a href="https://www.patreon.com/florinpop17" target="_blank">
                <i className="fab fa-discord"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/florinpop1705" target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/florinpop17" target="_blank">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com/florinpop17" target="_blank">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/florinpop17" target="_blank">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Image</th>
                  <th scope="col">Article Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Words</th>
                  <th scope="col">Shares</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="w-25">
                    {/* <image src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg" className="image-fluid image-thumbnail" alt="Sheep"> */}
                  </td>
                  <td>Bootstrap 4 CDN and Starter Template</td>
                  <td>Cristina</td>
                  <td>913</td>
                  <td>2.846</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="w-25">
                    {/* <image src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" className="image-fluid image-thumbnail" alt="Sheep"> */}
                  </td>
                  <td>Bootstrap Grid 4 Tutorial and Examples</td>
                  <td>Cristina</td>
                  <td>1.434</td>
                  <td>3.417</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
