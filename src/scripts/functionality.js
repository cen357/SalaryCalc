$(document).ready(function () {
    // Initialize salary profile
    var ws_data = [
        ['STT', 'Họ và tên', 'Lương']
    ];

    // Initialize data table
    var table = $("table").DataTable({
        "columnDefs": [{
            "searchable": true,
            "orderable": true,
            "targets": 0
        }],
        "order": [
            [1, 'asc']
        ],
        rowReorder: true
    });
    addIndexColumn(table);

    // Initialize profile counter
    var counter = 1;

    // Select or deselect profile
    $('table tbody').on('click', 'tr', function () {
        if (isSelected($(this))) {
            $(this).removeClass('selected'); // Deselect current row
        } else {
            table.$('tr.selected').removeClass('selected'); // Deselect selected row in the data table
            $(this).addClass('selected'); // Select current row
        }
    });

    // Add new profile
    $("#add").click(function () {
        // Initialize new profile
        let profile = [];

        // Update new person profile
        addData(profile, counter);

        // Add new profile to the data table
        ws_data.push(profile);

        // Display new profile data in data table
        addTable(table, counter);

        // Increase counter for the next profile
        counter++;
    });

    // Edit selected profile
    $('#edit').click(function () {
        let num = getSelectedIndex();
        // Initialize selected profile
        let profile = [];

        // Edit selected profile
        editData(profile);
        ws_data.splice(num, 1, profile);

        // Add edited profile into data table
        editTable(table, num, profile);
    });

    // Remove selected profile
    $('#remove').click(function () {
        // Remove selected profile 
        let num = getSelectedIndex();
        ws_data.splice(num, 1);

        // Decrease indexes of profiles below the selected profile
        for (let index = num; index < ws_data.length; index++) {
            ws_data[index][0] = ws_data[index][0] - 1;
        }

        // Decrease profile counter
        counter--;

        // Remove selected profile from data table
        table.row('.selected').remove().draw(false);

    });

    // Summary


    // Download as xls file
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
        saveAs(new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }), 'test.xlsx');
    });
});