
void function() {
    'use strict';

    var pool = [],
        wrap = document.getElementById('wrap'),
        panel = document.getElementById('panel'),
        configPanel = document.getElementById('config-panel'),
        filters = {},
        result = document.getElementById('result'),
        map = {},
        conf;

    conf = (function() {
        //config
        var numOfFilters = 50;
        var numOfFields  = numOfFilters + 10;
        var numOfCars = 2000;
        var totalIterations = numOfCars * numOfFields;

        return {
            numOfFilters: numOfFilters,
            numOfFields: numOfFields,
            numOfCars: numOfCars,
            totalIterations: totalIterations
        };
    })();

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
        panel.appendChild(frag);
    }

    function genMap( num ) {
        var map = {};
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

    function genPool(numOfCars, numOfFields) {
        var pool = [];
        var temp = {};
        for (var i = 0; i < numOfCars; i++) {
            temp = {};
            for (var j = 0; j < numOfFields; j++) {
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

    pool = genPool(conf.numOfCars, conf.numOfFields);
    map = genMap(conf.numOfFilters);
    genDom(map);

    function showConfig( conf ) {
        configPanel.innerHTML = [
            '<div class="config-wrap"><div>Number Of Cars :</div> <div>'+ conf.numOfCars +'</div></div>',
            '<div class="config-wrap"><div>Number Of Fields: </div><div>'+ conf.numOfFields +'</div></div>',
            '<div class="config-wrap"><div>Number of Filters: </div><div>'+ conf.numOfFilters +'</div></div>',
            '<div class="config-wrap"><div>Total Iterations: </div><div>'+ conf.totalIterations +'</div></div>'
        ].join('');
    }

    showConfig(conf);

    setTimeout(function() {

        var start = window.performance.now();
        genTotal(pool, map);
        updateFilters(filters, map);
        var end = window.performance.now();
        var time = (end - start) >>> 0;
        result.innerHTML = time + ' ms';
        
    }, 2000);
    
}();