import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // type TToppings = {
  //   toppings: string[]
  // }[]
  const [toppings, setToppings] = useState({})

  useEffect(() => {
    async function getToppings() {
      // fetch data
      const response = await fetch('http://files.olo.com/pizzas.json')
      const json = await response.json()
      
      // build hash map to get totals of each topping combo
      // type TSorted = {
      //   combo: number
      // }
      const map = {}
      json.forEach(combo => {
        let item = ''
        combo.toppings.forEach(top => {
          item += `${top}, `
        })
        // trim whitespace and trailing comma
        item = item.replace(/,\s*$/, "")

        if (map[item]) {
          map[item] += 1; 
        } else {
          map[item] = 1;
        }
      })

      // set state
      setToppings(map)
    }
    getToppings()
  },[])

  const sortedToppings = (obj) => {
    // sort the toppings by count returning only the name of the topping
    // type TSorted = string[]
    const arrOfToppings = Object.keys(obj).sort(( a,b ) => {
      return obj[a] - obj[b]; 
    })

    // sort will be ascending so we need to grab the last 20
    // then reverse the order, this way we only reverse 20 
    // instead of the whole array
    
    // TSorted
    return arrOfToppings.slice((arrOfToppings.length-20)).reverse()
  }

  const makeList = (obj) => {
    // render the list of top 20 toppings 
    // type TElements = ReactElement[]
    return sortedToppings(obj).map((topping, index) => {
      return (
        <div className="topping" key={index}>
          {`${index+1}. ${topping}: ${obj[topping]}`}
        </div>
      )
    })
  }

  return (
    <div className="main">
      {makeList(toppings)}
    </div>
  )
}

export default App;
