'use strict';
var ripple = new p5( function(p) {
  
  var dots = [];
  var rows = 40;
  var cols = 30;
  var element;

  p.setup = function () {
    element = p.createCanvas(800,600);
    element.parent("ripple");
    for (var i = 0; i<rows;i++){
      for (var j = 0; j<cols;j++){
        dots[i*cols+j]=new Dot(5+i*20,5+j*20);
      }
    }
  };

  p.draw = function () {
    p.background(17,74,84);
    for (var d of dots){
      d.run();
    }
  };

  //------------------------------------------------------------
  function Dot(_x,_y){
    this.acceleration = p.createVector(0,0);
    this.velocity = p.createVector(0,0);
    this.position = p.createVector(_x,_y);
    this.origin = p.createVector(_x,_y);
    this.radius = 20;
    this.maxSpeed = 10;
    this.maxAccel = 2;
  }

  Dot.prototype.run = function(){
    var force = this.getForce();
    this.acceleration.add(force);
    this.acceleration.limit(this.maxAccel);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.render();
  }

  Dot.prototype.getForce = function(){
    var force = p5.Vector.sub(p.createVector(p.mouseX,p.mouseY),this.origin);
    force.limit(3); 
    force.mult(p.cos(p.millis()/314));
    return force;
  }

  Dot.prototype.render = function(){
    p.fill(215,220,226);
    p.noStroke();
    p.ellipse(this.position.x, this.position.y,this.radius,this.radius);
  }
});
