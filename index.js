var config = require("./config");
var mosca = require("mosca");
var GcloudPubsubAscoltatore = require("./gcloud-pubsub-ascoltatore");

var moscaConfig = config.mosca;
moscaConfig.backend = GcloudPubsubAscoltatore;
var server = new mosca.Server(moscaConfig);

server.on("clientConnected", function(client) {
  console.log("Client connected with ID", client.id);
});

server.on("published", function(packet, client) {
  console.log("Published", packet.payload, " for client ID", client.id);
});

server.on("ready", function() {
  console.log("Mosca server is up and running!");
});