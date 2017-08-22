var ghpages = require('gh-pages');
var path = require('path');

// Debug tooling
process.env.NODE_DEBUG = 'gh-pages';

var version = '1.0.0'
var module = 'demo-mobile-' + version;
var options = {
  branch: module,
  dotfiles: true,
  //Only add, and never remove existing files
  add: true,
  remote: 'origin',
  user: { name: "Wojciech Trocki", email: "wtrocki@redhat.com" },
  tag: 'release-' + module,
  // Commit message
  message: "Release " + module,
  // Do not push (we will need to review and run tests before)
  push: true
}

ghpages.publish("demo/mobile", options, function(err) {
  if (err) {
    console.info("Finished with error ", err);
  } else {
    console.info("Finished with success ");
  }
});
