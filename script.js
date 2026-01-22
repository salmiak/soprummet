let twoAClock = moment().set({
  'hour': 14,
  'minute': 0,
  'second': 0,
  'millisecond': 0
})

let dates = [
  {
    // Tuesdays and Friday
    id: 'paper',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 5 : moment(twoAClock).day() >= 2 ? 2 : -2 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 8 : moment(twoAClock).day() >= 2 ? 5 : 2 )
  },
  {
    // Tuesdays and Friday
    id: 'well',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 5 : moment(twoAClock).day() >= 2 ? 2 : -2 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 8 : moment(twoAClock).day() >= 2 ? 5 : 2 )
  },
  {
    // Monday and Friday
    id: 'plastic',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 5 : moment(twoAClock).day() >= 1 ? 1 : -2 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 5 ? 8 : moment(twoAClock).day() >= 1 ? 5 : 1 )
  },
  {
    // Tuesday
    id: 'bio',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 2 ? 2 :-5 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 2 ? 2 :-5 ).add(1,'w')
  },
  {
    // Mondays
    id: 'glas',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 1 ? 1 :-6 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 1 ? 1 :-6 ).add(1, 'w')
  },
  {
    // Fridays even weeks
    id: 'metal',
    start: moment(twoAClock).day( moment().isoWeek() % 2 ? -2 : moment(twoAClock).day() >= 5 ? 5 : -9 ),
    stop:  moment(twoAClock).day( moment().isoWeek() % 2 ? -2 : moment(twoAClock).day() >= 5 ? 5 : -9 ).add(2, 'w')
  },
  {
    // Monday and Thursday
    id: 'household',
    start: moment(twoAClock).day( moment(twoAClock).day() >= 4 ? 4 : moment(twoAClock).day() >= 1 ? 1 : -3 ),
    stop:  moment(twoAClock).day( moment(twoAClock).day() >= 4 ? 8 : moment(twoAClock).day() >= 1 ? 4 : 1 )
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
