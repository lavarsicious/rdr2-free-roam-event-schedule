// Yes I know, it's in ES5. I did it on purpose so that it'll work
// in older browsers with needing to convert it with Babel, because
// I couldn't be bothered to look up caniuse.com.
var times = document.getElementById('times');
var nextEventName = document.getElementById('next-event-name');
var nextEventTime = document.getElementById('next-event-time');
var eventFrequency = 45 * 60 * 1000;

// Update the list of times, and the
function updateList() {
  var timesList = document.createElement('ul');
  schedule.forEach(function(t) {
    var event = calculateEventTimes(t);
    var li = document.createElement('li');
    if (event.eta > 0 && event.eta < eventFrequency) {
      li.classList.add('next-event');
      nextEventName.innerHTML = event.name;
      nextEventTime.innerHTML = event.timeString;
    }
    li.innerText = event.timeString + ' - ' + event.name;
    timesList.append(li);
  });
  times.innerHTML = timesList.outerHTML;
}

// Convert between time-zones etc
function calculateEventTimes(t) {
  var eventTime = t[0];
  var currentDate = new Date().toDateString();
  var eventDateTime = new Date([currentDate, eventTime, 'UTC'].join(' '));
  return {
    dateTime: eventDateTime,
    name: t[1],
    eta: eventDateTime - new Date(),
    timeString: eventDateTime.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

// Show the user's time zone in the DOM
function showTimeZone() {
  var timeZone = new Date()
    .toUTCString()
    .split(' ')
    .pop();
  var timeZoneOffset = new Date().getTimezoneOffset() / -60;
  if (timeZoneOffset > 0) {
    timeZoneOffset = '+' + timeZoneOffset;
  }
  document.getElementById('locale').innerText =
    ' (' + timeZone + ' or UTC' + timeZoneOffset + ')';
}

// Initialise
showTimeZone();
updateList();

// Update list every 20 seconds
window.setInterval(updateList, 20000);
