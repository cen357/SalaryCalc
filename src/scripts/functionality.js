$(document).ready(function () {
    // Initialize data for application
    app_data = [];
    // Initialize salary profile data for worksheet
    var ws_data = [
        ['STT', 'Họ và tên', 'Lương']
    ];

    // Initialize profile counter
    var counter = 0;

    // Initialize datatable
    var table = $("table").DataTable({
        "columnDefs": [{
            "searchable": true,
            "orderable": false,
            "targets": 0
        }],
        "order": [],
        rowReorder: false
    });
    addIndexColumn(table);

    // Select or deselect profile by clicking on a row
    $('table tbody').on('click', 'tr', function () {
        if (isSelected($(this))) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Add new profile
    $("#add").click(function () {
        // Initialize new profile
        let profile = [];
        // Increase counter for new profile
        counter++;
        // Update new person profile for worksheet
        addData(profile, counter);
        // Add new profile to the datatable
        ws_data.push(profile);
        // Display new profile data in datatable
        addTable(table, counter);
    });

    // Edit selected profile
    $('#edit').click(function () {
        let num = getSelectedIndex();
        // Initialize selected profile
        let profile = [];
        // Edit selected profile for worksheet
        editData(profile);
        ws_data.splice(num, 1, profile);
        // Show edited profile in data table
        editTable(table, num, profile);
    });

    // Remove selected profile
    $('#remove').click(function () {
        // Remove selected profile from worksheet
        let num = getSelectedIndex();
        ws_data.splice(num, 1);
        // Decrease indexes of profiles below the selected profile in worksheet
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
            Title: "SheetJS Worksheet",
            Subject: "SalaryCalc",
            Author: "Anthony Pham",
            CreatedDate: new Date(2017, 12, 19)
        };

        wb.SheetNames.push("Salary Sheet");

        var ws = XLSX.utils.aoa_to_sheet(ws_data);

        wb.Sheets["Salary Sheet"] = ws;

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