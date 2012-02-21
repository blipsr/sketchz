// Initializes the sketch board
$(document).ready(function(){
    
    var canvas = $('#sketchz-board')[0];
    var context = canvas.getContext('2d');
    
    // Defaults
    context.strokeStyle = "#ccff66";
	context.lineWidth = 5;
	
	// Create our marker
	marker = new marker();
	
	// Bind some events
	$(canvas).bind('mousedown', mc);
	$(canvas).bind('mousemove', mc);
	$(canvas).bind('mouseup', mc );
	
    function marker () 
    {
    	var marker = this;
    	this.started = false;

    	this.mousedown = function (pos)
    	{
    	  context.beginPath();
    	  context.moveTo(pos._x, pos._y);
    	  marker.started = true;
    	};

    	this.mousemove = function (pos)
    	{
    		if (marker.started) 
    		{
    			context.lineTo(pos._x, pos._y);
    			context.stroke();
    		}
    	};

    	this.mouseup = function (pos) 
    	{
    		if (marker.started) 
    		{
    			marker.mousemove(pos);
    			marker.started = false;
    		}
    	};
    }

    function mc (pos) 
    {
    	if (pos.layerX || pos.layerX == 0)
    	{ 
    	    // Firefox
    		pos._x = pos.layerX;
    		pos._y = pos.layerY;
    	} 
    	else if (pos.offsetX || pos.offsetX == 0)
    	{ 
    	    // Opera
    		pos._x = pos.offsetX;
    		pos._y = pos.offsetY;
    	}

    	// Call the event handler of the tool.
    	var func = marker[pos.type];
    	if (func) 
    	{
    		func(pos);
    	}
    }

});