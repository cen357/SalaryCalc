$(document).ready(function () {
    // Initialize data table
    var ws_data = [
        ['STT', 'Họ và tên', 'Lương']
    ];

    var table = $("table").DataTable();
    var index = 1;
    console.log(table);

    // Add new person salary profile
    $("#add").click(function () {
        // Reset person profile
        let person = [];
        // Update person profile
        person.push(index);
        person.push($("#addModal #name").val());
        person.push($("#addModal #salary").val());
        // Add new person profile to existing data table
        ws_data.push(person);
        // Display data in data table
        table.row.add([
            index + '',
            $("#addModal #name").val(),
            $("#addModal #salary").val()
        ]).draw(false);
        index++;
    });

    // Select or deselect row
    $('table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Edit row
    $('#edit').click(function () {
        var selectIndex = $('.selected').text();
        var removeIndex = Number(selectIndex[0]);

        let person = [];
        person.push(removeIndex);
        person.push($("#editModal #name").val());
        person.push($("#editModal #salary").val());
        ws_data.splice(removeIndex, 1, person);

        table.row('.selected').remove().draw(false);
        table.row.add([
            removeIndex + '',
            $("#editModal #name").val(),
            $("#editModal #salary").val()
        ]).draw(false);
        removeIndex++;
    });

    // Remove row
    $('#remove').click(function () {
        var selectIndex = $('.selected').text();
        var removeIndex = Number(selectIndex[0]);
        ws_data.splice(removeIndex, 1);
        table.row('.selected').remove().draw(false);
    });

    // Save as xls file     
    $("#button-a").click(function () {
        var wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "SheetJS Tutorial",
            Subject: "Test",
            Author: "Red Stapler",
            CreatedDate: new Date(2017, 12, 19)
        };

        wb.SheetNames.push("Test Sheet");

        var ws = XLSX.utils.aoa_to_sheet(ws_data);

        wb.Sheets["Test Sheet"] = ws;

        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'binary'
        });

        function s2ab(s) {

            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        console.log(ws_data);
        saveAs(new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }), 'test.xlsx');
    });
});