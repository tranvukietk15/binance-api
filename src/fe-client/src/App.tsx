import React, { useEffect, useState } from 'react';
import './App.css';
// import BinanceCall from './BinanceCall';
// import './Token.css';

const regexMatch = '.*USDT$|.*TUSD$';
const regexMatchFD = '.*FDUSD$';
const getValue = (item: any, key: string) => item[key];
const getPercentage = (from: number, to: number) => ((to - from) / from) * 100;
  const filter = (value: any) => {
        return value.TUSD && value.USDT && value.FDUSD;
      };

function App() {
  const [data, setData] = useState(Object);
  const [dataUSDC, setDataUSDC] = useState(Object);
  const [dataFDUSD, setDataFDUSD] = useState(Object);
  const [sort, setSort] = useState({
    key: 'percentageFDUSD',
    direction: 1
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.binance.com/api/v3/ticker/price');
      const json = await res.json();
      const it = structuredClone(data);
      for (const item of json) {
        if (item.symbol.search(regexMatch) !== -1) {
          const token: string = item.symbol.substring(0, item.symbol.length - 4);
          const key = item.symbol.replace(token, '');
          if (it[token]) {
            it[token][key] = item.price;
          } else {
            it[token] = {
              [key]: item.price
            };
          }

          if (token === 'TUSD') {
            setDataUSDC({
              price: item.price,
              percentage: getPercentage(1, item.price).toFixed(3),
            });
          }

          if (token === 'FDUSD') { 
            setDataFDUSD({
              price: item.price,
              percentage: getPercentage(1, item.price).toFixed(3),
            });
          }
        } else if (item.symbol.search(regexMatchFD) !== -1) {
          const token: string = item.symbol.substring(0, item.symbol.length - 5);
          const key = item.symbol.replace(token, '');
          if (it[token]) {
            it[token][key] = item.price;
          } else {
            it[token] = {
              [key]: item.price
            };
          }
        }
      }

      for (const key in it) {
        if (it[key]['TUSD']) {
          it[key]['percentage'] = getPercentage(it[key]['USDT'], it[key]['TUSD']).toFixed(3);
        }
        if (it[key]['USDC']) {
          it[key]['percentageUSDC'] = getPercentage(it[key]['USDT'], it[key]['USDC']).toFixed(3);
        }
        if (it[key]['FDUSD']) {
          it[key]['percentageFDUSD'] = getPercentage(it[key]['USDT'], it[key]['FDUSD']).toFixed(3);
        }
      }

      const result = Object.fromEntries(
        Object.entries(it).filter(
          ([key, value]) => filter(value),
        ),
      );

      const sorted = Object.fromEntries(
        Object.entries(result).sort(([,a],[,b]) => getValue(a, 'percentageFDUSD') - getValue(b, 'percentageFDUSD'))
    );
      
      setData(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const sorted = Object.fromEntries(
      Object.entries(data).sort(([,a],[,b]) => getValue(a, sort.key) * sort.direction - getValue(b, sort.key) * sort.direction)
  );
    setData(sorted);
  }, [sort]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">Symbol</th>
                  <th scope="col">USDT</th>
                  <th scope="col">TUSD</th>
                  <th scope="col" onClick={() => {
                    setSort({
                      key: 'percentage',
                      direction: sort.direction * -1
                    });
                  }}>percentage <br />{ dataUSDC.price} / {dataUSDC.percentage} %</th>
                  <th scope="col">FDUSD</th>
                  <th scope="col" onClick={() => {
                    setSort({
                      key: 'percentageFDUSD',
                      direction: sort.direction * -1
                    });
                  }}>percentageFDUSD<br /> { dataFDUSD.price} / {dataFDUSD.percentage} %</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, item]) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{getValue(item, 'USDT')}</td>
                      <td>{getValue(item, 'TUSD')}</td>
                      <td>{getValue(item, 'percentage')} %</td>
                      <td>{getValue(item, 'FDUSD')}</td>
                      <td>{getValue(item, 'percentageFDUSD')} %</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <BinanceCall />  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
