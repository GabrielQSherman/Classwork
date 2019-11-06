
window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
       

   context.translate((width / 2), height /2);
    
    context.rotate(Math.PI / 1000 );


    for (let i = 0; i < 300; i++) {
                        context.strokeStyle = "gold";
                        context.beginPath();
                        context.moveTo(0,0)
                        context.lineTo(width - i,height+i);
                        context.stroke();
                       context.rotate(width*height)
                    }

}

