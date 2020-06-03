/**
 * 
 */
let map;
let geoCoder;
let mapContainer;
let mapOption;

let objects = [];

/**
 * 맵 초기화
 * @returns
 */
function initMap(){
	mapContainer = document.getElementById("map");
	mapOption = {
			center: new daum.maps.LatLng(initLat, initLng),
			level:6
	}
	
	//
	map = new daum.maps.Map(mapContainer, mapOption);
	
	//
	geocoder = new daum.maps.services.Geocoder();
	
	//줌 컨트롤
	let zoomControl = new daum.maps.ZoomControl();
	map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
	
	//
	daum.maps.event.addListener(map, 'click', function(mouseEvent){
		mapClicked(mouseEvent);
	});
	
	//
	return map;
	
}

function createMarker(){
	let marker = new daum.maps.Marker();
	
	//
	return marker;
}

function createOverlay(){
	let overlay = new daum.maps.CustomOverlay();
	
	//
	return overlay;
}

function showMarkers(){
	for(let i=0; i<objects.length; i++){
		showMarker({index:i});
	}
}


/**
 * 
 * @param json {index:Number, marker:Object}
 * @returns
 */
function showMarker(json){
	//
	if($.cs.isNotNull(json.index)){
		objects[json.index].marker.setMap(map);
		return;
	}
	
	//
	if($.cs.isNotNull(json.marker)){
		for(let i=0; i<objects.length; i++){
			if(objects[i].marker === json.marker){
				objects[i].marker.setMap(map);
				return;
			}
		}
	}
	
}

/**
 * 
 * @param json {index:Number, marker:Object}
 * @returns
 */
function hideMarker(json){
	//
	if($.cs.isNotNull(json.index)){
		objects[json.index].marker.setMap(null);
		return;
	}
	
	//
	if($.cs.isNotNull(json.marker)){
		for(let i=0; i<objects.length; i++){
			if(objects[i].marker === json.marker){
				objects[i].marker.setMap(null);
				return;
			}
		}		
	}	
}


/**
 * 
 * @param json {index:Number, overlay:Object}
 * @returns
 */
function showOverlay(json){
	//
	if($.cs.isNotNull(json.index)){
		objects[json.index].overlay.setMap(map);
		return;
	}
	
	//
	if($.cs.isNotNull(json.overlay)){
		for(let i=0; i<objects.length; i++){
			if(objects[i].overlay === json.overlay){
				objects[i].overlay.setMap(map);
				return;
			}
		}
	}
}


/**
 * 
 * @param json {index:Number, overlay:Object}
 * @returns
 */
function hideOverlay(json){
	//
	if($.cs.isNotNull(json.index)){
		objects[json.index].overlay.setMap(null);
		return;
	}
	
	//
	if($.cs.isNotNull(json.overlay)){
		for(let i=0; i<objects.length; i++){
			if(objects[i].overlay === json.overlay){
				objects[i].overlay.setMap(null);
				return;
			}
		}
	}
}

/**
 * 
 * @param json {index:Number, marker:Object, overlay:Object}
 * @returns
 */
function getObject(json){
	//
	if($.cs.isNotNull(json.index)){
		return objects[json.index];
	}
	
	//
	if($.cs.isNotNull(json.marker)){
		for(let i=0; i<objects.length; i++){
			if(objects[i].marker === json.marker){
				return objects[i];
			}
		}
	}
	
	//
	if($.cs.isNotNull(json.overlay)){
		for(let i=0; i<objects.length; i++){
			if(objects[i].overlay === json.overlay){
				return objects[i];
			}
		}
	}
}

/**
 * 
 * @param json {marker:Object, overlay:Object}
 * @returns
 */
function addObject(json){
	objects.push(json);
}

function mapClicked(mouseEvent){
	//TODO
}