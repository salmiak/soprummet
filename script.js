let twoAClock = moment().set({
  'hour': 14,
  'minute': 0,
  'second': 0,
  'millisecond': 0
})

let dates = [
  {
    // Mondays
    id: 'paper',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 1 ? 1 :-6 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 1 ? 1 :-6 ).add(1,'w')
  },
  {
    // Mondays and Friday
    id: 'well',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 5 : moment(twoAClock).day() >= 1 ? 1 : -2 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 8 : moment(twoAClock).day() >= 1 ? 5 : 1 )
  },
  {
    // Tuesdays and Friday
    id: 'plastic',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 5 : moment(twoAClock).day() >= 2 ? 2 : -2 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 9 : moment(twoAClock).day() >= 2 ? 5 : 2 )
  },
  {
    // Wednesday
    id: 'bio',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 3 ? 3 :-4 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 3 ? 3 :-4 ).add(1,'w')
  },
  {
    // Wednesdays
    id: 'glas',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 3 ? 3 :-4 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 3 ? 3 :-4 ).add(1, 'w')
  },
  {
    // Fridays even weeks
    id: 'metal',
    start: moment(twoAClock).day( moment().isoWeek() % 2 ? -2 : moment(twoAClock).day() >= 5 ? 5 : -9 ).add(moment().isoWeek() % 2, 'w'),
    stop:  moment(twoAClock).day( moment().isoWeek() % 2 ? -2 : moment(twoAClock).day() >= 5 ? 5 : -9 ).add(2, 'w')
  },
  {
    // Tuesdays and Friday
    id: 'household',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 5 : moment(twoAClock).day() >= 2 ? 2 : -2 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 9 : moment(twoAClock).day() >= 2 ? 5 : 2 )
  }
]

getCurrentPos = function(start, stop, value) {
  let distance = stop - start
  let normValue = value - start
  return normValue / distance
}

const firstLoad = moment().valueOf();

let updateValues = function() {
  document.querySelector('.lastUpdate').innerHTML = moment().valueOf() - firstLoad
  dates.forEach((bin, i) => {
    let val = getCurrentPos( +bin.start, +bin.stop, +moment() )
    if (val < 0) {
      document.querySelector(`#${bin.id} .bin-fill`).style.width = '100%'
      document.querySelector(`#${bin.id} .answer`).innerHTML = 'vänta'
      document.querySelector(`#${bin.id} .next`).innerHTML = 'senare idag'
      document.querySelector(`#${bin.id} .next`).title = 'Senare idag'
    } else {
      document.querySelector(`#${bin.id} .bin-fill`).style.width = val * 100 + '%'
      document.querySelector(`#${bin.id} .answer`).innerHTML = val < 0.3 ? 'ja' : val < 0.8 ? 'kanske' : 'vänta'
      document.querySelector(`#${bin.id} .next`).innerHTML = bin.stop.fromNow()
      document.querySelector(`#${bin.id} .next`).title = bin.stop.format('[På] dddd')
    }
  });
}

document.addEventListener("visibilitychange", updateValues, false);

updateValues()
