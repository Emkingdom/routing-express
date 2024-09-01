const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const validateNumeberArray = (arrNumberAsString) => {
    let result = [];

    for(number of arrNumberAsString){
        let validNumber = Number(number)

        if(Number.isNaN(validNumber)){
            return new Error(`This value ${number} is incorret`);
        }

        result.push(validNumber)
    }

    return result;
}

const findMean = (nums) => {
    if(nums.length === 0) return 0
    const total  =  nums.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    });
    return total  / nums.length
  
}


const findMedian = (nums) => {
    // sort and get the middle element
  
    nums.sort((a, b) => a - b);
  
    let middleIndex = Math.floor(nums.length / 2);
    let median;
  
    if (nums.length % 2 === 0) {
      median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
      median = nums[middleIndex];
    }
    return median
}


const findMode = (arr) => {
    let freqCounter = createFrequencyCounter(arr);
  
    let count = 0;
    let mostFrequent;
  
    for (let key in freqCounter) {
      if (freqCounter[key] > count) {
        mostFrequent = key;
        count = freqCounter[key];
      }
    }
  
    return +mostFrequent;
  }
  

app.get('/mean', (req, res, next) => {
    if(!req.query.nums) {
        throw new ExpressError('You most pass a query of nums separated with commas', 400);
    }

    let numsIntoArry = req.query.nums.split(',')
    
    let arrNums = validateNumeberArray(numsIntoArry)
    if(arrNums instanceof Error ){
        throw new ExpressError(arrNums.message, 400);
    }

    let restul = {
        operation: 'mean',
        result: findMean(arrNums)
    }

    return res.send(restul)

});

app.get('/median', (req, res, next) => {
    if(!req.query.nums) {
        throw new ExpressError('You most pass a query of nums separated with commas', 400);
    }

    let numsIntoArry = req.query.nums.split(',')
    
    let arrNums = validateNumeberArray(numsIntoArry)
    if(arrNums instanceof Error ){
        throw new ExpressError(arrNums.message, 400);
    }

    let restul = {
        operation: 'median',
        result: findMedian(arrNums)
    }

    return res.send(restul)

});

app.get('/mode', (req, res, next) => {
    if(!req.query.nums) {
        throw new ExpressError('You most pass a query of nums separated with commas', 400);
    }

    let numsIntoArry = req.query.nums.split(',')
    
    let arrNums = validateNumeberArray(numsIntoArry)
    if(arrNums instanceof Error ){
        throw new ExpressError(arrNums.message, 400);
    }

    let restul = {
        operation: 'mode',
        result:findMode(arrNums)
    }

    return res.send(restul)

});


app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
});
  
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err, 
        message: err.message
    })
})

app.listen(3000, function(){
    console.log(`Server started on port 3000`)
})