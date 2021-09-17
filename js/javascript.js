class SplashScene extends Phaser.Scene {
    constructor() {
        super('SplashScene');
    }
    preload() {
		this.load.image('splash', '../img/splash.png');
    }
    create() {
		this.add.image(0, 0, 'splash').setOrigin(0); 

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        },[], this);
        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('HomeScene');
        });
    }
}

class HomeScene extends Phaser.Scene {
	constructor() {
		super('HomeScene');
	}
	preload() {
		this.load.image('home_1', '../img/home_1.png');
		this.load.image('home_2', '../img/home_2.png');
	}
	create() {
		let bg = this.add.image(0, 0, 'home_1').setOrigin(0); 

		const option_1 = this.add.zone(0, 0, 1920, 1080);
		option_1.setOrigin(0);
		option_1.setInteractive();
		option_1.on('pointerdown', () => {
			bg.setTexture('home_2');
			
			const option_0 = this.add.zone(0, 0, 1920, 1080);
			option_0.setOrigin(0);
			option_0.setInteractive();
			option_0.on('pointerdown', () => {
				this.scene.restart();
			});
			// this.add.graphics().lineStyle(2, 0x0000FF).strokeRectShape(option_0);
			
			const option_2 = this.add.zone(1470, 550, 150, 80);
			option_2.setOrigin(0);
			option_2.setInteractive();
			option_2.once('pointerdown', () => {
				this.scene.start('LevelsScene');
			});
			// this.add.graphics().lineStyle(2, 0x0000FF).strokeRectShape(option_2);

			const option_3 = this.add.zone(1210, 367, 210, 110);
			option_3.setOrigin(0);
			option_3.setInteractive();
			option_3.on('pointerdown', () => {
				alert('Coming soon!');
			});
			// this.add.graphics().lineStyle(2, 0x0000FF).strokeRectShape(option_3);
		});
	}
}
class HomeScene2 extends Phaser.Scene {
	constructor() {
		super('HomeScene2');
	}
	preload() {
		this.load.image('home_2', '../img/home_2.png');
	}
	create() {
		this.add.image(0, 0, 'home_2').setOrigin(0); 
		
		const option_0 = this.add.zone(0, 0, 1920, 1080);
		option_0.setOrigin(0);
		option_0.setInteractive();
		option_0.on('pointerdown', () => {
			this.scene.start('HomeScene');
		});

		const option_2 = this.add.zone(1470, 550, 150, 80);
		option_2.setOrigin(0);
		option_2.setInteractive();
		option_2.on('pointerdown', () => {
			this.scene.start('LevelsScene');
		});
		// this.add.graphics().lineStyle(2, 0x0000FF).strokeRectShape(option_2);

		const option_3 = this.add.zone(1210, 367, 210, 110);
		option_3.setOrigin(0);
		option_3.setInteractive();
		option_3.on('pointerdown', () => {
			alert('Coming soon!');
		});
		// this.add.graphics().lineStyle(2, 0x0000FF).strokeRectShape(option_3);
	}
}
class LevelsScene extends Phaser.Scene {
	constructor() {
		super('LevelsScene');
	}
	preload() {
		this.load.image('home_1', '../img/home_1.png');
		this.load.image('levels_1', '../img/levels_1.png');
		this.load.image('levels_1-complete', '../img/levels_1-complete.png');
	}
	create() {
		this.add.image(0, 0, 'home_1').setOrigin(0); 
		if (lvl1_completed) {
			this.add.image(0, 0, 'levels_1-complete').setOrigin(0); 
		} else {
			this.add.image(0, 0, 'levels_1').setOrigin(0); 
		}

		const level_1 = this.add.zone(195, 219, 224, 224);
		level_1.setOrigin(0);
		level_1.setInteractive();
		level_1.on('pointerdown', () => {
			restart_lvl1();
			this.scene.start('Level_1');
		});
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(level_1);
		
		arrow_back = this.add.zone(100, 60, 150, 120);
		arrow_back.setOrigin(0);
		arrow_back.setInteractive();
		arrow_back.on('pointerdown', () => {
			this.scene.start('HomeScene2');
		});
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(arrow_back);
	}
}

let player;
let cursors;

let floor;
let floor2;
let text_1;
let score = 0;
let death_counter = 0;

let positions = [860, 1700, 2380, 3410, 4400, 5390, 6300];

