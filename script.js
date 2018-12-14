$(document).ready(function(){

  var date = moment('2017-01-01');
  var maxDate = moment('2018-11-01');
  printList(date);

  $.ajax({
    url: 'https://holidayapi.com/v1/holidays',
    method: 'GET',
    data:{
      key:'7288830a-30ce-49aa-a129-27b733cf1346',
      country:'IT',
      month: date.format('MM'),
      year: date.format('YYYY')
    },
    success: function(data){
        var holidays = data.holidays;
        console.log(holidays);
    },
    error: function(){

    }
  })

  $('#next').click(function(){
    date = date.add(1, 'months');

    if (date.diff(maxDate, 'days') > 0) {

      date = date.subtract(1, 'months');

      alert('non puoi andare avanti');

    } else {

    printList(date);

    }
  });

  $('#prev').click(function(){

    date = date.subtract(1, 'months');



    printList(date);


  });
})

function printList(date){
  $('.container h1').text(date.format('MMMM YYYY'));
  var daysInMonth = date.daysInMonth()
  $('.container ul').html('');
  for (var i = 1; i <= daysInMonth; i++) {
    var liTemplates = $('.templates li').clone();
    var liData = date.format('YYYY - MM') + i;
    liTemplates.text(i + ' ' + date.format('MMM'));
    $('.container ul').append(liTemplates);
  }
}
