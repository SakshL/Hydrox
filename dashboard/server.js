const express = require("express");
const app = express();
const chalk = require("chalk");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const MemoryStore = require("memorystore")(session);
const url = require("url");
const uptimedata = require("../module/links.js");
const banSchema = require("../module/ban.js")
const maintenceSchema = require('../module/maintain.js');
const bodyParser = require("body-parser");
const config = require("../dashboard.json");

module.exports = async bot => {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    passport.use(
        new Strategy(
          {
            clientID: config.bot.id,
            clientSecret: config.bot.secret,
            callbackURL: config.dashboard.callback,
            scope: ["identify"]
          },
          (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile));
          }
        )
    );
    var minifyHTML = require('express-minify-html-terser');
    app.use(minifyHTML({
        override:      true,
        exception_url: false,
        htmlMinifier: {
            removeComments:            true,
            collapseWhitespace:        true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes:     true,
            removeEmptyAttributes:     true,
            minifyJS:                  true
        }
    }));
    app.use(
        session({
          store: new MemoryStore({ checkPeriod: 86400000 }),
          secret:
            "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
          resave: false,
          saveUninitialized: false
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.listen(config.dashboard.port, () => console.log(chalk.green(`Started Server On Port ${config.dashboard.port}`)));

    app.use(
        "/js",
        express.static(path.join(__dirname, 'views/js'))
    );

    app.use(
        "/css",
        express.static(path.join(__dirname, 'views/css'))
    );

    app.use(
      "/img",
      express.static(path.join(__dirname, 'views/img'))
  );

    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect("/login");
    };

    const checkMaintence = async (req, res, next) => {
      const d = await maintenceSchema.findOne({server: config.dashboard.discord_server_ID });
      if(d) {
          if(req.isAuthenticated()) {
              let uyevarmikiaq = bot.guilds.cache.get(config.dashboard.discord_server_ID).members.cache.get(req.user.id);
              if(uyevarmikiaq) {
                  if(config.dashboard.ownerids.includes(req.user.id)) {
                  next();
                  } else {
                      res.redirect('/error?code=200&message=Our website is temporarily unavailable.') 
                  }
              } else {
                  res.redirect('/error?code=200&message=Our website is temporarily unavailable.') 
              }
          } else {
              res.redirect('/error?code=200&message=Our website is temporarily unavailable.') 
          }
      } else {
          next();
      }
    }

    app.get(
        "/login",
        (req, res, next) => {
          if (req.session.backURL) {
            req.session.backURL = req.session.backURL;
          } else if (req.headers.referer) {
            const parsed = url.parse(req.headers.referer);
            if (parsed.hostname === app.locals.domain) {
              req.session.backURL = parsed.path;
            }
          } else {
            req.session.backURL = "/";
          }
          next();
        },
        passport.authenticate("discord", { prompt: "none" })
    );

    app.get(
        "/callback",
        passport.authenticate("discord", {
          failureRedirect:
            "/error?code=999&message=We encountered an error while connecting."
        }),
        async (req, res) => {
            res.redirect(req.session.backURL || "/");
        }
    );

    app.get("/logout", function(req, res) {
        req.session.destroy(() => {
          req.logout();
          res.redirect("/");
        });
    });
    
    app.get("/", checkMaintence, async (req, res) => {
        res.render("index", {
            bot,
            user: req.user,
            config,
            title: "Home"
        })
    });

    app.get("/privacy", (req, res) => {
        res.redirect("https://guitarhost.tech/privacy-policy")
    });

    app.get("/join", (req, res) => {
        res.redirect(config.discord)
    });

    app.get("/terms", (req, res) => {
        res.render("admin/site/terms")
    })

    app.get("/aboutus", (req, res) => {
        res.render("aboutus", {
          bot,
          user: req.user,
          config,
          title: "About Us"
        });
    });
    app.get("/howtouse", (req, res) => {
        res.render("howtouse")
    })

    app.get("/uptime", checkMaintence, checkAuth, async (req, res) => {
      let uptimes = await uptimedata.find({ userID: req.user.id });
      bot.users.fetch(req.user.id).then(async a => {
        res.render("addmonitor", {
          bot,
          user: req.user,
          config,
          title: "Monitor",
          member: a
        });
      })
    });

    app.get(
      "/uptime/:code/delete",
      checkAuth,
      checkMaintence,
      async (req, res) => {
        const dde = await uptimedata.findOne({ code: req.params.code });
        if (!dde)
          return res.redirect(
            "/@me?error=true&message=There is no such site in the system."
          );
        uptimedata.findOne({ code: req.params.code }, async function(err, docs) {
          if (docs.userID != req.user.id)
            return res.redirect(
              "/@me?error=true&message=The link you tried to delete does not belong to you."
            );
          res.redirect(
            "/@me?success=true&message=The link has been successfully deleted from the system."
          );
          await uptimedata.deleteOne({ code: req.params.code });
        });
      }
    );

    app.get("/@me", checkAuth, checkMaintence, async (req, res) => {
        let uptimes = await uptimedata.find({ userID: req.user.id });
        bot.users.fetch(req.user.id).then(async a => {
          res.render("profile", {
            bot,
            user: req.user,
            config,
            title: req.user.username,
            uptimes,
            member: a,
            req
          });
        })
    })

    app.get("/uptime/:code/edit", checkAuth, checkMaintence, async (req, res) => {
        const dde = await uptimedata.findOne({ code: req.params.code });
        if (!dde)
          return res.redirect(
            "/error?error=true&message=There is no such site in the system."
          );
        res.render("edit", {
          bot,
          user: req.user,
          config,
          dde,
          code: req.params.code,
          title: "Edit"
        })
    })

    app.post("/uptime/:code/edit", checkAuth, checkMaintence, async (req, res) => {
      const dde = await uptimedata.findOne({ code: req.params.code });
      if (!dde)
        return res.redirect(
          "/error?error=true&message=There is no such site in the system."
        );
      await uptimedata.findOneAndUpdate({ code: req.params.code }, {
        $set: {
          link: req.body.link,
          name: req.body.name,
          time: req.body.time
        }
      },
      function(err, docs) {})
      res.redirect(
        "/uptime/"+dde.code+"/edit?success=true&message=Your monitor has been successfully edited."
      );
    })

    app.post("/uptime", checkAuth, checkMaintence, async (req, res) => {
      const rBody = req.body;
      if (!rBody["link"]) {
        res.redirect("?error=true&message=Write a any link.");
      } else {
        if (!rBody["link"].match("https"))
          return res.redirect("?error=true&message=You must enter a valid link.");
        const updcode = makeidd(5);
        const dde = await uptimedata.findOne({ link: rBody["link"] });
        const dd = await uptimedata.find({ userID: req.user.id });
        if (dd.length > 10)
          res.redirect("?error=true&message=Your uptime limit has reached.");

        if (dde)
          return res.redirect(
            "?error=true&message=This link already exists in the system."
          );
        bot.users.fetch(req.user.id).then(a => {
          new uptimedata({
            server: config.dashboard.discord_server_ID,
            userName: a.username,
            userID: req.user.id,
            link: rBody["link"],
            name: rBody["name"],
            code: updcode
          }).save();
        });
        res.redirect(
          "?success=true&message=Your link has been successfully added to the uptime system."
        );
      }
    })

    app.get("/admin", checkAuth, checkMaintence, async (req, res) => {
        if(config.dashboard.ownerids.includes(req.user.id)){
          const udata = await uptimedata.find()
            res.render("admin/index", {
                bot,
                user: req.user,
                config,
                udata,
                title: "Admin"
            })
        }else {
          res.redirect("/")
        }
    })

    app.get("/admin/uptimes", checkAuth, checkMaintence, async (req, res) => {
      if(config.dashboard.ownerids.includes(req.user.id)){
        let updata = await uptimedata.find();
        res.render("admin/uptimes", {
          bot,
          user: req.user,
          config,
          updata,
          title: "Uptimes"
        })
      }else {
        res.redirect("/")
      }
    })

    app.post('/api/delete', async  (req, res) => {
      let code = req.body.gg;
      if(!code){
        return req.json({
          success: false,
          alert: {
            title: "Oops!",
            message: "Something Went Wrong!",
            type: "error"
          }
        })
      }
      await uptimedata.deleteOne({ code: code })
      return res.json({
        success: true,
        alert: {
          title: "Success!",
          message: "Uptime Has Been Deleted Successfully!",
          type: "success"
        }
      })
    })

    app.get("/admin/maintence", checkAuth, checkMaintence, async (req, res) => {
      if(config.dashboard.ownerids.includes(req.user.id)){
        let bandata = await banSchema.find();
        res.render("admin/administrator/maintence", {
          config,
          bot,
          user: req.user,
          title: "Web",
          req,
          bandata
        })
      }else {
        res.redirect("/")
      }
    })

    app.get("/admin/userban", checkAuth, checkMaintence, async (req, res) => {
      if(config.dashboard.ownerids.includes(req.user.id)){
        let bandata = await banSchema.find();
        res.render("admin/administrator/user-ban", {
          config,
          bot,
          user: req.user,
          title: "Ban",
          req,
          bandata
        })
      }else {
        res.redirect("/")
      }
    })

    app.post("/admin/maintence", checkMaintence, checkAuth, async (req, res) => {
      const bakimdata = await maintenceSchema.findOne({server: config.dashboard.discord_server_ID });
      if(bakimdata) return res.json({ success: false, alert: { message: "Maintenance Is Already Enabled !", type: "error", title: "Oops!" } })
      if(!req.body.reason) return res.json({ success: false, alert: { message: "No Reason Provided!", type: "error", title: "Oops!" } })
      new maintenceSchema({server: config.dashboard.discord_server_ID, reason: req.body.reason}).save();
      return res.json({ success: true, alert: { message: "Maintenance Mode Has Been Enabled!", type: "success", title: "Success!" }})
    })

    app.post("/admin/unmaintence", checkMaintence, checkAuth, async (req, res) => {
      const bakimdata = await maintenceSchema.findOne({server: config.dashboard.discord_server_ID });
      if(!bakimdata) return res.json({ success: false, alert: { message: "Maintenance Is Not Enabled !", type: "error", title: "Oops!" } })
      new maintenceSchema({server: config.dashboard.discord_server_ID, reason: req.body.reason}).save();
      await maintenceSchema.deleteOne({server: config.dashboard.discord_server_ID}, function (error, server) { 
        if(error) console.log(error)
      });
      return res.json({ success: true, alert: { message: "Maintenance Mode Has Been Disabled!", type: "success", title: "Success!" }})
    })

    app.post("/admin/userban", checkMaintence, checkAuth, async (req, res) => {
      const bakimdata = await banSchema.findOne({user: req.body.userID });
      if(bakimdata) return res.json({ success: false, alert: { message: "User Is Already Banned!", type: "error", title: "Oops!" } })
      new banSchema({ user: req.body.userID, sebep: req.body.reason, yetkili: req.user.id }).save();
      return res.json({ success: true, alert: { message: "User Has Been Banned Successfully!", type: "success", title: "Success!" }})
    })

    app.post("/admin/userunban", checkMaintence, checkAuth, async (req, res) => {
      await banSchema.deleteOne({ user: req.body.userID }, function (error, user) { 
        if(error) console.log(error)
        })
      return res.json({ success: true, alert: { message: "User Has Been UnBanned Successfully!", type: "success", title: "Success!" }})
    })

    if(config.dashboard.arc.enabled === true){
        app.get("/arc-sw.js", (req, res) => {
            res.type(".js")
            res.send(`!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=100)}({100:function(t,e,r){"use strict";r.r(e);var n=r(2);if("undefined"!=typeof ServiceWorkerGlobalScope){var o="https://arc.io"+n.k;importScripts(o)}else if("undefined"!=typeof SharedWorkerGlobalScope){var c="https://arc.io"+n.i;importScripts(c)}else if("undefined"!=typeof DedicatedWorkerGlobalScope){var i="https://arc.io"+n.b;importScripts(i)}},2:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"f",(function(){return c})),r.d(e,"j",(function(){return i})),r.d(e,"i",(function(){return a})),r.d(e,"b",(function(){return d})),r.d(e,"k",(function(){return f})),r.d(e,"c",(function(){return u})),r.d(e,"d",(function(){return s})),r.d(e,"e",(function(){return l})),r.d(e,"h",(function(){return m})),r.d(e,"g",(function(){return v}));var n={images:["bmp","jpeg","jpg","ttf","pict","svg","webp","eps","svgz","gif","png","ico","tif","tiff","bpg","avif","jxl"],video:["mp4","3gp","webm","mkv","flv","f4v","f4p","f4bogv","drc","avi","mov","qt","wmv","amv","mpg","mp2","mpeg","mpe","m2v","m4v","3g2","gifv","mpv","av1"],audio:["mid","midi","aac","aiff","flac","m4a","m4p","mp3","ogg","oga","mogg","opus","ra","rm","wav","webm","f4a","pat"],interchange:["json","yaml","xml","csv","toml","ini","bson","asn1","ubj"],archives:["jar","iso","tar","tgz","tbz2","tlz","gz","bz2","xz","lz","z","7z","apk","dmg","rar","lzma","txz","zip","zipx"],documents:["pdf","ps","doc","docx","ppt","pptx","xls","otf","xlsx"],other:["srt","swf"]},o="arc:",c={COMLINK_INIT:"".concat(o,"comlink:init"),NODE_ID:"".concat(o,":nodeId"),CDN_CONFIG:"".concat(o,"cdn:config"),P2P_CLIENT_READY:"".concat(o,"cdn:ready"),STORED_FIDS:"".concat(o,"cdn:storedFids"),SW_HEALTH_CHECK:"".concat(o,"cdn:healthCheck"),WIDGET_CONFIG:"".concat(o,"widget:config"),WIDGET_INIT:"".concat(o,"widget:init"),WIDGET_UI_LOAD:"".concat(o,"widget:load"),BROKER_LOAD:"".concat(o,"broker:load"),RENDER_FILE:"".concat(o,"inlay:renderFile"),FILE_RENDERED:"".concat(o,"inlay:fileRendered")},i="serviceWorker",a="/".concat("shared-worker",".js"),d="/".concat("dedicated-worker",".js"),f="/".concat("arc-sw-core",".js"),p="".concat("arc-sw",".js"),u=("/".concat(p),"/".concat("arc-sw"),"arc-db"),s="key-val-store",l=2**17,m="".concat("https://overmind.arc.io","/api/propertySession"),v="".concat("https://warden.arc.io","/mailbox/propertySession")}});`)
        })
    }

    app.get("/error", async (req, res) => {
        res.render("error", {
          bot,
          user: req.user,
          config,
          title: "Error",
          req
        })
    })

    app.use((req, res) => {
      res.status(404).redirect("/");
    });
    function makeidd(length) {
      var result = "";
      var characters =
        "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
}