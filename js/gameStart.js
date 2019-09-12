const gameStart = {
  key: 'gameStart',
  preload: function() {
    // 載入資源
    this.load.image('bg1', '../images/layout/bg/bg-head-sky.png'),
      this.load.image('bg2', '../images/layout/bg/bg-head-mountain-back.png'),
      this.load.image('bg3', '../images/layout/bg/bg-main.png');
    this.load.image('bg4', '../images/layout/bg/bg-head-mountain-front.png');
    this.load.image('footer', '../images/layout/bg/bg-footer.png');
    this.load.spritesheet('user', '../images/player.png', {
      frameWidth: 144,
      frameHeight: 120
    });
    this.load.image('go', '../images/start.png');
  },
  create: function() {
    // 資源載入完成，加入遊戲物件及相關設定
    this.bg3 = this.add.tileSprite(cw / 2, ch / 2, cw, ch, 'bg3');
    this.bg1 = this.add.tileSprite(cw / 2, 0, cw * 1.5, ch / 2, 'bg1');
    this.bg2 = this.add.tileSprite(cw / 2, 100, cw * 1.5, 176, 'bg2');
    this.bg4 = this.add.tileSprite(cw / 2, 175, cw, 30, 'bg4');
    this.footer = this.add.tileSprite(cw / 2, ch, cw * 1.5, 170, 'footer');
    this.go = this.add.image(cw / 2, ch / 2, 'go');
    
    this.footer.flipY = true;
    // this.go.setScale(0.5);
    //點擊事件
    this.go.setInteractive();
    this.go.on('pointerdown',()=>{
        // console.log('go')
        this.scene.start('gamePlay'); 
    })
  },
  update: function() {
    // 遊戲狀態更新
    this.bg2.tilePositionX += 2;
    this.bg4.tilePositionX += 3;
    this.footer.tilePositionX += 3;
  }
};
