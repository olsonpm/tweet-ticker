'use strict';
/* --execute=browserify-- */

var io = require('socket.io-client');
var socket = io();
var TweenLite = require('TweenLite');
require('gsapCssPlugin');
var moment = require('moment');
var $ = require('./jqueryPluginsList');

var colors = [{
    bg: "#7EFF9D"
}, {
    bg: "#333"
}, {
    bg: "#A6C2FF"
}, {
    bg: "#6C4F8B"
}, {
    bg: "#FFFBAB"
}, {
    bg: "#B24343"
}];

var duration = 0.4;
var myEase = Power3.easeOut;
var readyTimeout = 8000;
var storedTweets = [];

$(function() {
    // document is ready
    var ready = false;
    setTimeout(function() {
        ready = true;
        var json = $('#lastTen').data('json');
        if (json !== null) {
            checkInitialThenDisplay(json);
        }
    }, readyTimeout);
    socket.on('twitter-update', function(bdayTweets) {
        if (ready) {
            checkInitialThenDisplay(bdayTweets);
        } else {
            storedTweets.push(bdayTweets);
        }
    });
});

function checkInitialThenDisplay(tweets) {
    if ($('p.initial.explanation').length) {
        TweenLite.fromTo($('p.initial.explanation'), duration, {
            opacity: 1
        }, {
            ease: myEase
            , css: {
                opacity: 0
            }
            , onComplete: function() {
                $('p.initial.explanation').remove();
                tweets = tweets.concat(storedTweets);
                displayTweets(tweets);
                storedTweets = [];
            }
        });
    } else {
        displayTweets(tweets);
    }
}

function displayTweets(tweets) {
    var tweetHtml = "";
    tweets.forEach(function(e) {
        var randomColor = colors[Math.floor(Math.random() * 6)];
        tweetHtml += "<div class='initial tweet' style='border-top: 3px solid " + randomColor.bg + "; "
            + "border-bottom: 3px solid " + randomColor.bg + ";'><h3>" + e.username + "</h3><p>" + e.text + "</p><div class='timestamp'>Curated " + moment(e.created).format('lll') + "</div></div>";
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
}
