function dataPrinter(data) {
    $('#tbody').empty();
    data.forEach(function(val) {
          $('<tr><td>' + val.id + '<td>' + val.name + '<td id= ' + val.id + '>' + 'delete' + '</td></tr>').appendTo('#tbody');
      })
}

function getInfo() {
    $.get('/getInfo', function(data) {
        dataPrinter(data);
    });
}

$(function() {
    getInfo();

    $('#tbody').on('click', function(evt) {
        var id = evt.target.id;

        if (id ==='') {
            return;
        }
        $.ajax({
            url:'/deleteInfo',
            type:'delete',
            data:{id:id}
        });
        getInfo();
    });

    $('#add').on('click',function(evt) {
        $.post('/postInfo',{name:$('#addName').prop('value')},function() {});
        getInfo();
        $('#addName').prop('value','');
    });
});
