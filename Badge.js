const fs = require("fs");
const { makeBadge, ValidationError } = require("badge-maker");

class Badge {
  constructor(
    label = "build",
    shield = "text",
    labelColor = "grey",
    shieldColor = "blue",
    style = "flat",
    license = null
  ) {
    this.label = label;
    this.shield = shield;
    this.labelColor = labelColor;
    this.shieldColor = shieldColor;
    this.style = style;
    this.license = license;
    // TODO implement in later version
    this.colors = [
      "brightgreen",
      "green",
      "yellow",
      "yellowgreen",
      "orange",
      "red",
      "blue",
      "grey",
      "lightgrey",
    ];
    this.styles = ["plastic", "flat", "flat-square", "for-the-badge"];
  }
  //generate badge object
  spitBadgeOut() {
    const badge = {
      label: this.label,
      message: this.shield,
      labelColor: this.labelColor,
      color: this.shieldColor,
      style: this.style,
    };
    const svg = makeBadge(badge);
    console.log("Badge Spitted Out!", this.label, svg);
    return [this.label, svg];
  }
  // generate .svg file from badge object and save it
  spitSVGOut(name, badge) {
    return new Promise((resolved, rejected) => {
      try {
        const [name, svg] = badge;
        fs.writeFile(`./output/${name}.svg`, svg, (error) => {
          error ? console.log("error", error) : console.log("Success!");
        });
        resolved(svg);
      } catch (error) {
        rejected(error);
      }
    });
  }
}

// TEST
// const mit = new Badge("Logan", "Bear", "blue", "green");
// const badge = mit.spitBadgeOut();
// const svg = mit.spitSVGOut("Giggles", badge);

module.exports = Badge;
