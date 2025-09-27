document.addEventListener("DOMContentLoaded", function() {
    const Typer = {
      text: null,
      accessCountimer: null,
      index: 0,
      speed: 2,
      file: "",
      accessCount: 0,
      deniedCount: 0,
      init: function () {
        this.accessCountimer = setInterval(() => this.updLstChr(), 500);
        fetch(this.file)
          .then((response) => response.text())
          .then((data) => {
            this.text = data.slice(0, data.length - 1);
          });
      },

      content: function () {
        return document.getElementById("console").innerHTML;
      },

      write: function (str) {
        document.getElementById("console").innerHTML += str;
        return false;
      },

      addText: function () {
        if (this.text) {
          const cont = this.content();
          if (cont.substring(cont.length - 1, cont.length) === "|") {
            document.getElementById("console").innerHTML = cont.substring(0, cont.length - 1);
          }
          this.index += this.speed;
          const text = this.text.substring(0, this.index);
          const rtn = new RegExp("\n", "g");

          document.getElementById("console").innerHTML = text.replace(rtn, "<br/>");
          window.scrollBy(0, 50);
        }
      },

      updLstChr: function () {
        const cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) === "|") {
          document.getElementById("console").innerHTML = cont.substring(0, cont.length - 1);
        } else {
          this.write("|");
        }
      },
    };

    Typer.speed = 3;
    Typer.file = "content.txt";
    Typer.init();

    const timer = setInterval(() => {
      if (Typer.text) {
        Typer.addText();
        if (Typer.index > Typer.text.length) {
          clearInterval(timer);
        }
      }
    }, 30);
});
