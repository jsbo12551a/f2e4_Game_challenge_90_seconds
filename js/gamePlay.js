const getRandom = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const gamePlay = {
  key: 'gamePlay',
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
    this.load.image('win', '../images/layout/img-win.png');
    this.load.image('failure', '../images/layout/img-failure.png');
    this.load.image('win-title', '../images/layout/img-win-tittle.png');
    this.load.image('failure-title', '../images/layout/img-failure-tittle.png');
    this.load.image('Group1', '../images/layout/Group261.png');
    this.load.image('Group2', '../images/layout/Group250.png');
    this.load.image('Group3', '../images/layout/Group251.png');

    this.load.image('go', '../images/start.png');
    this.timeInt = 30;
    this.bgSpeed = 1;
    this.gameStop = false;

    this.monsterArr = []; // 存放所有怪物實體
    this.monsterArr2 = []; // 存放所有怪物實體2
    this.masIdx = 0; // 怪物索引
    this.masIdx2 = 1; // 怪物索引2
  },
  create: function() {
    // 資源載入完成，加入遊戲物件及相關設定
    this.bg3 = this.add.tileSprite(cw / 2, ch / 2, cw, ch, 'bg3');
    this.bg1 = this.add.tileSprite(cw / 2, 0, cw * 1.5, ch / 2, 'bg1');
    this.bg2 = this.add.tileSprite(cw / 2, 100, cw * 1.5, 176, 'bg2');
    this.bg4 = this.add.tileSprite(cw / 2, 175, cw, 30, 'bg4');
    this.footer = this.add.tileSprite(cw / 2, ch, cw * 1.5, 170, 'footer');

    this.footer.flipY = true;
    //設定人物位置
    this.player = this.physics.add.sprite(150, 300, 'user');
    this.player.setScale(0.8);
    //設定動畫播放
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('user', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'speed',
      frames: this.anims.generateFrameNumbers('user', { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1
    });

    this.TimeText = this.add.text(cw - 200, ch - 50, `Time: ${this.timeInt}`, {
      color: '#fff',
      fontSize: '30px'
    });
    let timer = setInterval(() => {
      this.timeInt--;
      if (this.timeInt < 20 && this.timeInt > 10) {
        this.bgSpeed = 2;
      }
      if (this.timeInt < 10 && this.timeInt > 0) {
        this.bgSpeed = 4;
      }

      this.TimeText.setText(`Time: ${this.timeInt}`);
      if (this.timeInt <= 0) {
        this.gameStop = true;
        clearInterval(timer);
        //過關
        this.win = this.add.image(cw / 2 + 200, ch / 2 + 50, 'win');
        this.win.setScale(0.5);
        this.winTitle = this.add.image(cw / 2, ch / 2, 'win-title');
        this.go = this.add.image(cw / 2, ch / 2 + 150, 'go');
        this.go.setInteractive();
        this.go.on('pointerdown', () => {
          // console.log('go')
          this.scene.start('gamePlay');
        });
      }
    }, 1000);

    // 動畫影格
    keyFrame(this);
    // 加入物理效果
    const addPhysics = GameObject => {
      this.a = this.physics.add.existing(GameObject);
      this.a.setScale(0.8);
      GameObject.body.immovable = true;
      GameObject.body.moves = false;
    };
    // 怪物的座標資訊
    const masPos = [
      { name: 'Group1', x: cw + 210, y: 450, w: 171, h: 180 },
      { name: 'Group2', x: cw + 210, y: 470, w: 130, h: 120 },
      { name: 'Group3', x: cw + 210, y: 500, w: 47, h: 37 }
    ];

    //碰撞到後停止遊戲
    const hittest = (player, Group) => {
      this.gameStop = true;
      this.player.setBounce(0);
      this.player.setSize(110, 100, 0);
      this.player.anims.play('deel', true);
      clearInterval(timer);
      let failure = this.add.image(cw / 2, ch / 2 - 100, 'failure');
      failure.setScale(0.6);
      this.failureTitle = this.add.image(cw / 2, ch / 2, 'failure-title');
      this.go = this.add.image(cw / 2, ch / 2 + 150, 'go');
      this.go.setInteractive();
      this.go.on('pointerdown', () => {
        // console.log('go')
        this.scene.start('gamePlay');
      });
    };

    // 產生怪物
    for (let i = 0; i < 10; i++) {
      let BoolIdx = getRandom(2, 0);
      let BoolIdx2 = getRandom(2, 0);
      console.log(BoolIdx);
      this['Group' + i] = this.add.tileSprite(
        masPos[BoolIdx].x,
        masPos[BoolIdx].y,
        masPos[BoolIdx].w,
        masPos[BoolIdx].h,
        masPos[BoolIdx].name
      );
      this['GroupB' + i] = this.add.tileSprite(
        masPos[BoolIdx2].x,
        masPos[BoolIdx2].y,
        masPos[BoolIdx2].w,
        masPos[BoolIdx2].h,
        masPos[BoolIdx2].name
      );
      this.monsterArr.push(this['Group' + i]);
      this.monsterArr2.push(this['GroupB' + i]);
      addPhysics(this['Group' + i]);
      addPhysics(this['GroupB' + i]);
      this.physics.add.collider(this.player, this['Group' + i], hittest);
      this.physics.add.collider(this.player, this['GroupB' + i], hittest);
    }

    //播放動畫
    // this.player.anims.play('run', true);
    this.player.setSize(100, 150);
    this.player.setCollideWorldBounds(true);
    // 把 footer 加入 physics 世界
    this.physics.add.existing(this.footer);
    this.physics.add.existing(this.bg4);

    // 設定物件不會動靜止不會掉下去
    this.footer.body.immovable = true;
    // this.player.body.immovable = true;
    this.bg4.body.immovable = true;
    // 物件的位置和旋轉是否受其速度，加速度，阻力和重力的影響
    this.footer.body.moves = false;
    // this.player.body.moves = false;
    this.bg4.body.moves = false;

    this.physics.add.collider(this.player, this.bg4);
    this.physics.add.collider(this.player, this.footer);
  },
  update: function() {
    // 遊戲狀態更新
    if (this.gameStop === true) return;
    this.bg2.tilePositionX += 2 * this.bgSpeed;
    this.bg4.tilePositionX += 3 * this.bgSpeed;
    this.footer.tilePositionX += 3 * this.bgSpeed;

    this.monsterArr[this.masIdx].x -= 3 * this.bgSpeed;

    if (this.TimeStep < 10 && this.TimeStep > 0) {
      this.monsterArr2[this.masIdx2].x -= 3 * this.bgSpeed;
    }

    // 檢測怪物是否超出邊界然後返回
    for (let i = 0; i < this.monsterArr.length; i++) {
      if (this.monsterArr[i].x <= -100) {
        this.monsterArr[i].x = cw + 200;
        this.masIdx = getRandom(this.monsterArr.length - 1, 0);
      }
      if (this.monsterArr2[i].x <= -100) {
        this.monsterArr2[i].x = cw + getRandom(400, 200);
        this.masIdx2 = getRandom(this.monsterArr2.length - 1, 0);
      }
    }
    const keyboard = this.input.keyboard.createCursorKeys();
    if (keyboard.right.isDown) {
      console.log('r');
      this.player.flipX = false;
      this.player.setVelocityX(200);
    } else if (keyboard.left.isDown) {
      console.log('l');
      this.player.flipX = true;
      this.player.setVelocityX(-200);
    } else if (keyboard.space.isDown) {
      console.log('sp');
      this.player.anims.play('speed', true);
      this.player.flipY = false;
      this.player.setVelocityY(-200);
    } else {
      this.player.anims.play('run', true);
      this.player.flipX = false;
      this.player.setVelocityX(0);
      //   this.player.setVelocityY(0);
    }
  }
};
