import { engine } from "express-handlebars";

export default class HandlebarsConfig {
  config(app) {
    app.engine(
      "html",
      engine({
        extname: ".html",
        partialsDir: "src/views/templates/partial",
        layoutsDir: "src/views/templates/layouts",
        helpers: {
          section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
          },
          comparar: function (a, b) {
            if (a === b) {
              return "selected";
            }
            return "";
          },
        },
      })
    );
    app.set("view engine", "html");
    app.set("views", "src/views/templates/admin");
  }
}
