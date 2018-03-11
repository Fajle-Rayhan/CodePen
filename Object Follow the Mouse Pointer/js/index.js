var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var settings = {
  amp: 20
};

var gui = new dat.GUI();

gui.add(settings, 'amp', -40, 40).step(10);

var stats = new Stats();

stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '15px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

var Playground = function () {
  function Playground(config) {
    _classCallCheck(this, Playground);

    this.config = config;

    this.canvas = this.config.canvas;
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('resize', this._setSize.bind(this), false);

    this.mouseX = 0;
    this.mouseY = 0;

    document.body.addEventListener('mousemove', this.getMousePos.bind(this), false);
  }

  _createClass(Playground, [{
    key: '_setSize',
    value: function _setSize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }, {
    key: 'getMousePos',
    value: function getMousePos(e) {
      var rect = this.canvas.getBoundingClientRect();

      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    }
  }, {
    key: 'loop',
    value: function loop() {
      window.requestAnimationFrame(this.loop.bind(this));
      stats.begin();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i = 0; i <= 6; i++) {
        var _x = this.canvas.width / 2 + (this.mouseX - this.canvas.width / 2) / this.canvas.width / 2 * settings.amp * (i + 1);
        var _y = this.canvas.height / 2 + (this.mouseY - this.canvas.height / 2) / this.canvas.height / 2 * settings.amp * (i + 1);

        this.ctx.strokeStyle = 'rgba(255, 255, 255, ' + i / 10 * 2 + ')';
        this.ctx.beginPath();
        this.ctx.arc(_x, _y, 45 + i * 3, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.stroke();
      }

      this.ctx.fillStyle = '#fff';
      this.ctx.beginPath();
      this.ctx.arc(this.mouseX, this.mouseY, 4, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fill();

      stats.end();
    }
  }, {
    key: 'start',
    value: function start() {
      this._setSize();

      this.mouseX = this.canvas.width / 2;
      this.mouseY = this.canvas.height / 2;

      this.loop();
    }
  }]);

  return Playground;
}();

var pg = new Playground({
  canvas: document.getElementById('playground')
});

pg.start();

var popupBtn = document.querySelector('.popup__btn');
var popup = document.querySelector('.popup');

popupBtn.addEventListener('click', function (e) {
  popupBtn.classList.toggle('popup__btn_close');
  popup.classList.toggle('popup_show');
}, false);