import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState<number>(1);
  // make 5 different checkout lines
  const [lines, setLines] = useState([
    [2, 3, 4, 5],
    [11],
    [1, 7],
    [5],
    [7, 8, 9],
  ]);

  function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //@TODO find the line that has the least amount of items
    //@TODO push the items to the line
    let leastItemsAmount = 1e9;
    let lineWithLeast: number[] | undefined;
    // loop through lines
    for (let line of lines) {
      const totalInLine = line.reduce((sum, num) => sum + num, 0);
      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
        // that's how to find the least number in an array
        // array1 = variable: variable is the array
      }
    }
    console.log('The line with least items: ', lineWithLeast);
    // push the input into lineWithLeast, we can't do push in React, cos the variable in immutable
    // find the index number lineWithLeast
    if (!lineWithLeast) return;

    setLines((prevLines) =>
      prevLines.map((line) =>
        line === lineWithLeast ? [...line, items] : line
      )
    );
    console.log(lineWithLeast);
  }

  // use setInterval inside useEffect 
  // to simulate the real-time one cashier checks out one item in every second
  useEffect(() => {
    // keep track of the interval
    const interval = setInterval(() => {
      // reduce the first item by 1 in each line
      // you can get rid of return and {} together
      setLines((prevLines) => {
        // loop through each single line
        return prevLines.map((line) => {
          // line[0] - 1: decrement the first item in the line by 1 every second
          // line.slice(1): get rid of the first item in the line
          // when the first item turns 0, filter it out.
          return [line[0] - 1, ...line.slice(1)].filter((value) => value > 0);
        });
      });
    }, 1000);

    // When the component unmounted, we clear up the interval, not just firing over and over again
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='App mt-8 flex flex-col items-center justify-center'>
      <h1 className='text-3xl capitalize mb-8'>Checkout Simulator</h1>
      <form className='flex space-x-8 mb-8' onSubmit={handleCheckout}>
        <input
          required
          value={items}
          // Person carries 0 item not gonna get into the line
          onChange={(e) =>
            e.currentTarget.valueAsNumber > 0 &&
            setItems(e.currentTarget.valueAsNumber)
          }
          className='px-4 rounded-lg focus:outline-none'
          type='number'
        ></input>
        <button>Checkout</button>
      </form>

      <div className='flex space-x-20 text-xl'>
        {lines.map((line) => (
          <div key={crypto.randomUUID()} className='border-2 p-4'>
            {line.map((item) => (
              <div key={crypto.randomUUID()}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


