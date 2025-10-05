function toggleMenu() {
      document.getElementById("mobileMenu").classList.toggle("show");
    }

    // 🍃 Leaf animation
    const canvas = document.getElementById("leafCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const leafImage = new Image();
    leafImage.src = "736103ab1c9c86e67ef1dbb3b4e17f4e.png";

    const leaves = [];
    const numLeaves = 20;

    class Leaf {
      constructor() { this.reset(); }
      reset() {
        this.x = canvas.width - Math.random() * 200;
        this.y = -Math.random() * 300;
        this.size = 25 + Math.random() * 30;
        this.speedY = 0.3 + Math.random() * 0.5;
        this.speedX = 0.2 + Math.random() * 0.5;
        this.swing = Math.random() * 3;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1;
      }
      update() {
        this.y += this.speedY;
        this.x -= this.speedX;
        this.x += Math.sin(this.angle) * this.swing * 0.3;
        this.angle += 0.01;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 50 || this.x < -50) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(leafImage, -this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
      }
    }

    function initLeaves() {
      for (let i = 0; i < numLeaves; i++) leaves.push(new Leaf());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach(leaf => { leaf.update(); leaf.draw(); });
      requestAnimationFrame(animate);
    }

    leafImage.onload = () => {
      initLeaves();
      animate();
    };
