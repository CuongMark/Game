function CInterface(){
    var _oAudioToggle;
    var _oButExit;
    var _oButHelp;
    var _oButRestart;
    var _oHelpPanel=null;
    var _oScoreText;
    var _oScoreDisplay;
    var _oScoreNum;
    var _oMovesDisplay;
    var _oMovesText;
    var _oMovesNum;
    var _oHintPanel;
    var _oHintText;
    var _oHintCointainer;
    
    this._init = function(){                
        var oExitX;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(CANVAS_WIDTH - (oSprite.height/2)- 10,(oSprite.height/2) + 10,oSprite,true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 80;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(oExitX,10+ (oSprite.height/2),oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        oExitX = oExitX-68;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_help');
        _oButHelp = new CGfxButton(oExitX,10+ (oSprite.height/2),oSprite,true);
        _oButHelp.addEventListener(ON_MOUSE_UP, this._onButHelpRelease, this);
        _oButHelp.setVisible(false);
        
        oExitX = oExitX-120;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_restart');
        _oButRestart = new CTextButton(oExitX,10+ (oSprite.height/2),oSprite,TEXT_RESTART,"Arial","#ffffff",26);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onButRestartRelease, this);
        _oButRestart.setTextPosition(35);
        
        _oScoreText = new createjs.Text(TEXT_SCORE,"bold 24px Arial", "#ffffff");
        _oScoreText.x = 30;
        _oScoreText.y = 45;
        _oScoreText.textAlign = "left";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 200;
        s_oStage.addChild(_oScoreText);
        
        var oSprite = s_oSpriteLibrary.getSprite('score_display');
        _oScoreDisplay = createBitmap(oSprite);
        _oScoreDisplay.scaleX=1;
        _oScoreDisplay.x = 116;
        _oScoreDisplay.y = 15;       
        s_oStage.addChild(_oScoreDisplay);
        
        _oScoreNum = new createjs.Text("0","bold 24px Arial", "#ffffff");
        _oScoreNum.x = 189;
        _oScoreNum.y = 45;
        _oScoreNum.textAlign = "right";
        _oScoreNum.textBaseline = "alphabetic";
        _oScoreNum.lineWidth = 200;
        s_oStage.addChild(_oScoreNum);
        
        _oMovesText = new createjs.Text(TEXT_MOVES,"bold 24px Arial", "#ffffff");
        _oMovesText.x = 222;
        _oMovesText.y = 45;
        _oMovesText.textAlign = "left";
        _oMovesText.textBaseline = "alphabetic";
        _oMovesText.lineWidth = 200;
        s_oStage.addChild(_oMovesText);
        
        var oSprite = s_oSpriteLibrary.getSprite('moves_display');
        _oMovesDisplay = createBitmap(oSprite);
        _oMovesDisplay.x = 310;
        _oMovesDisplay.y = 15;       
        s_oStage.addChild(_oMovesDisplay);
        
        _oMovesNum = new createjs.Text("0","bold 24px Arial", "#ffffff");
        _oMovesNum.x = 383;
        _oMovesNum.y = 45;
        _oMovesNum.textAlign = "right";
        _oMovesNum.textBaseline = "alphabetic";
        _oMovesNum.lineWidth = 200;
        s_oStage.addChild(_oMovesNum);
        
        var oHintPanel = s_oSpriteLibrary.getSprite('hintpanel');
        _oHintPanel = createBitmap(oHintPanel);
        
        _oHintText = new createjs.Text(TEXT_HINT,"bold 14px Arial", "#ffffff");
        _oHintText.x = 15;
        _oHintText.y = 25;
        _oHintText.textAlign = "left";
        _oHintText.textBaseline = "alphabetic";
        _oHintText.lineWidth = 200;
        
        _oHintCointainer = new createjs.Container();
        _oHintCointainer.addChild(_oHintPanel, _oHintText);
        _oHintCointainer.x = CANVAS_WIDTH/2 - oHintPanel.width/2;
        _oHintCointainer.y = 540;
        _oHintCointainer.alpha=0;
        s_oStage.addChild(_oHintCointainer);
        
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        _oHintCointainer.off("mousedown",this._onButRestartRelease);
        _oButExit.unload();
        _oButHelp.unload();
        _oButRestart.unload();
        if(_oHelpPanel!==null){
            _oHelpPanel.unload();
        }
    };

    this.refreshScore = function(iValue){
        _oScoreNum.alpha=1;
        _oScoreNum.text = iValue;
    };

    this.fadeScore = function(iValue, iTime){
        var oParent=this;
        createjs.Tween.get(_oScoreNum).to({alpha:0}, iTime, createjs.Ease.linear).call(function(){oParent.refreshScore(iValue); });
    };

    this._refreshMove = function(iValue){
        _oMovesNum.alpha=1;
        _oMovesNum.text = iValue;
    };

    this.fadeMove = function(iValue, iTime){
        var oParent=this;
        createjs.Tween.get(_oMovesNum).to({alpha:0}, iTime, createjs.Ease.linear).call(function(){oParent._refreshMove(iValue); });
    };

    this.showHint = function(szType,iNum){
        
        if(szType === "move"){
            _oHintText.text = TEXT_HINT_MOVE;
            _oHintPanel.scaleX=0.90;
            _oHintPanel.scaleY=1.5;
            _oHintText.lineWidth = 180;
            var oParent = this;
            createjs.Tween.get(_oHintCointainer, {override:true}).to({alpha:1}, 3000, createjs.Ease.linear).call(function(){oParent.callRestart();});
            
        } else {
            var oCardText = " CARDS"
            if(iNum === 1){
                oCardText = " CARD"
            }
            _oHintText.text = TEXT_HINT +iNum + oCardText+ TEXT_HINT2;
            _oHintPanel.scaleX=0.99;
            _oHintPanel.scaleY=1.5;
            _oHintText.lineWidth = 220;
            
            createjs.Tween.get(_oHintCointainer, {override:true}).to({alpha:1}, 3000, createjs.Ease.linear).call(function(){
                createjs.Tween.get(_oHintCointainer).to({alpha:0}, 3000, createjs.Ease.linear)});
            
        }                   
    };

    this.callRestart = function(){
        _oHintCointainer.on("mousedown",this._onButRestartRelease);
    };

    this.setVisibleButHelp = function(){
        _oButHelp.setVisible(true);
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        s_oGame.restartGame();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
      s_oGame.onExit();  
    };
    
    this._init();
    
    return this;
}
