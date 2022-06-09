const fs = require('fs')
const {parse} = require('csv-parse')

const isHabitablePlanet = (planet)=>{
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] > 1.11
    && planet['koi_prad'] < 1.6
}

const results = []
const habitablePlanet = []

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment: "#",
    columns: true
}))
.on('data', (data)=>{
    results.push(data)
    if(isHabitablePlanet(data)){
        habitablePlanet.push(data)
    }
})
.on('end', ()=>{
    //console.log({results})
    console.log(`${habitablePlanet.length} habitable planets found`)
})
.on('error', (err)=>{
    console.log(err)
})