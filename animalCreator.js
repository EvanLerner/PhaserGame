import Phaser from "phaser";
import * as scripts from "./scripts.js";

export class Animal {
  constructor(scene, ticker) {
    this.scene = scene;
    const minVal = 500;
    const maxVal = 1000;
    const animalList = ["cow", "pig", "chick", "chicken", "donkey", "horse", "rooster"];
    
    // Create a sprite for the animal at a random position
    const x = Phaser.Math.Between(50, scene.scale.width - 50); // Avoid edges
    const y = Phaser.Math.Between(50, scene.scale.height - 50); // Avoid edges
    this.sprite = scene.add.sprite(x, y, scripts.getRandomElement(animalList));
    this.sprite.setScale(0.3);

    // Make sprite interactive
    this.sprite.setInteractive({ draggable: true });

    // Create a label below the animal
    this.label = scene.add.text(
      x, // Centered horizontally
      y + this.sprite.displayHeight / 2 + 8, // Below the animal
      ticker, // Display the ticker symbol
      { font: "16px Arial", fill: "#8B0000" }
    ).setOrigin(0.5, 0); // Center the text

    // Timer for initiating movement
    this.timer = scripts.getRandomInt(minVal, maxVal);

    // Track the current movement tween
    this.movementTween = null;

    // Flag to track if the sprite is being dragged
    this.isBeingDragged = false;
    this.isBeingHovered = false;

    // Schedule movement
    this.moveAfter();

    // Add hover effects
    this.addHoverEffects();

    // Add drag-and-drop functionality
    this.addDragEvents();
  }

  // Function to make the cow and its label move in a random direction
  moveAfter() {
    // Only start the tween if it's not currently being dragged
      this.scene.time.delayedCall(this.timer, () => {
        //try again if cancelled
        if(this.isBeingDragged || this.isBeingHovered) {
          this.moveAfter()}
        else{
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
        this.movementTween = this.scene.tweens.add({
          targets: this.sprite,
          x: newX,
          y: newY,
          duration: 1000, // 1 second
          ease: 'Power1',
          onComplete: () => {
            // Reset the timer to a new random value after the movement
            this.timer = scripts.getRandomInt(500, 1000);
            this.moveAfter(); // Continue movement cycle
          },
        });

        // Tween the label to follow the sprite
        this.scene.tweens.add({
          targets: this.label,
          x: newX,
          y: newY + this.sprite.displayHeight / 2 + 10,
          duration: 1000, // Match the sprite duration
          ease: 'Power1',
        });
      }
      });
    
  }

  // Function to add drag-and-drop functionality
  addDragEvents() {
    // When dragging starts
    this.sprite.on('dragstart', () => {
      // Mark the animal as being dragged
      this.isBeingDragged = true;

      // Stop the tween (completely stop the current movement)
      if (this.movementTween) {
        this.movementTween.stop();
      }

      //this.scene.tweens.removeFrom(this.label);

      this.sprite.setTint(0x00ff00); // Highlight the sprite
    });

    // While dragging
    this.sprite.on('drag', (pointer, dragX, dragY) => {
      this.sprite.x = dragX; // Update the sprite position
      this.sprite.y = dragY;

      // Update the label position to follow the sprite
      this.label.x = dragX;
      this.label.y = dragY + this.sprite.displayHeight / 2 + 10;
    });

    // When dragging ends
    this.sprite.on('dragend', () => {
      // Mark the animal as not being dragged anymore
      this.isBeingDragged = false;

      // Start the movement cycle again when the drag ends
      this.timer = scripts.getRandomInt(500, 1000); // Reset the timer
      this.moveAfter(); // Reinitialize movement

      this.sprite.clearTint(); // Remove the highlight
    });
  }

  // Add hover effects
  addHoverEffects() {
    this.sprite.on('pointerover', () => {
      this.sprite.setTint(0xffff00); // Highlight the animal with a yellow tint
      this.sprite.isBeingHovered = true;
    });

    this.sprite.on('pointerout', () => {
      this.sprite.clearTint(); // Remove the tint when the mouse leaves
      this.sprite.isBeingHovered = false;
    });
  }
}
