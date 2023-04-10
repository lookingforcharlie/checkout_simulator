# Checkout Simulator

[Inspired by Cody](https://www.youtube.com/watch?v=B9fmr1TpKHE&t=174s)

## Features

- Simulate the real time check out system
- assign the person in different line upon the items the person want to check out
- Input value is the items that the person has when ready for checking out

## Knowledge

- Use interval nested by useEffect to simulate real time checkout system that one cashier checks out one item in one second.
- Clear function (clearInterval(interval);) inside useEffect after component unmounted
- filer returns a modified array
- e.currentTarget.valueAsNumber
- How to find the least number in an array

## Expected upgrade

- Add an express line
- The person has items that less than 5 can go to express line
- When express line is empty, any person can go to express line
