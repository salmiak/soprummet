let now = moment().set({
  'hour': 14,
  'minute': 0,
  'second': 0,
  'millisecond': 0
})

let dates = [
  {
    // Mondays
    id: 'paper',
    start: moment(now).day( moment().day() >= 1 ? 1 :-6 ),
    stop:  moment(now).day( moment().day() >= 1 ? 1 :-6 ).add(1,'w')
  },
  {
    // Mondays and Friday
    id: 'well',
    start: moment(now).day( moment().day() >= 5 ? 5 : moment().day() >= 1 ? 1 : -2 ),
    stop:  moment(now).day( moment().day() >= 5 ? 8 : moment().day() >= 1 ? 5 : 1 )
  },
  {
    // Tuesdays and Friday
    id: 'plastic',
    start: moment(now).day( moment().day() >= 5 ? 5 : moment().day() >= 2 ? 2 : -2 ),
    stop:  moment(now).day( moment().day() >= 5 ? 9 : moment().day() >= 2 ? 5 : 2 )
  },
  {
    // Wednesday
    id: 'bio',
    start: moment(now).day( moment().day() >= 3 ? 3 :-4 ),
    stop:  moment(now).day( moment().day() >= 3 ? 3 :-4 ).add(1,'w')
  },
  {
    // Wednesdays
    id: 'glas',
    start: moment(now).day( moment().day() >= 3 ? 3 :-4 ),
    stop:  moment(now).day( moment().day() >= 3 ? 3 :-4 ).add(1, 'w')
  },
  {
    // Fridays even weeks
    id: 'metal',
    start: moment(now).day( moment().isoWeek() % 2 ? -2 : moment().day() >= 5 ? 5 : -9 ).add(moment().isoWeek() % 2, 'w'),
    stop:  moment(now).day( moment().isoWeek() % 2 ? -2 : moment().day() >= 5 ? 5 : -9 ).add(2, 'w')
  },
  {
    // Tuesdays and Friday
    id: 'household',
    start: moment(now).day( moment().day() >= 5 ? 5 : moment().day() >= 2 ? 2 : -2 ),
    stop:  moment(now).day( moment().day() >= 5 ? 9 : moment().day() >= 2 ? 5 : 2 )
  }
]

getCurrentPos = function(start, stop, value) {
  let distance = stop - start
  let normValue = value - start
  return normValue / distance
}

dates.forEach((bin, i) => {
  let val = getCurrentPos( +bin.start, +bin.stop, +moment() )
  document.querySelector(`#${bin.id} .bin-fill`).style.width = val * 100 + '%'
  document.querySelector(`#${bin.id} .answer`).innerHTML = val < 0.3 ? 'ja' : val < 0.75 ? 'kanske' : 'vänta'
});
