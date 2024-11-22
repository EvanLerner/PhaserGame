import Phaser from "phaser";
import * as scripts from "./scripts.js"
export class Animal {
  constructor(scene, ticker) {
      this.scene = scene;
      const minVal = 1000;
      const maxVal = 15000;
      const animalList = ["cow", "pig", "chick", "chicken", "donkey", "horse", "rooster"];
      // Create a sprite for the animal at a random position
      const x = Phaser.Math.Between(50, scene.scale.width - 50); // Avoid edges
      const y = Phaser.Math.Between(50, scene.scale.height - 50); // Avoid edges
      this.sprite = scene.add.sprite(x, y, scripts.getRandomElement(animalList));
      this.sprite.setScale(.3);

      // Create a label below the animal
      this.label = scene.add.text(
          x, // Centered horizontally
          y + this.sprite.displayHeight / 2 + 8, // Below the animal
          ticker, // Display the ticker symbol
          { font: "16px Arial", fill: "#8B0000" }
      ).setOrigin(0.5, 0); // Center the text

      // Timer for initiating movement
      this.timer = scripts.getRandomInt(minVal, maxVal);

      // Schedule movement
      this.moveAfter();
  }

  // Function to make the animal and its label move in a random direction
  moveAfter() {
      this.scene.time.delayedCall(this.timer, () => {
          // Generate random offset for movement within the scene bounds
          const offsetX = Phaser.Math.Between(-100, 100); // Random horizontal movement
          const offsetY = Phaser.Math.Between(-100, 100); // Random vertical movement

          // Calculate new position, ensuring it's within the scene bounds
          const newX = Phaser.Math.Clamp(
              this.sprite.x + offsetX,
              50,
              this.scene.scale.width - 50
          );
          const newY = Phaser.Math.Clamp(
              this.sprite.y + offsetY,
              50,
              this.scene.scale.height - 50
          );

          // Tween the sprite
          this.scene.tweens.add({
              targets: this.sprite,
              x: newX,
              y: newY,
              duration: 1000, // 1 second
              ease: 'Power1',
              onComplete: () => {
                // Reset the timer to a new random value
                this.timer = Phaser.Math.Between(3000, 5000);

                // Call moveAfter again to repeat the movement
                this.moveAfter();
            }
          });

          // Tween the label to follow the sprite
          this.scene.tweens.add({
              targets: this.label,
              x: newX,
              y: newY + this.sprite.displayHeight / 2 + 8,
              duration: 1000, // Match the sprite duration
              ease: 'Power1',
              
          });
      });
  }
}
