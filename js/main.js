// main.js

(function(ext) {
    var device = null;
    var _rxBuf = [];
    var  _RVal =0; 
	var _ack = false; 
    var actions = {
        "home":0x30,
        "forward":0x31,
        "backward":0x32,
        "turn left":0x33,
        "turn right":0x34,
        "updown":0x35,
        "moonwalker left":0x36,
        "moonwalker right":0x37,
        "swing":0x38,
        "crusaito 1":0x39,
        "crusaito 2":0x3130,
        "jump":0x3131,
        "flapping 1":0x3132,
        "flapping 2":0x3133,
        "tiptoeSwing":0x3134,
        "bend left":0x3135,
        "bend right":0x3136,
        "shakeLeg right":0x3137,
        "shakeLeg left":0x3138,
        "jitter":0x3139,
        "ascendingTurn":0x3230
    };

    var gestures = {
        "happy":0x31,
        "supperhappy":0x32,
        "sad":0x33,
        "sleeping":0x34,
        "fart":0x35,
        "confused":0x36,
        "love":0x37,
        "angry":0x38,
        "fretful":0x39,
        "magic":0x3130,
        "wave":0x3131,
        "victory":0x3132,
        "fail":0x3133
    };

    var songs = {
        "connection": 0x31,
        "disconnection":0x32,
        "surprise":0x33,
        "OhOoh":0x34,
        "OhOoh2":0x35,
        "cuddly":0x36,
        "sleeping":0x37,
        "happy":0x38,
        "supperhappy":0x39,
        "happy short":0x3130,
        "sad":0x3131,
        "confused":0x3132,
        "fart1":0x3133,
        "fart2":0x3134,
        "fart3":0x3135
    };

    var speeds = {
        "very fast":0x00323530,
        "fast":0x00353030,
        "normal":0x31303030,
        "slow":0x32303030,
        "very slow": 0x34303030
    }

	ext.resetAll = function(){};
	
	ext.runArduino = function(){
		
	};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ext.move = function(action, speed) {
        action = actions[action];
        speed = speeds[speed];
        // Cmd: M actionCode speed
      device.send([0x4D, 0x20, action >> 8, action, 0x20, speed >> 24, speed >> 16, speed >> 8, speed,  0x20, 0x0D, 0x0A]);
	  //device.send([0x4D, 0x20, action, 0x20, speed >> 24, speed >> 16, speed >> 8, speed,  0x20, 0x0D, 0x0A]);
	  // device.send([0x4D, 0x20, 0x30 ,0x20, 0x0D, 0x0A]);
	 // while (_ack == false) ; //note: add time out processing
	  _ack = false;
    };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    ext.gesture = function(gesture) {
        gesture = gestures[gesture];
        // Cmd: H gestureCode
        device.send([0x48, 0x20, gesture >> 8, gesture, 0x0D, 0x0A]);
    };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ext.sing = function(song) {
        song = songs[song];
        // Cmd: K songCode
        device.send([0x4B, 0x20, song >> 8, song, 0x0D, 0x0A]);
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
	//////////////////////////////////////////
   var _isParseStart = false;
	var _isParseStartIndex = 0;
	var _isAck = false; 
	 /*
    function processData(bytes) {
       // trace(bytes);
		var lenth = bytes.length;
		for (var index = 0; index<bytes.length;index++){
			var c = bytes[index];
		   _rxBuf.push(c);
		
        if (_rxBuf[0] == '&' && _rxBuf[1] == '&' && _rx[3] == '%' && _rxBuf[4] == '%')   
		{
		if (_rxBuf[2] == 'A') {_isAck = true; 
		console.log('Acknowleaged:' + _rxBuf); 
		}
		
		}
		}
    }*/
function processData(bytes) {
		var len = bytes.length;
		if(_rxBuf.length>30){ //clear buffer 
			_rxBuf = [];
		}
		for(var index=0;index<bytes.length;index++){
			var c = bytes[index];
			_rxBuf.push(c);
			if(_rxBuf.length>=2){
				if(_rxBuf[_rxBuf.length-1]==0x26 && _rxBuf[_rxBuf.length-2]==0x26	&& _isParseStart == false){   //start of a message is "&&" 
					_isParseStart = true;         
					_isParseStartIndex = _rxBuf.length-2;
				}
				if(_rxBuf[_rxBuf.length-1]==0xa && _rxBuf[_rxBuf.length-2]==0x25 && _rxBuf[_rxBuf.length-3]==0x25 &&_isParseStart){    //end of message is "%%\n", recevied all of message
					_isParseStart = false; 
					
					var position = _isParseStartIndex+2;
					var extId = _rxBuf[position];  // ID of message
					if (extId == 0x41) {    //if receive 'A' character - > Acknowledge 
					_ack = true;
					}
					else if (extId == 0x46){ //if receive  'F' character -> Final Acknowledge 
						// i do not know what to do; 
					}
					else 
					{
					position++;
					_Rval = readInt(_rxBuf,position,2);
					//1 byte 2 float 3 short 4 len+string 5 double
					}
					
					}
					
					_rxBuf = [];
				}
			} 
		}
   
////////////////////////////////////	
	function readInt(arr,position,count){
		var result = 0;
		for(var i=0; i<count; ++i){
			result |= arr[position+i] << (i << 3);
		}
		return result;
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Extension API interactions
    var potentialDevices = [];
    ext._deviceConnected = function(dev) {
        potentialDevices.push(dev);

        if (!device) {
            tryNextDevice();
        }
    }

    function tryNextDevice() {
        // If potentialDevices is empty, device will be undefined.
        // That will get us back here next time a device is connected.
        device = potentialDevices.shift();
        if (device) {
            device.open({ stopBits: 0, bitRate: 9600, ctsFlowControl: 0 }, deviceOpened);
        }
    }

    function deviceOpened(dev) {
        if (!dev) {
            // Opening the port failed.
            tryNextDevice();
            return;
        }
        device.set_receive_handler('ZowiVbot',function(data) {
            processData(data);
        });
    };

    ext._deviceRemoved = function(dev) {
        if(device != dev) return;
        device = null;
    };

    ext._shutdown = function() {
        if(device) device.close();
        device = null;
    };

    ext._getStatus = function() {
        if(!device) return {status: 1, msg: 'Zowi disconnected'};
        return {status: 2, msg: 'Zowi connected'};
    }

    var descriptor = {};
	ScratchExtensions.register('ZowiVbot', descriptor, ext, {type: 'serial'});
})({});