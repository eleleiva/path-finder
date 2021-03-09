import { P5Factory } from './P5Factory';

function drawPath({ path, width, height }) {
  P5Factory.p5.noFill();
  P5Factory.p5.stroke(155, 200, 30);
  P5Factory.p5.strokeWeight(width / 3);
  P5Factory.p5.beginShape();

  for (let i = 0; i < path.length; i++) {
    P5Factory.p5.vertex(
      path[i].x * width + width / 2,
      path[i].y * height + height / 2
    );
  }

  P5Factory.p5.endShape();
}

function drawDot({ dot }) {
  P5Factory.p5.fill(155, 200, 30);
  P5Factory.p5.noStroke();

  P5Factory.p5.ellipse(
    dot.x * dot.width + dot.width * 0.5,
    dot.y * dot.width + dot.width * 0.5,
    dot.width - 1,
    dot.height - 1
  );
}

export { drawPath, drawDot };
