(function (win, doc) {


    /**
     * 是一个图片轮播效果，会有一个配置参数
     * @param {Object} obj 是一个配置选项
     * 
     * 配置如下：
     * isArrowContrl    Boolean   是否启用左右切换功能        默认值 false
     * isplay           Boolean   是否启用自动播放            默认值  false
     * delay            Number    自动播放的延迟时间          默认值 3000
     * container        Object    width：默认是图片宽度 height：默认是图片的高度 可选参数，初始化容器的宽高
     * element          容器的class名字
     * 
     */
    function slider(obj) {
        var container = obj.element?doc.querySelectorAll(obj.element):document.querySelector('.slider-container');
        var img = container.querySelector('img');
        var imgWidth = img.width; //一个图片的宽度
        var imgHeight = img.height; //一个图片的高度
        var sliderWidth = obj.container ? obj.container.width : imgWidth;
        container.style.width = obj.container ? obj.container.width + 'px' : imgWidth + 'px';
        container.style.height = obj.container ? obj.container.height + 'px' : imgHeight + 'px';
        var wrapper = container.querySelector('.slider-wrapper');
        var slider = container.querySelectorAll('.slider-container .slider');
        var poins = null;
        var prev = null;
        var next = null;
        var timer = null;
        var done = false;
        console.log(slider);
        var index = 1;

        var len = 0;

        init();





        function init() {
            var first = wrapper.firstElementChild.cloneNode(true); //克隆 复制
            var last = wrapper.lastElementChild.cloneNode(true);
            wrapper.appendChild(first);
            wrapper.insertBefore(last, wrapper.firstElementChild);

            slider = container.querySelectorAll('.slider-container .slider');
            len = slider.length;
            wrapper.style.width = len * sliderWidth + 'px';
            wrapper.style.left = -sliderWidth + 'px';
            createPoins(len);
            poins[index - 1].className = 'poin active';
            createArrow();
            if (obj.isArrowContrl) {
                prev.style.display = 'block';
                next.style.display = 'block';
            } else {
                prev.style.display = 'none';
                next.style.display = 'none';
            }
            if (obj.isplay) {
                play();
                container.onmouseout = play;
                container.onmouseover = stop;
            }
        }

        function play() {

            timer = setInterval(function () {
                next.onclick();
            }, obj.delay || 3000);
        }

        function stop() {
            clearInterval(timer);
        }

        function createPoins(len) {
            var sliderPoins = document.createElement('div');
            sliderPoins.className = 'slider-poins';
            for (var i = 0; i < len - 2; i++) {
                var poin = document.createElement('div');
                poin.className = 'poin';
                poin.index = i + 1;
                sliderPoins.appendChild(poin);
            }
            container.appendChild(sliderPoins);
            poins = container.querySelectorAll('.poin');
            for (var i = 0; i < poins.length; i++) {
                poins[i].onclick = function () {
                    // 当前按下的poins-当前索引index
                    var offset = (this.index - index) * -sliderWidth;
                    if (!done) {
                        animate(offset)
                    };
                    index = this.index;
                    showPoin();
                }
            }
        }

        function createArrow() {
            prev = document.createElement('div');
            prev.className = 'slider-btn slider-prev';
            prev.innerText = '<';
            container.appendChild(prev);
            next = document.createElement('div');
            next.className = 'slider-btn slider-next';
            next.innerText = '>';
            container.appendChild(next);
        }
        prev.onclick = function () {
            if (!done) {
                animate(sliderWidth, function () {
                    index = index === 1 ? (len - 2) : index - 1;
                    showPoin();
                })
            }
        }

        next.onclick = function () {
            if (!done) {
                animate(-sliderWidth, function () {
                    index = index === (len - 2) ? 1 : index + 1;
                    showPoin();
                })
            };
        }

        function getStyle(obj, attr) {
            return window.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
        }

        function showPoin() {
            for (var i = 0; i < poins.length; i++) {
                if (/active/g.test(poins[i].className)) {
                    poins[i].className = poins[i].className.replace(/active/g, '');
                    break;
                }
            }
            poins[index - 1].className = 'poin active'

        }

        function animate(offset, callback) {
            var newLeft = parseInt(getStyle(wrapper, 'left')) + offset;
            var time = 300;
            var interval = 10;
            var speed = offset / (time / interval);

            function start() {
                done = true;
                if (
                    (speed < 0 
                && parseInt(getStyle(wrapper, 'left')) > newLeft) 
                || (speed > 0 
                && parseInt(getStyle(wrapper, 'left')) < newLeft)
                ) {
                    wrapper.style.left = parseInt(getStyle(wrapper, 'left')) + speed + 'px';
                    setTimeout(start, interval);
                } else {
                    done = false;
                    wrapper.style.left = newLeft + 'px';
                    if (parseInt(getStyle(wrapper, 'left')) < -sliderWidth * (len - 2)) {
                        wrapper.style.left = -sliderWidth + 'px';
                    }
                    if (parseInt(getStyle(wrapper, 'left')) > -sliderWidth) {
                        wrapper.style.left = -sliderWidth * (len - 2) + 'px';
                    }
                    callback && callback();
                }
            }
            start();
        }
    }

    win['slider'] = slider;
}(window, document));