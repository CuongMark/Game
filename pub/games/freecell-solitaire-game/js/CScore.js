function CScore() {
    
    this.showScore = function(oPos, iPoint){
        var iTime=1000;
		
        var oScoreMoveBack = new createjs.Text("+"+iPoint,"bold 24px Arial", "#000000");
        oScoreMoveBack.x = oPos.x;
        oScoreMoveBack.y = oPos.y;
        oScoreMoveBack.scaleX=2;
        oScoreMoveBack.scaleY=2;
        oScoreMoveBack.textAlign = "right";
        oScoreMoveBack.textBaseline = "alphabetic";
		oScoreMoveBack.outline = 4;
        s_oStage.addChild(oScoreMoveBack);
		
        var oScoreMove = new createjs.Text("+"+iPoint,"bold 24px Arial", "#fff");
        oScoreMove.x = oPos.x;
        oScoreMove.y = oPos.y;
        oScoreMove.scaleX=2;
        oScoreMove.scaleY=2;
        oScoreMove.textAlign = "right";
        oScoreMove.textBaseline = "alphabetic";
        
        s_oStage.addChild(oScoreMove);
		
        createjs.Tween.get(oScoreMove).to({x:193 , y:45}, iTime, createjs.Ease.cubicIn).call(function(){s_oGame.updateScore(iPoint); s_oStage.removeChild(oScoreMove); });
        createjs.Tween.get(oScoreMove).to({scaleX:1 , scaleY:1}, iTime, createjs.Ease.linear);
		
	createjs.Tween.get(oScoreMoveBack).to({x:193 , y:45}, iTime, createjs.Ease.cubicIn).call(function(){ s_oStage.removeChild(oScoreMoveBack); });
        createjs.Tween.get(oScoreMoveBack).to({scaleX:1 , scaleY:1}, iTime, createjs.Ease.linear);

    };
    
    this.removeScore = function(iPoint, iTime){
        var oScoreNum = new createjs.Text(iPoint,"bold 24px Arial", "#ffffff");
        oScoreNum.x = 189;
        oScoreNum.y = 45;
        oScoreNum.alpha=0;
        oScoreNum.textAlign = "right";
        oScoreNum.textBaseline = "alphabetic";
        oScoreNum.lineWidth = 200;
        s_oStage.addChild(oScoreNum);
        createjs.Tween.get(oScoreNum).to({alpha:1}, iTime, createjs.Ease.linear).call(function(){s_oStage.removeChild(oScoreNum);});
    };

    this.displayMoves = function(iPoint, iTime){
        var oMoveNum = new createjs.Text(iPoint,"bold 24px Arial", "#ffffff");
        oMoveNum.x = 383;
        oMoveNum.y = 45;
        oMoveNum.alpha=0;
        oMoveNum.textAlign = "right";
        oMoveNum.textBaseline = "alphabetic";
        oMoveNum.lineWidth = 200;
        s_oStage.addChild(oMoveNum);
        createjs.Tween.get(oMoveNum).to({alpha:1}, iTime, createjs.Ease.linear).call(function(){s_oStage.removeChild(oMoveNum);});
        
    };

}