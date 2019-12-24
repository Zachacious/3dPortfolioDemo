/*
3dBoxGen.js
Automatically generates 3d boxes from divs containing certain data attributes
Author: Zach Moore - Zach@NerdVenture.net
*/ 

(function() {

    /*
    Creates a 3d box using css transforms given the div and the dimensions
    params:
        div = a div that contains child divs for the faces of the box
        width = width of the box without a unit ( 'px' '%' etc)
        height = height of the box without a unit ( 'px' '%' etc)
        depth = dpeth of the box without a unit ( 'px' '%' etc)
        unit = the unit to use for dimensions and transforms ( 'px' '%' etc)
    */
    function create3DBox(div, width, height, depth, unit){
        var objDiv = div;
        var boxWidth = width || 300;
        var boxHeight = height || 300;
        var boxDepth = depth || 300;
        var boxUnit = unit || 'px';

        if(!objDiv){ return; }

        // offsets needed to move the faces into the correct positions after transformations
        var hOffset = (boxWidth - boxDepth)/2;
        var vOffset = (boxHeight - boxDepth)/2;

        // get every 'face' div contained in the object
        var faces = objDiv.querySelectorAll('div[data-boxFace]');
        var x=0; // index

        for(x in faces){

            var face = faces[x];

            if(!face.dataset){return;}
            
            // apply the appropriate styles and transforms for the 'face' div
            switch(face.dataset.boxface){
                case 'front':
                    face.style.position = 'absolute';
                    face.style.width = String(boxWidth) + boxUnit;
                    face.style.height = String(boxHeight) + boxUnit;
                    face.style.transform ='rotateY(0deg) translateZ(' + (boxDepth/2) + boxUnit +')';
                    break;
                case 'back':
                    face.style.position = 'absolute';
                    face.style.width = String(boxWidth) + boxUnit;
                    face.style.height = String(boxHeight) + boxUnit;
                    face.style.transform ='rotateY(180deg) translateZ(' + (boxDepth/2) + boxUnit +')';
                    break;
                case 'left':
                    face.style.position = 'absolute';
                    face.style.left = String(hOffset) + boxUnit;
                    face.style.width = String(boxDepth) + boxUnit;
                    face.style.height = String(boxHeight) + boxUnit;
                    face.style.transform ='rotateY(-90deg) translateZ(' + (boxWidth/2) + boxUnit +')';
                    break;
                case 'right':
                    face.style.position = 'absolute';
                    face.style.left = String(hOffset) + boxUnit;
                    face.style.width = String(boxDepth) + boxUnit;
                    face.style.height = String(boxHeight) + boxUnit;
                    face.style.transform ='rotateY(90deg) translateZ(' + (boxWidth/2) + boxUnit +')';
                    break;
                case 'top':
                    face.style.position = 'absolute';
                    face.style.top = String(vOffset) + boxUnit;
                    face.style.width = String(boxWidth) + boxUnit;
                    face.style.height = String(boxDepth) + boxUnit;
                    face.style.transform ='rotateX(90deg) translateZ(' + (boxHeight/2) + boxUnit +')';
                    break;
                case 'bottom':
                    face.style.position = 'absolute';
                    face.style.top = String(vOffset) + boxUnit;
                    face.style.width = String(boxWidth) + boxUnit;
                    face.style.height = String(boxDepth) + boxUnit;
                    face.style.transform ='rotateX(-90deg) translateZ(' + (boxHeight/2) + boxUnit +')';
            }
        }

    }

    /*
    Gathers all the box divs on the page and creates 3d boxes 
    */
    function init3d(){

        // get all 'box' divs on the page
        var boxObjs = document.querySelectorAll('div[data-boxType="box"]');

        var x=0; // index
        for(x in boxObjs){

            var box = boxObjs[x];

            if(!box || !box.dataset){return;}

            var width = box.dataset.boxwidth;
            var height = box.dataset.boxheight;
            var depth = box.dataset.boxdepth;
            var unit = box.dataset.boxunit;

            // set the required styles on the object div
            box.style.display = 'block'; 
            box.style.position = 'relative'; 
            box.style.width = String(width) + unit;
            box.style.height = String(height) + unit;
            box.style.transformStyle = 'preserve-3d'; 

           // do the magic
            create3DBox(box, width, height, depth, unit);
        }
    }

    init3d(); // execute
})();