let counter_eaten = 0;

let counter_timer = 20;
let text_timer;

let fl2 = [];
let peces = [];
let pez_h = 1010;

let vel = 700; 
let last_state = 'right';

let arrow_left_bool = false;
let arrow_right_bool = false;
let arrow_up_bool = false;

let win_bool = false;
let lvl1_completed = false;

class Level_1 extends Phaser.Scene {
	constructor() {
		super('Level_1');
	}
	preload() {
		this.load.image('background', '../img/background.png');
        this.load.image('clock', '../img/clock.png');
        
		this.load.image('arrows', '../img/arrows.png');
		this.load.image('jump', '../img/jump.png');
		
		this.load.image('peces-0', '../img/eaten/0.png');
		this.load.image('peces-1', '../img/eaten/1.png');
		this.load.image('peces-2', '../img/eaten/2.png');
		this.load.image('peces-3', '../img/eaten/3.png');
		this.load.image('peces-4', '../img/eaten/4.png');
		this.load.image('peces-5', '../img/eaten/5.png');
		this.load.image('peces-6', '../img/eaten/6.png');
		this.load.image('peces-7', '../img/eaten/7.png');


		this.load.image('timeout', '../img/timeout.png');
		this.load.image('complete-1', '../img/complete-1.png');
		this.load.image('complete-2', '../img/complete-2.png');
		this.load.image('complete-3', '../img/complete-3.png');
		
		
		this.load.spritesheet('oso_left', '../img/oso_left.png', 
		{frameWidth: 445, frameHeight: 223} );
		this.load.spritesheet('oso_right', '../img/oso_right.png', 
		{frameWidth: 445, frameHeight: 223} );
	
		this.load.spritesheet('pez', '../img/pez.png', 
			{frameWidth: 223, frameHeight: 306} );
	
		this.load.spritesheet('sparks', '../img/sparks.png', 
			{frameWidth: 750, frameHeight: 1080} );
	
		this.load.image('collider', '../img/collider.png');
	}
	create() {
		
		// imágenes del nivel =====================================================
		this.add.image(0, 0, 'background').setOrigin(0); //.setScrollFactor(1);
		this.add.image(0, 0, 'clock').setOrigin(0).setScrollFactor(0);
		this.add.image(0, 0, 'arrows').setOrigin(0).setScrollFactor(0);
		
		const peces_eaten = this.add.image(0, 0, 'peces-0').setOrigin(0).setScrollFactor(0);

		this.input.addPointer();
		this.input.addPointer();

		const arrow_left = this.add.zone(100, 830, 130, 130);
		arrow_left.setScrollFactor(0);
		arrow_left.setOrigin(0);
		arrow_left.setInteractive();
		arrow_left.on('pointerdown', () => arrow_left_bool = true && isAlive);
		arrow_left.on('pointerup', () => arrow_left_bool = false);
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(arrow_left).setScrollFactor(0);

		const arrow_right = this.add.zone(320, 830, 130, 130);
		arrow_right.setScrollFactor(0);
		arrow_right.setOrigin(0);
		arrow_right.setInteractive();
		arrow_right.on('pointerdown', () => arrow_right_bool = true && isAlive);
		arrow_right.on('pointerup', () => arrow_right_bool = false);
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(arrow_right).setScrollFactor(0);

        
        const arrow_up_img = this.add.sprite(0, 0, 'jump').setOrigin(0).setScrollFactor(0);
        
		const arrow_up = this.add.zone(1920-900, 0, 900, 1080);
		arrow_up.setScrollFactor(0);
		arrow_up.setOrigin(0);
		arrow_up.setInteractive();
		arrow_up.on('pointerdown', () => arrow_up_bool = true && isAlive);
		arrow_up.on('pointerup', () => {
            arrow_up_bool = false;

            this.tweens.add({
                targets: arrow_up_img,
                alpha: 0,
                duration: 300,
                ease: 'Power2'
              }, this);
        });
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(arrow_up).setScrollFactor(0);
		

		// animaciones del nivel =====================================================
		this.anims.create({
			key : 'anim_sparks',
			frames : this.anims.generateFrameNumbers('sparks', {start: 0, end: 15}),
			frameRate : 24,
			repeat : -1
		});
		
		this.anims.create({
			key : 'left',
			frames : this.anims.generateFrameNumbers('oso_left', {start: 0, end: 7}),
			frameRate : 12,
			repeat : -1
		});
		this.anims.create({
			key : 'right',
			frames : this.anims.generateFrameNumbers('oso_right', {start: 0, end: 7}),
			frameRate : 12,
			repeat : -1
		});
		this.anims.create({
			key : 'keep_left',
			frames : [{key: 'oso_left', frame: 9}],
			frameRate : 12,
		});
		this.anims.create({
			key : 'keep_right',
			frames : [{key: 'oso_right', frame: 9}],
			frameRate : 12,
		});
		this.anims.create({
			key : 'jump_left',
			frames : [{key: 'oso_left', frame: 8}],
			frameRate : 12,
		});
		this.anims.create({
			key : 'jump_right',
			frames : [{key: 'oso_right', frame: 8}],
			frameRate : 12,
		});
		
		this.anims.create({
			key : 'anim_pez',
			frames : this.anims.generateFrameNumbers('pez', {start: 0, end: 6}),
			frameRate : 12,
			repeat : -1
		});
	
		floor = this.physics.add.staticGroup();
		floor.create(0, 695, 'collider').setOrigin(0).setScale(3, 2).refreshBody();
		floor.create(1105, 695, 'collider').setOrigin(0).setScale(1.85, 2).refreshBody();
		floor.create(2005, 690, 'collider').setOrigin(0.5, 0).setScale(1, 0.2).refreshBody();
		floor.create(2660, 692, 'collider').setOrigin(0).setScale(2.55, 2).refreshBody();
		floor.create(3620, 770, 'collider').setOrigin(0).setScale(1.3, 0.5).refreshBody();
		floor.create(4155, 900, 'collider').setOrigin(0.5, 0).setScale(0.6, 0.25).refreshBody();
		floor.create(4580, 685, 'collider').setOrigin(0).setScale(2.68, 0.6).refreshBody();
		floor.create(5660, 690, 'collider').setOrigin(0).setScale(1.75, 2).refreshBody();
		floor.create(6590, 695, 'collider').setOrigin(0).setScale(5.5, 2).refreshBody();
		
		floor2 = this.physics.add.staticGroup();
		
		addPeces(this.physics, this.time);
		this.time.delayedCall(1000, () => {
			addPeces2(this.physics, this.time);
			this.physics.add.overlap(player, peces[1], () => {
				score += 120;
				peces[1].disableBody(true, true);

				counter_eaten++;
				peces_eaten.setTexture('peces-'+counter_eaten);
			}, null, this);
			this.physics.add.overlap(player, peces[3], () => {
				score += 120;
				peces[3].disableBody(true, true);

				counter_eaten++;
				peces_eaten.setTexture('peces-'+counter_eaten);
			}, null, this);
			this.physics.add.overlap(player, peces[5], () => {
				score += 120;
				peces[5].disableBody(true, true);

				counter_eaten++;
				peces_eaten.setTexture('peces-'+counter_eaten);
			}, null, this);
		}, [], this);
		
		player = this.physics.add.sprite(170, 300, 'oso_right').setScale(0.75);
		
		this.physics.add.collider(player, floor);
		this.physics.add.overlap(player, fl2, () => {
			// death_counter += 75;
			this.cameras.main.shake(200, 0.01);
			player.x = 170;
			player.y = 300;
		}, null, this);


		for (let j = 0; j < positions.length; j++) {
			fl2[j] = floor2.create(positions[j], 1170, 'collider').setScale(1.4, 1).refreshBody();
		}

		this.physics.add.overlap(player, peces[0], () => {
			score += 120;
			peces[0].disableBody(true, true);
			
			counter_eaten++;
			peces_eaten.setTexture('peces-'+counter_eaten);
		}, null, this);
		this.physics.add.overlap(player, peces[2], () => {
			score += 120;
			peces[2].disableBody(true, true);
			
			counter_eaten++;
			peces_eaten.setTexture('peces-'+counter_eaten);
		}, null, this);
		this.physics.add.overlap(player, peces[4], () => {
			score += 120;
			peces[4].disableBody(true, true);

			counter_eaten++;
			peces_eaten.setTexture('peces-'+counter_eaten);
		}, null, this);
		this.physics.add.overlap(player, peces[6], () => {
			score += 120;
			peces[6].disableBody(true, true);

			counter_eaten++;
			peces_eaten.setTexture('peces-'+counter_eaten);
		}, null, this);
		
		this.cameras.main.setBounds(0, 0, 7681, 1080);
		this.cameras.main.startFollow(player, true);
		
		text_timer = this.add.text(1920 / 2 - 5, 150, counter_timer, {fontFamily: 'font_1'}).setOrigin(0.5, 0.5).setScrollFactor(0).setFontSize(72).setColor('#FFFFFF');
		timer(this.time);
		
		dead_img = this.add.image(0, 0, 'timeout').setOrigin(0).setScrollFactor(0).setVisible(false);

		
		cursors = this.input.keyboard.createCursorKeys();

		arrow_back = this.add.zone(130, 880, 150, 120);
		arrow_back.setScrollFactor(0);
		arrow_back.setOrigin(0);
		arrow_back.on('pointerdown', () => this.scene.start('LevelsScene'));
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(arrow_back).setScrollFactor(0);
		arrow_restart = this.add.zone(870, 800, 200, 200);
		arrow_restart.setScrollFactor(0);
		arrow_restart.setOrigin(0);
		arrow_restart.on('pointerdown', () => {
			// this.registry.destroy();
			// this.events.off();
			restart_lvl1();
			this.scene.restart();
		});
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(arrow_restart).setScrollFactor(0);
		
		arrow_back.disableInteractive();
		arrow_restart.disableInteractive();

		const complete_1 = this.add.image(0, 0, 'complete-1').setOrigin(0).setScrollFactor(0).setVisible(false);
		const complete_2 = this.add.image(0, 0, 'complete-2').setOrigin(0).setScrollFactor(0).setVisible(false);
		const complete_3 = this.add.image(0, 0, 'complete-3').setOrigin(0).setScrollFactor(0).setVisible(false);
		const spark_anim = this.add.sprite(config.width / 2, 0, 'sparks').setOrigin(0.5, 0).setScrollFactor(0).setVisible(false);
		
		const next = this.add.zone(1650, 880, 150, 120);
		next.setScrollFactor(0);
		next.setOrigin(0);
		next.on('pointerdown', () => {
			alert('No next level yet!')
		});
		next.disableInteractive();
		// this.add.graphics().lineStyle(2, 0xFF0000).strokeRectShape(next).setScrollFactor(0);


		const win_platform = floor2.create(8270, 700, 'collider').setScale(3, 1).refreshBody();
		this.physics.add.overlap(player, win_platform, () => {
			win_bool = true;
			isAlive = false;
			lvl1_completed = true;
			if (counter_eaten == 7) {
                complete_3.setVisible(true);
                spark_anim.setVisible(true);
                spark_anim.anims.play('anim_sparks', true);
			} else if (counter_eaten > 4) {
				complete_2.setVisible(true);
			} else {
				complete_1.setVisible(true);
			}

			arrow_back.setInteractive();
			next.setInteractive();			
		}, null, this);
		

	}
	update() {
		if (isAlive && (cursors.left.isDown && cursors.right.isDown)) {
			player.setVelocityX(0);
			
			if (!player.body.touching.down) {
				switch(last_state){
					case 'left':
						player.anims.play('jump_left', true);
						break;
					case 'right':
						player.anims.play('jump_right', true);
						break;
					default:
						player.anims.play('jump_left', true);
						break;
				}
			} else {
				switch(last_state){
					case 'left':
						player.anims.play('keep_left');
						break;
					case 'right':
						player.anims.play('keep_right');
						break;
					default:
						player.anims.play('keep_left');
						break;
				}
			}
		} else if (isAlive && (cursors.left.isDown || arrow_left_bool)) {
			if (player.body.touching.down) {
				player.anims.play('left', true);
			} else {
				player.anims.play('jump_left', true);
			}
			player.setVelocityX(-vel);
			last_state = 'left';
	
		} else if (isAlive && (cursors.right.isDown || arrow_right_bool)) {
			if (player.body.touching.down) {
				player.anims.play('right', true);
			} else {
				player.anims.play('jump_right', true);
			}
			player.setVelocityX(vel);
			last_state = 'right';
	
		} else {
			player.setVelocityX(0);
	
			if (!player.body.touching.down) {
				switch(last_state){
					case 'left':
						player.anims.play('jump_left', true);
						break;
					case 'right':
						player.anims.play('jump_right', true);
						break;
					default:
						player.anims.play('jump_left', true);
						break;
				}
			} else {
				switch(last_state){
					case 'left':
						player.anims.play('keep_left');
						break;
					case 'right':
						player.anims.play('keep_right');
						break;
					default:
						player.anims.play('keep_left');
						break;
				}
			}
		}
	
		if (isAlive && ((cursors.up.isDown || arrow_up_bool) && player.body.onFloor())) {
			player.setVelocityY(-1600);
			
			switch(last_state){
				case 'left':
					player.anims.play('jump_left', true);
					break;
				case 'right':
					player.anims.play('jump_right', true);
					break;
				default:
					player.anims.play('jump_left', true);
					break;
			}
		}
	}
	
}
function restart_lvl1() {
	win_bool = false;
	isAlive = true;
	last_state = 'right';
	counter_timer = 20;
	counter_eaten = 0;
}
let arrow_back;
let arrow_restart;
let dead_img;
let isAlive = true;
function timer(th) {
	if (counter_timer >= 0) {
		text_timer.setText(counter_timer);
		counter_timer--;
	} else {
		win_bool || dead_img.setVisible(true);
		isAlive = false;

		arrow_back.setInteractive();
		arrow_restart.setInteractive();
	}
	!win_bool && th.delayedCall(1000, () => timer(th), [], this);
}
function addPeces(ph, ti) {
	peces[0] = ph.add.sprite(positions[0], pez_h, 'pez').setScale(0.4);
	peces[0].setVelocityY(-2500);
	peces[0].play('anim_pez');
	ph.add.overlap(peces[0], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[0].x = positions[0];
			peces[0].y = pez_h;
			peces[0].setVelocityY(-2500);
		} , [], this);
	}, null, this);

	peces[2] = ph.add.sprite(positions[2], pez_h, 'pez').setScale(0.4);
	peces[2].setVelocityY(-2500);
	peces[2].play('anim_pez');
	ph.add.overlap(peces[2], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[2].x = positions[2];
			peces[2].y = pez_h;
			peces[2].setVelocityY(-2500);
		} , [], this);
	}, null, this);

	peces[4] = ph.add.sprite(positions[4], pez_h, 'pez').setScale(0.4);
	peces[4].setVelocityY(-2500);
	peces[4].play('anim_pez');
	ph.add.overlap(peces[4], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[4].x = positions[4];
			peces[4].y = pez_h;
			peces[4].setVelocityY(-2500);
		} , [], this);
	}, null, this);

	peces[6] = ph.add.sprite(positions[6], pez_h, 'pez').setScale(0.4);
	peces[6].setVelocityY(-2500);
	peces[6].play('anim_pez');
	ph.add.overlap(peces[6], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[6].x = positions[6];
			peces[6].y = pez_h;
			peces[6].setVelocityY(-2500);
		} , [], this);
	}, null, this);
}
function addPeces2(ph, ti) {
	peces[1] = ph.add.sprite(positions[1], pez_h, 'pez').setScale(0.4);
	peces[1].setVelocityY(-2500);
	peces[1].play('anim_pez');
	ph.add.overlap(peces[1], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[1].x = positions[1];
			peces[1].y = pez_h;
			peces[1].setVelocityY(-2500);
		} , [], this);
	}, null, this);

	peces[3] = ph.add.sprite(positions[3], pez_h, 'pez').setScale(0.4);
	peces[3].setVelocityY(-2500);
	peces[3].play('anim_pez');
	ph.add.overlap(peces[3], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[3].x = positions[3];
			peces[3].y = pez_h;
			peces[3].setVelocityY(-2500);
		} , [], this);
	}, null, this);

	peces[5] = ph.add.sprite(positions[5], pez_h, 'pez').setScale(0.4);
	peces[5].setVelocityY(-2500);
	peces[5].play('anim_pez');
	ph.add.overlap(peces[5], fl2, () => {
		isAlive && ti.delayedCall(1000, () => {
			peces[5].x = positions[5];
			peces[5].y = pez_h;
			peces[5].setVelocityY(-2500);
		} , [], this);
	}, null, this);
}

const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	// scene: [Level_1],
	scene: [SplashScene, HomeScene, HomeScene2, LevelsScene, Level_1],
	// scene: [HomeScene, HomeScene2, LevelsScene, Level_1],
	scale: {
		mode: Phaser.Scale.FIT,
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: {
				y: 4000,
			},
		},
	}
};

new Phaser.Game(config);
