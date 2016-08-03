var rows = 10
var cols = 10
var bombs_count = 10
var bombs = []

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makegrid() {
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

function put_bombs(){
	for (var i = 0; i <= bombs_count; i++) {
		bombs.push([getRandomInt(0,rows-1), getRandomInt(0,cols-1)]);
	}
};

function has_bomb(row, col){
	var bomb = false
	bombs.forEach(function(e){
		if(e[0] == row && e[1] == col){
			bomb = true
		};
	});
	return bomb;
}

function count_neighbors_bombs(row, col) {
	count = 0
	if(has_bomb(row-1,col-1)){count++};
	if(has_bomb(row-1,col))  {count++};
	if(has_bomb(row-1,col+1)){count++};

	if(has_bomb(row,col-1)){count++};
	if(has_bomb(row,col+1)){count++};

	if(has_bomb(row+1,col-1)){count++};
	if(has_bomb(row+1,col))  {count++};
	if(has_bomb(row+1,col+1)){count++};

	return count
}

function open_tile(td){
	var row = td.data('row');
	var col = td.data('col');
	console.log("click in row=" + row + " col=" + col );
	td.removeClass('unopened')
	if( has_bomb(row,col)){
		td.addClass('mine');
	}
	else
	{
		count = count_neighbors_bombs(row,col)
		if(count == 0){
			td.addClass('opened');
		}
		else{
			td.addClass('mine-neighbour-' + count);
		}
	}
};

$(document).ready(function() {
	put_bombs();
	var grid = makegrid();
	$('#game').append(grid);

	$('#minesweeper td').click(function(event){
		open_tile($(this))
	});
});

