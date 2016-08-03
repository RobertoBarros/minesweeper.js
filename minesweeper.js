var rows = 10
var cols = 10
var mines_count = 10
var mines = []

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeGrid() {
	var table = $('<table>').attr('id','minesweeper');
	for (var row = 0; row < rows ; row++) {
		var a_row = $('<tr>');
		for (var col = 0; col < cols ; col++){
			var a_col = $('<td>').data('col', col).data('row', row).addClass('unopened');
			a_row.append(a_col);
		}
		table.append(a_row);
	}
	return table;
};

function putMines(){
	for (var i = 0; i <= mines_count; i++) {
		mines.push([getRandomInt(0,rows-1), getRandomInt(0,cols-1)]);
	}
};

function hasMine(row, col){
	var mine = false
	mines.forEach(function(e){
		if(e[0] == row && e[1] == col){
			mine = true
		};
	});
	return mine;
}

function countNeighborsMines(row, col) {
	count = 0
	if(hasMine(row-1,col-1)){count++};
	if(hasMine(row-1,col))  {count++};
	if(hasMine(row-1,col+1)){count++};

	if(hasMine(row,col-1)){count++};
	if(hasMine(row,col+1)){count++};

	if(hasMine(row+1,col-1)){count++};
	if(hasMine(row+1,col))  {count++};
	if(hasMine(row+1,col+1)){count++};

	return count
}

function openTile(td){
	var row = td.data('row');
	var col = td.data('col');
	console.log("click in row=" + row + " col=" + col );
	td.removeClass('unopened')
	if( hasMine(row,col)){
		td.addClass('mine');
	}
	else
	{
		count = countNeighborsMines(row,col)
		if(count == 0){
			td.addClass('opened');
		}
		else{
			td.addClass('mine-neighbour-' + count);
		}
	}
};

$(document).ready(function() {
	putMines();
	var grid = makeGrid();
	$('#game').append(grid);

	$('#minesweeper td').click(function(event){
		openTile($(this))
	});
});

