/** Function description
 *  Parameters: 
 *  Returns: 
 */
function addIndexColumn(t) {
    t.on('order.dt search.dt', function () {
        t.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

/** Function description
 *  Parameters: 
 *  Returns: 
 */
function isSelected(row) {
    return (row.hasClass('selected')) ? true : false;
}

/** Function description
 *  Parameters: 
 *  Returns: 
 */
function getSelectedIndex() {
    let selectedIndex = $('.selected').text();
    return Number(selectedIndex[0]);
}

/** Function description
 *  Parameters: 
 *  Returns: 
 */
function addData(person, num) {
    person.push(num);
    person.push($("#addModal #name").val());
    person.push($("#addModal #salary").val());
}

/** Function description
 *  Parameters: 
 *  Returns: 
 */
function addTable(dataTable, num) {
    dataTable.row.add([
        '',
        $("#addModal #name").val(),
        $("#addModal #salary").val()
    ]).draw(false);
}

/** Function description
 *  Parameters: 
 *  Returns: 
 */
function editData(person) {
    person.push(getSelectedIndex());
    person.push($("#editModal #name").val());
    person.push($("#editModal #salary").val());
}

/** Function description
 *  Parameters: 
 *  Returns: 
 */
function editTable(dataTable, selectedRow, person) {
    let col = 1;
    while (col < person.length) {
        dataTable.cell({
            row: selectedRow - 1,
            column: col
        }).data(person[col]);
        col++;
    }
}