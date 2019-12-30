$(document).ready(function () {
    var ws_data = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        ['1', 'NGUYỄN THỊ BẢO HẰNG', '8005741990', '29,872,331', '5,100,000', '19,644,429', '2,563,951', '2,563,951', '535,500', '5', '0', '0'],
    ];

    var container = document.querySelector("#spreadsheet");
    const hot = new Handsontable(container, {
        data: ws_data,
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
        Author: "Anthony Pham",
        CreatedDate: new Date(2019, 12, 29)
    };

    wb.SheetNames.push("Test Sheet");

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
        }), 'test.xls');
    });
});