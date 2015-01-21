'use strict';
/* --execute=browserify-- */

var io = require('socket.io-client');
var socket = io();
var $ = require('jquery');
var TweenLite = require('TweenLite');
require('gsapCssPlugin');

var colors = [{
    bg: "#7EFF9D"
    , fg: "#333"
}, {
    bg: "#333"
    , fg: "white"
}, {
    bg: "#A6C2FF"
    , fg: "#333"
}, {
    bg: "#6C4F8B"
    , fg: "white"
}, {
    bg: "#FFFBAB"
    , fg: "#333"
}, {
    bg: "#B24343"
    , fg: "white"
}];

var duration = 0.4;
var myEase = Power3.easeOut;

$(function() {
    // document is ready
    socket.on('twitter-update', function(bdayTweets) {
        var tweetHtml = "";
        bdayTweets.forEach(function(e) {
            var randomColor = colors[Math.floor(Math.random() * 6)];
            //tweetHtml += "<div class='initial tweet' style='background-color: " + randomColor.bg + " !imporant, color: " + randomColor.fg + " !imporant'><h3>" + e.username + "</h3><p>" + e.text + "</p></div>";
            tweetHtml += "<div class='initial tweet' style='background-color: " + randomColor.bg + "; color: " + randomColor.fg + ";'><h3>" + e.username + "</h3><p>" + e.text + "</p></div>";
        });
        var oldContent = $('#content').html();
        var curHeight = parseInt($('#content').css('height'), 10);
        $('#content').prepend(tweetHtml);
        var newHeight = parseInt($('#content').css('height'), 10);
        var diffHeight = newHeight - curHeight;
        // reset content
        $('#content').html(oldContent);

        // now animate
        TweenLite.to($('.tweet'), duration, {
            ease: myEase
            , css: {
                top: diffHeight
            }
            , onComplete: function() {
                $('#content').prepend(tweetHtml);
                $('.tweet').css('top', '');
                TweenLite.fromTo($('.tweet.initial'), duration, {
                    opacity: 0
                }, {
                    ease: myEase
                    , css: {
                        opacity: 1
                    }
                    , onComplete: function() {
                        $('.tweet').removeClass('initial');
                        $('.tweet').css('opacity', '');
                    }
                });
            }
        });
    });
});
