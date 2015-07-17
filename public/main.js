function dataPrinter(data) {
    $('#tbody').empty();
    data.forEach(function(val) {
        $('<tr><td>' + val.id + '<td>' + val.name + '<td id= ' + val.id + '>' + 'delete' + '</td></tr>').appendTo('#tbody');
    })
}

function getInfo() {
    $.get('/student_names', function(data) {
        dataPrinter(data);
    });
}

$(function() {
    getInfo();

    $('#tbody').on('click', function(evt) {
        var id = evt.target.id;

        if (id === '') {
            return;
        }
        if (confirm('Do you want to delete this data?')) {
            $.ajax({
                url: '/student_name/:id',
                type: 'delete',
                data: {
                    id: id
                },
                success: function() {
                    getInfo();
                }
            });
        }
    });

    $('#add').on('click', function(evt) {
        $.post('/student_name', {
            name: $('#addName').prop('value')
        }, function() {});
        getInfo();
        $('#addName').prop('value', '');
    });
});
