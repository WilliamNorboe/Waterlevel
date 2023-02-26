
import React, { useEffect, useState} from 'react';

import ReactMonthPicker from "react-month-picker";
import MonthYearPicker from 'react-month-year-picker';
import "react-month-picker/css/month-picker.css";

// import useAsyncFetch from './useAsyncFetch';

import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import './App.css';

import {sendGetRequest, sendPostRequest} from './AJAX.jsx'



function MakeChart(props){
	const cityIds = new Map();
  cityIds.set(0, 'Shasta');
  cityIds.set(1, 'Oroville');
  cityIds.set(2, 'Trinity Lake');
  cityIds.set(3, 'New Melones');
  cityIds.set(4, 'San Luis');
  cityIds.set(5, 'Don Pedro');
  cityIds.set(6, 'Berryessa');


    let n = props.props.length;
    console.log("DEBUG", props.props.length);

    // objects containing row values
    let waterLvl = {label: "Water level",data: [], backgroundColor: ["#429198"]};
		let capcitys = {label: "capacity", data: [4552000, 3537577, 2447650, 2400000, 1062000, 2030000, 1602000], backgroundColor: ["rgb(120, 199, 227)"]};
    // let midIncObj = {label: "Middle Income Family Price", data: [], backgroundColor: ["red"]}
    let labels = [];
    for (let i=0; i<n; i++) {
      waterLvl.data.push(props.props[i].value);
      // midIncObj.data.push(1000);
      labels.push(cityIds.get(i));
    }

  let userData = {};
  userData.labels = labels;
  userData.datasets = [waterLvl, capcitys];

console.log(userData);
let options = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      // text: 'water levels',
    },
    tooltip: {
      callbacks: {
        afterLabel: function(context){
          return "acre-feet"
        }
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
			stacked: true,
      grid: {
        display: false
      }
    },
    y: {
			stacked: false,
      grid: {
        display: false
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, ticks) {
            return (value/1000000).toFixed(1);
        }
      }
    }
  }
};

      return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      )
}

// let testDate = {month: 4, year: 2022};
// let testProp = [];

function LowerHalf(curState){
	
	console.log(curState.curState);
	console.log(curState.curProp);
	
	if(curState.curState == "See More"){
		return(<div id = "blank"></div>);
	}
	else{
		// const [curDate, setDate] = useState(testDate);
		// const [curProp, setProp] = useState(testProp);
		//hardcoded for now

		function yearChange(newYear) {
      let m = curState.curDate.month;
				// testDate = {year: newYear, month: m };
      	curState.setDate({year: newYear, month: m });
    	}

		function monthChange(newMonth){
			let y = curState.curDate.year;
			// testDate = {month: newMonth, year: y};
			curState.setDate({month: newMonth, year: y});
		}
		
		// useAsyncFetch("/query/test", curState.curDate, thenFun, catchFun);
		// function thenFun (result) {
		// 		console.log(result);
		// 		// test = result;
		// 		curState.setProp(result);
  // 	}
  // 	function catchFun (error) {
  //   	console.log(error);
  // 	}
		// props= test;
	//	console.log(test);
		
	//	if(curState.curProp){
						let props = curState.curProp;
		
						
						return (

							<div id = "bottomRow"> 
									<div id = "graph">
										
									 <Tester curProp={curState.curProp}
										 curDate = {curState.curDate}
										 setProp = {curState.setProp}
										 > </Tester>
										
									</div>
					
									<div id = "textAndMonth">
										<div className = "infoText" id = "botttomText">
											Here's a quick look at some of the data on reservoirs from the <span className = "blue">California Data Exchange center</span>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
										</div>
					
										<div id = "monthInput">
											<div id = "monthText">Change Month:</div>
											
											      <MonthPicker  
          									// props 
          									date = {curState.curDate}
          									yearFun = {yearChange}
         							 			monthFun = {monthChange}
														curState ={curState.curState}
															curDate = {curState.curDate}
															setDate = {curState.setDate}
															curProp = {curState.curProp}
															setProp = {curState.setProp}
															setState = {curState.setSt}
          										/>
											
										</div>
										
									</div>
								</div>
						);
	//	}
	}

}



// function myFetch(url, date, setProp){

// 	useAsyncFetch("/query/test", date, thenFun, catchFun);
// 		function thenFun (result) {
// 				console.log(result);
// 				// test = result;
// 				setProp(result);
//   	}
//   	function catchFun (error) {
//     	console.log(error);
//   }
// }

function Tester(items){
	// useEffect(initialize,[]);
	// myFetch("/query/test", items.curDate, items.setProp);

		useEffect(initialize,[items.curDate]);
	  function initialize () {
    
    async function getMovies () {
      console.log("Doing AJAX request")
      let newMovies = await sendPostRequest("/query/test", items.curDate);
      items.setProp(newMovies);
    };
    
    getMovies(); // call the async function
  }
	
	// if(items.curProp){
			return(

		<MakeChart props={items.curProp}
										 curDate = {items.curDate}
											setProp={items.setProp}> </MakeChart>
	);
	// }

}


function MonthPicker(props) {
let date = props.date;


// myFetch("/query/test", props.curDate, props.setProp);


const [visible,updateVisible] = useState(false);

function showFun () {
  updateVisible(true);
}

function pickedYear (year) {
  // updateVisible(false);
  props.yearFun(year);
}

function pickedMonth (month) {
  updateVisible(false);
  props.monthFun(month);
	
}

  if (visible) {


		
return (
      <div>
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={1976}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> );
  } else {
    return (
      <button onClick={

				() => {
					showFun();
					
				}
			
			} id = "tempMonth">{getMonthName(date.month)+" "+date.year}</button>
    )
  }
}


function getMonthName(num){
	switch (num) {
		case 1:
			return "January";
		case 2:
			return "February";
		case 3:
			return "March";
		case 4:
			return "April";
		case 5:
			return "May";
		case 6:
			return "June";
		case 7:
			return "July";
		case 8:
			return "August";
		case 9:
			return "September";
		case 10:
			return "October";
		case 11:
			return "November";
		case 12:
			return "December";
	}
	return "";
}


function App() {
	// const [count, setCount] = useState(0);
	const [curState, setSt] = useState("See More");
	const [curDate, setDate] = useState({month: 4, year: 2022});
	const [curProp, setProp] = useState([]);


	
	if(curDate && curProp){
		
	}
  return (

		<main>
			
			<div id = "header">

				<div id = "headerText">
					Water Storage in Califonia Resovoirs
				</div>
				
			</div>

		<div id = "body2">
			<div id = "topRow">

				<div id = "textAndButton">

					<div className = "infoText">
						California's reservoirs are part of a <span className = "blue">complex water storage system</span>. The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
						<br/><br/>
						California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
					</div>
					<button onClick={


						() => {
							if(curState == "See More"){
								setSt("See Less");
							}
							else{
								setSt("See More");
							}
						}
						
					} id = "seeMore"> {curState}</button>
					
				</div>
				
				<div id = "imageAndCaption">
					<img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
					<div className = "subText">Lake Oroville in the 2012-2016 drought. Image credit: Justin Sullivan, from The Atlantic article 'Dramatic Photos of California's Historic Drought</div>
				</div>
			</div>

			<LowerHalf curState = {curState}
								curDate = {curDate}
								setDate = {setDate}
								curProp = {curProp}
								setProp = {setProp}
								setState = {setSt}/>
			
		</div>
		</main>
  )
}



export default App;
