
var divParents = document.getElementById('canvasDiv');
var canvas = document.createElement('canvas');
// var debugDiv = document.createElement('span');
canvas.setAttribute('width',divParents.offsetWidth);
canvas.setAttribute('height',divParents.offsetHeight);
canvas.setAttribute('id','canvas');
divParents.appendChild(canvas);
var context = canvas.getContext('2d');
var circleCoord = [];
var stay = 0;
var dir = dirY = 1;
var auto = true;
mX = window.innerWidth/2;
mY = window.innerHeight/2;
var handle = function(e)
{
  stay = 0;
  auto=false;
  mX = e.pageX - this.offsetLeft;
  mY = e.pageY - this.offsetTop;
};
canvas.addEventListener('mousemove',handle);
canvas.addEventListener('touchmove',handle);
var frame = 0;
function render()
{
    //mX += 0.1;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  // divParents.appendChild(debugDiv);
  // debugDiv.classList.add('debug');
  // debugDiv.innerHTML = mX + ' ' + mY;
  var cX = canvas.width/2;
  var cY = canvas.height/2;
    function drawCircle(mx,my,radius,opacity)
    {
      context.beginPath();
      context.arc(mx,my,radius,0,2*Math.PI,false);
      //context.fillStyle = 'green';
      //context.fill();
      context.lineWidth = 3;
      var ctx = context;
      context.strokeStyle = 'rgba(95, 176, 223,'+opacity+')';
      //ctx.fillStyle = 'rgba(225,225,225,0.5)';
      //ctx.fillRect(25,72,32,32);
      context.opacity = 1;
      context.stroke();
      
  }
 
  
  frame++;
   if (frame % 1 == 0)
     {
        if (frame > 5 && frame % 2 == 0 && circleCoord[circleCoord.length-1][0] == mX && circleCoord[circleCoord.length-1][1] == mY)
          {
            stay++;
            if (stay > 50) auto = true;  
          }
        if (!auto) {
          circleCoord.push([mX,mY,frame]);
        }
       else {
          stay++;
          stay %= 400;
          if (stay % 93 == 0)
            {
              dir = -dir;
              dirY = -dirY;
            }
          //var dir = -1;
		  if ( $(window).width() < 640 ) {
			circleCoord.push([mX+dir*(Math.random()*3 - 100 + stay),mY+dirY*(Math.random()*3 - 100 + stay),frame]);
		  } else if ( $(window).width() > 640 ) {
			 circleCoord.push([mX+dir]);  	
		  }
      
         
       
        // circleCoord.push([mX+(-1 + Math.random()*2)*(Math.random()*100+100),mY+(-1 + Math.random()*2)*(Math.random()*100+100),frame]);
       }
     }
   
    if (circleCoord.length > 100) circleCoord.shift();
    for (var i = 0,c = circleCoord.length;i<c;i++)
      {
         var base = frame - circleCoord[i][2] + 15;
          var aX = circleCoord[i][0];
          var cX = circleCoord[i][1];
        drawCircle(aX+base,cX+base/2,3*base+base/10,1.3/base);
        drawCircle(aX,cX,1.5*base+base/10,2.3/base);
        drawCircle(aX,cX,2*base+base/20,2.5/base);
      }
  requestAnimationFrame(render);
}
render();



