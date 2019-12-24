/*
3dCamera.js 
Project specific - gives smooth camera control to the mouse when hovering over the scene object(s)
Author: Zach Moore - Zach@NerdVenture.net
*/

(function(){

    // Give mouse control of the 3d camera
    // each element will store its own data with the _c3d_ prefix to hopefully prevent any conflicts
    function mouseCamControl(e){
        div = e.currentTarget;

        div._c3d_sceneTrans = '';
        // get transforms from the transform attrib
        if(div.dataset && div.dataset.transform){
            div._c3d_sceneTrans = String(div.dataset.transform);
        }

        //get relative mouse coords to the div
        div._c3d_rect = div.getBoundingClientRect();
        div._c3d_relX = e.clientX - div._c3d_rect.left;
        div._c3d_relY = e.clientY - div._c3d_rect.top;

        // get the difference in movement from the last frame
        div._c3d_deltaX = div._c3d_relX - div._c3d_lastMouseX;
        div._c3d_deltaY = div._c3d_relY - div._c3d_lastMouseY;

        // store the current coordinates for the next frame
        div._c3d_lastMouseX = div._c3d_relX;
        div._c3d_lastMouseY = div._c3d_relY;

        //if the element has a dampen data attribute, use it
        div._c3d_dampening = (div.dataset && div.dataset.dampening) ? div.dataset.dampening : 0.002;
        
        // add the deltas to the rotation vector
        // multiply a number < 1 to dampen the effect
        div._c3d_rotY -= div._c3d_deltaX * div._c3d_dampening;
        div._c3d_rotX += div._c3d_deltaY * div._c3d_dampening;

        // apply transforms to the scene
        // if the scene has it's own transforms in the data-transform attribute prepend those first
        div.style.transform = div._c3d_sceneTrans + ' rotateX(' + div._c3d_rotX + 'deg) rotateY(' + div._c3d_rotY + 'deg)';
    };

    // get the logo div from the header
    // set mouse move event listener to give camera control to the mouse when hovering
    var scene = document.getElementById('logo-scene'); 
    scene.addEventListener('mousemove', mouseCamControl);
    // initialize properties to the dom element to track its own data
    scene._c3d_lastMouseX = scene._c3d_lastMouseY = scene._c3d_rotX = scene._c3d_rotY = 0; 

    // get all divs with the controllable data attribute    
    var controllables = document.querySelectorAll('div[data-controllable="true"]');

    // set mousemove event on every controllable div
    var cx = 0; //index
    for(cx in controllables){
        cdiv = controllables[cx];
        if(!cdiv || !cdiv.addEventListener){return;}
        cdiv.addEventListener('mousemove', mouseCamControl);
        // initialize properties to the dom element to track its own data
        cdiv._c3d_lastMouseX = cdiv._c3d_lastMouseY = cdiv._c3d_rotX = cdiv._c3d_rotY = 0; 
    }

})();