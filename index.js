if(typeof AFRAME !== 'undefined'){
  AFRAME.registerComponent("proximity", {
    schema: {
      target: { type: "selector" },
      distance: { type: "number", default: 1 },
      drawLine: { default: false },
      color1: { default: "#0000ff" },
      color2: { default: "#00ff00" },
      customDataEvent: { default: '{"message": "no custom data provided"}'}
    },
    init: function() {
      if (this.data.drawLine) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, 0)
        );
        var material = new THREE.LineBasicMaterial({
          color: this.data.color1
        });
        this.data.colors = {
          standard: new THREE.Color(this.data.color1),
          selected: new THREE.Color(this.data.color2)
        };
        var line = new THREE.Line(geometry, material);
        this.el.object3D.add(line);
      }
    },
    tick: function() {
      var target = this.data.target;
      if (this.data.drawLine)
        var line = this.el.object3D.getObjectByProperty("type", "Line");
      if (target && this.el.object3D.visible && target.object3D.visible) {
        //Drawing line
        if (line) {
          var position = target.object3D.position.clone();
          target.object3D.getWorldPosition(position);
          var convertedPosition = this.el.object3D.worldToLocal(position);
          line.geometry.vertices[0] = convertedPosition;
          line.geometry.verticesNeedUpdate = true;
        }
        //Calc position
        var targetPostion = target.object3D.position;
        var thisPosition = this.el.object3D.position;
        var distance = thisPosition.distanceTo(targetPostion);
        if (
          distance <= this.data.distance &&
          !this.el.classList.contains("selected")
        ) {
          this.el.emit("proximity-event", {
            type: "selected",
            data: JSON.parse(this.data.customDataEvent)
          });
          this.el.classList.add("selected");
  
          line.material.color = this.data.colors.selected;
          line.material.needsUpdate = true;
        } else if (
          distance >= this.data.distance &&
          this.el.classList.contains("selected")
        ) {
          this.el.classList.remove("selected");
          this.el.emit("proximity-event", {
            type: "deselected",
            data: JSON.parse(this.data.customDataEvent)
          });
  
          line.material.color = this.data.colors.standard;
          line.material.needsUpdate = true;
        }
      } else {
        if (line) {
          line.geometry.vertices[0].set(0, 0, 0);
          line.geometry.verticesNeedUpdate = true;
        }
        //console.log('No target is set, mandatory')
      }
    }
  });
}
else{
  console.warn('WARNING: import AFRAME by CDN or npm module (npm install aframe)')
}
