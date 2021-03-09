class P5Factory {
  static storedP5;

  static get p5() {
    return P5Factory.storedP5;
  }

  static set p5(p5) {
    if (P5Factory.storedP5) return;

    P5Factory.storedP5 = p5;
  }
}

export { P5Factory };
