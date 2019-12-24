/*
leafgen.js
Particle generator for creating a wind blown falling leaf effect
Author: Zach Moore - Zach@NerdVenture.net
*/

(function(){

    var emitter = document.getElementById('leaf-emitter');

    var dampen = 0.05;

    //https://gist.github.com/timohausmann/4997906
    function rndMinMax(t,n,a){
        var r=t+Math.random()*(n-t);
        return a&&(r=Math.round(r)),r;
    }

    function pxToVw(px){
        return px * (100 / (document.documentElement.clientWidth));
    }

    function getTransforms(el){
        if(!el){return;}

        var trans = window.getComputedStyle(el).getPropertyValue('transform');
        var mat = new DOMMatrix(trans);

        return  {
            x: pxToVw(mat.m41),
            y: pxToVw(mat.m42),
            z: pxToVw(mat.m43),
        };
    }

    var emitterTrans = getTransforms(emitter);

    function create(){
        var particle = {
            x: rndMinMax(200, -300),
            y: rndMinMax(-200, 100),
            z: rndMinMax(-300, 300),
            rotX: rndMinMax(0, 360),
            rotY: rndMinMax(0, 360),
            rotZ: rndMinMax(0, 360),
        }

        var delta = {
            x: -(emitterTrans.x - particle.x) * dampen,
            y: -(emitterTrans.y - particle.y) * dampen,
            z: -(emitterTrans.z - particle.z) * dampen,
        }

        var pdiv = document.createElement('div');
        emitter.appendChild(pdiv);

        pdiv.classList.add('trans-ease');
        pdiv.classList.add('leaf');

        if(particle.z < -50){ pdiv.style.opacity=0.3;  }

        pdiv.__x = emitterTrans.x;
        pdiv.__y = emitterTrans.y;
        pdiv.__z = emitterTrans.z;

        pdiv.__startTime = new Date().getTime()

        // pdiv._pos_interval_3d = function (timestamp, duration) {
        //     var ts = timestamp || new Date().getTime();
        //     var runtime = ts - pdiv.__startTime;
        //     pdiv.style.transform = 'translateX(' + (pdiv.__x += delta.x) + 'vw) translateY(' + (pdiv.__y += delta.y) + 'vw) translateZ(' + (pdiv.__z += delta.z) + 'vw)\
        //      rotateX(' + (particle.rotX++) + 'deg) rotateY(' + (particle.rotY++) + 'deg) rotateZ(' + (particle.rotZ) + 'deg)';
        //     if (runtime < duration) {
        //         requestAnimationFrame(function(timestamp){
        //             pdiv._pos_interval_3d(timestamp, duration);
        //         })
        //     } else {
        //         console.log('end');
        //         emitter.removeChild(pdiv);
        //         create(); // create new particle
        //     }
        // }

        pdiv._pos_interval_3d = window.setInterval(function(){
            pdiv.style.transform = 'translateX(' + (pdiv.__x += delta.x) + 'vw) translateY(' + (pdiv.__y += delta.y) + 'vw) translateZ(' + (pdiv.__z += delta.z) + 'vw)\
             rotateX(' + (particle.rotX++) + 'deg) rotateY(' + (particle.rotY++) + 'deg) rotateZ(' + (particle.rotZ) + 'deg)';
        }, 50);

        window.setTimeout(function() {
            window.clearInterval(pdiv._pos_interval_3d);
            // emitter.removeChild(pdiv);
            emitter.removeChild(pdiv);
            create(); // create new particle
          }, Math.random() * (2000) + 1000);

          

        //   requestAnimationFrame(function(timestamp){
        //       pdiv._pos_interval_3d(timestamp, 25)
        //   });

        //   window.setTimeout(create, 25); 
          
    }

    for(var i = 0; i < 100; i++){
        create();
    }

    

})();