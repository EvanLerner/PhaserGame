import "./style.css";
import * as script from "./scripts.js";
import Phaser from "phaser";

const sizes = {
  width: 500,
  height: 500,
};

const speedDown = 300

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.playerSpeed;
    this.cursor;
    this.playerSpeed = speedDown+50;
    this.target;
  }

  preload() {
    this.load.image("bg", "/assets/bg.png")
    this.load.image("basket", "/assets/basket.png")
    this.load.image("apple", "/assets/apple.png")
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // Create the player
    this.player = this.physics.add
        .image(0, sizes.height * 0.8, "basket")
        .setOrigin(0, 0);
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);

    // Create the label
    this.label = this.add.text(
        this.player.x + this.player.displayWidth / 2,
        this.player.y + this.player.displayHeight - 50,
        "This is your label",
        { font: "16px Arial", fill: "#8B0000" }
    ).setOrigin(0.5, 0);



    // Create the target
    this.target = this.physics.add
        .image(50, 0, "apple")
        .setOrigin(0, 0);
    this.target.setMaxVelocity(0, speedDown);

    // Capture input
    this.cursor = this.input.keyboard.createCursorKeys();
}

update() {
    // Handle player movement
    const { left, right } = this.cursor;
    if (left.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
        this.player.setVelocityX(this.playerSpeed);
    } else {
        this.player.setVelocityX(0);
    }


    // Reset target position when it falls out of bounds
    if (this.target.y >= sizes.height) {
        this.target.setY(0);
        this.target.setX(sizes.width * script.randomNumber(5, 90) / 100);
    }
}

preRender ()
{
    this.label.setPosition(
        this.player.x - 32,
        this.player.y - 38
    );
}
  


}

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: false,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);

