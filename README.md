# Order Digital Challenge 

"Your task is to develop a simple website that showcases a list of restaurants, utilising your skills in React and full-stack development. The focus of this exercise is on how you prioritise tasks and manage time effectively within a limited timeframe of one hour."

This app uses express and react to serve a list of local restaurants.  The list can be filtered via cuisine type and sorted by restaurant name, rating, cuisine or distance.

## Running locally 

Clone this repository and cd into it.  With docker installed, run:

```bash
docker build -t order-digital .
docker run --name order-digital -d -p 3000:3000 order-digital
```
The service should then be available on localhost:3000



