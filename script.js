
void function() {
    'use strict';

    var pool = [],
        wrap = document.getElementById('wrap'),
        filters = {},
        map = {};

    var FilterEle = function(data) {       
        var me = this;
        me.data = data;
        me.wrap = make('div', 'filter-ele');
        me.label = make('div', 'filter-ele__label');
        me.text = make('div', 'filter-ele__text');
        me.label.innerHTML = me.data.label;
        me.wrap.appendChild(me.label);
        me.wrap.appendChild(me.text);

        me.updateText = function(num) {
            this.text.innerHTML = '( '+ num +' )';
        };

        me.getWrap = function() {
            return this.wrap;
        };

        me.updateText(me.data.text);
    };
    
    function make(name, cls, isFrag) {
        var dom;
        if(cls) {
            dom = document.createElement(name);
            dom.className = cls;
            return  dom;
        } else {
            return document.createDocumentFragment();
        }
    }

    function genVal() {
        var lookup = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        return lookup[Math.floor(Math.random() * 10)];
    }

    function genDom(map) {
        var fe;
        var frag = document.createDocumentFragment();
        for(var i in map) {
            fe = new FilterEle({
                label: i,
                text: map[i]
            });
            frag.appendChild(fe.getWrap());
            filters[i] = fe;
        }
        wrap.appendChild(frag);
    }

    function genMap() {
        var map = {};
        var num = 50;
        for (var i = 0; i < num; i++) {
            map[i + '-' + genVal()] = 0;
        }
        return map;
    }

    // noprotect
    function genTotal(pool, map) {
        var i = 0,
            ln = pool.length, car, j, key, c = 0;

        if (!ln) {
            return;
        }
        for (; i < ln; i++) {
            car = pool[i];
            for (j in car) {
                key = j + '-' + car[j];
                c++;
                if (typeof map[key] === 'number') map[key] ++;
            }
        }
        console.log(c);
    }

    function genPool() {
        var pool = [];
        var temp = {};
        for (var i = 0; i < 222; i++) {
            temp = {};
            for (var j = 0; j < 50; j++) {
                temp[j] = genVal();
            }
            pool.push(temp);
        }
        return pool;
    }

    function updateFilters(filters, map) {
        var f;
        for(var i in filters) {
            f = filters[i];
            f.updateText(map[i]);
        }
    }

    pool = genPool(pool);
    map = genMap();
    genDom(map);
    setTimeout(function() {
        console.time('mapping');
        genTotal(pool, map);
        updateFilters(filters, map);
        console.timeEnd('mapping');
    }, 3000);
    
}();