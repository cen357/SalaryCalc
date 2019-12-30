$(document).ready(function () {
    var data = [
        ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
        ['2017', 10, 11, 12, 13],
        ['2018', 20, 11, 14, 13],
        ['2019', 30, 15, 12, 13]
    ];

    var container = document.querySelector("#spreadsheet");
    const hot = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        licenseKey: 'non-commercial-and-evaluation'
    });

    var wb = XLSX.utils.book_new();

    wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Test Sheet");

    var ws_data = [
        ['hello', 'world']
    ];

    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    wb.Sheets["Test Sheet"] = ws;

    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'binary'
    });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf); //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
    }

    $("#button-a").click(function () {
        saveAs(new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }), 'test.xlsx');
    });
});