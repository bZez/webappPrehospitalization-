function BrownMapType() {}

BrownMapType.prototype.tileSize = new google.maps.Size(256,256);
BrownMapType.prototype.maxZoom = 5;
BrownMapType.prototype.minZoom = 1;

BrownMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
	var div = ownerDocument.createElement('div');
	//div.innerHTML = coord;
	div.style.width = this.tileSize.width + 'px';
	div.style.height = this.tileSize.height + 'px';
	/*if (coord.x == 0 && coord.y == 0 && coord.x < Math.pow(2,zoom) && coord.y < Math.pow(2,zoom)) {
		div.style.borderStyle = 'solid';
		div.style.borderWidth = '1px';
	}
	div.style.borderColor = '#000000';*/
	div.style.backgroundColor = '#D7A276';
	return div;
};

BrownMapType.prototype.name = "Brown";
BrownMapType.prototype.alt = "Default tasting map background";



function BlueMapType() {}

BlueMapType.prototype.tileSize = new google.maps.Size(256,256);
BlueMapType.prototype.maxZoom = 5;
BlueMapType.prototype.minZoom = 1;

BlueMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
  var div = ownerDocument.createElement('div');
  //div.innerHTML = coord;
  div.style.width = this.tileSize.width + 'px';
  div.style.height = this.tileSize.height + 'px';
  /*div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px';
  div.style.borderColor = '#000000';*/
  div.style.backgroundColor = '#B0C4F9';
  return div;
};

BlueMapType.prototype.name = "Blue";
BlueMapType.prototype.alt = "Default tasting map background";

var brownMapType = new BrownMapType();
var blueMapType = new BlueMapType();