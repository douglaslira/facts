import React, { useMemo, useState } from "react";
import axios from "axios";

import Pagination from "./paginator/Pagination";
import './FactList.scss';

import trashIcon from '../assets/icons/delete.svg';
import closeIcon from '../assets/icons/close.svg';

const FactList = () => {
  const [infoFacts, setInfoFacts] = useState({
    close: false,
    data: [],
    pageSize: 1,
    currentPage: 1,
    siblingCount: 1
  });

  const currentInfo = useMemo(() => {
    const firstPageIndex = (infoFacts.currentPage - 1) * infoFacts.pageSize;
    const lastPageIndex = firstPageIndex + infoFacts.pageSize;
    return infoFacts.data.slice(firstPageIndex, lastPageIndex);
  }, [infoFacts.currentPage, infoFacts.data]);

  const setCurrentPage = (page) => {
    setInfoFacts((state) => ({
      ...state,
      close: false,
      currentPage: page,
    }));
  };

  const removeFact = (e, num) => {
    e.preventDefault();
    setInfoFacts((state) => ({
      ...state,
      data: infoFacts.data.filter(e => e.number !== num).sort((a,b)=> (a.number > b.number ? 1 : -1)),
    }));
  }

  const closeFact = (e) => {
    e.preventDefault();
    setInfoFacts((state) => ({
      ...state,
      close: true,
    }));
  }

  const backgroundColor = () => {
    return `hsl(${ + 360 * Math.random()},${(25 + 70 * Math.random())}%, ${(85 + 10 * Math.random())}%)`;
  }

  const createFacts = (e) => {
    e.preventDefault();
    axios.get(`http://numbersapi.com/random/year?json`).then(res => {
      const factInfo = res.data;
      factInfo.color = backgroundColor();
      setInfoFacts((state) => ({
        ...state,
        close: false,
        data: [...infoFacts.data, factInfo].sort((a,b)=> (a.number > b.number ? 1 : -1)),
      }));

      setCurrentPage(infoFacts.data.length + 1);
    })
  }

  return (
      <div className="fact">
        <div className="fact-left">
          <div className="fact-left-info">
              {currentInfo.length && !infoFacts.close ? currentInfo.map((item, index) => (
                <>
                  <div onClick={(e)=>closeFact(e)} className="fact-left-info__close">
                      <img alt="Close Icon" src={closeIcon} />
                  </div>
                  <div className="fact-left-info__detail" key={`item-${item.id}`}>
                    <p>{item.number}</p>
                    <span>{item.text}</span>
                  </div>
                  <div onClick={(e) => removeFact(e, item.number)} className="fact-left-info__trash">
                    <img alt="Trash Icon" src={trashIcon} />
                  </div>
                </>
              )) : (
                <div className="fact-left-info__empty">
                  <div>
                    <p>Random Year Facts</p>
                    <small>Generate random facts, from random years</small>
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="fact-right" style={{backgroundColor: backgroundColor()}}>
          <div className="fact-right-action">
            <button onClick={(e)=>createFacts(e)} className="btn btn-outline-secondary rounded-0">Generate Random Year Fact</button>
          </div>
          <div className="fact-right-timeline">
            <Pagination
              currentPage={infoFacts.currentPage}
              totalCount={infoFacts.data.length}
              pageSize={infoFacts.pageSize}
              siblingCount={infoFacts.siblingCount}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
  );
};

export default FactList;
